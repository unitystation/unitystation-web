"use client"

import {useEffect, useState} from "react";
import {LoginResponse} from "../../types/authTypes";
import {FieldError, GeneralError, isLoginResponse} from "../errors";
import {decryptAuthContext, loginWithToken, logout} from "./authorization";
import {tryGetSessionCookie, setSessionCookie} from "./session";


export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authContext, setAuthContext] = useState<LoginResponse | undefined>();
    const [error, setError] = useState<GeneralError | FieldError | undefined>();

    const getLoggedInState = async (isMounted: boolean) => {
        const sessionCookie = tryGetSessionCookie();
        if (!sessionCookie.success) {
            isMounted && setIsLoggedIn(false);
            return;
        }

        try {
            const decrypted = await decryptAuthContext(sessionCookie.value!);
            console.log("session cookie", sessionCookie);
            console.log("decrypted", decrypted);

            const response = await loginWithToken(decrypted.token);
            if (isLoginResponse(response)) {
                isMounted && setIsLoggedIn(true);
                isMounted && setAuthContext(response);
                await refreshAuthContext(isMounted);
            } else {
                isMounted && setIsLoggedIn(false);
                isMounted && setError(response);
                await logout();
            }
        } catch (e) {
            isMounted && setIsLoggedIn(false);
            isMounted && setError({error: 'Unexpected error occurred', status: 500});
            await logout();
        }
    };

    const refreshAuthContext = async (isMounted: boolean) => {
        if (!isMounted) {
            return;
        }

        const sessionCookie = tryGetSessionCookie();
        if (!sessionCookie.success) {
            return;
        }

        const decrypted = await decryptAuthContext(sessionCookie.value!);
        if (!isLoginResponse(decrypted)) {
            return;
        }

        const response = await loginWithToken(decrypted.token);
        if (!isLoginResponse(response)) {
            return;
        }

        await setSessionCookie(response);
    };

    useEffect(() => {
        let isMounted = true;

        getLoggedInState(isMounted);

        return () => {
            isMounted = false;
        };
    }, []);

    return {isLoggedIn, authContext, error};
};