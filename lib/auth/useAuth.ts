"use client"

import {useEffect, useState} from "react";
import {AuthContext} from "./types";
import {isFieldError, isGeneralError, isLoginResponse} from "./guards";
import {serverRequestLoginWithCredentials, serverTrySessionLogin, serverLogout} from "./authorization";
import {z} from "zod";

export const useAuth = () : AuthContext => {

    const [state, setState] = useState<AuthContext>(
        {
            state: {
                isLoggedIn: false,
                authContext: undefined,
                error: undefined,
            },
            credentialsLogin: async (email: string, password: string) => {
                throw new Error("Credentials Login was not served.")
            },
            logout: async () => {
                throw new Error("Logout was not served.")
            }
        }
    );

    const clientRequestLoginWithCredentials = async (email: string, password: string) => {
        const schema = z.object({
            email: z.string().email(),
            password: z.string().min(6),
        });

        const parsed = schema.safeParse(
            {  email, password}
        );

        if (!parsed.success) {
            const fieldErrors = parsed.error.errors.reduce((acc, curr) => ({...acc, [curr.path[0]]: curr.message}), {})
            setState({...state, state: {isLoggedIn: false, authContext: undefined, error: {error: fieldErrors, status: 400}}})
            return;
        }

        const response = await serverRequestLoginWithCredentials(parsed.data.email, parsed.data.password);
        if (isLoginResponse(response)) {

            setState({...state, state: {isLoggedIn: true, authContext: response, error: undefined}})
            return;
        } else {
            if (isGeneralError(response)) {
                setState({...state, state: {isLoggedIn: false, authContext: undefined, error: response}})
                return;
            }

            if (isFieldError(response)) {
                setState({...state, state: {isLoggedIn: false, authContext: undefined, error: response}})
                return;
            }
        }

        setState({...state, state: {isLoggedIn: false, authContext: undefined, error: {error: "Unexpected error happened", status: 500}}})
    }
    const clientRequestLogout = async () => {
        setState({...state, state: {isLoggedIn: false, authContext: undefined, error: undefined}})
        await serverLogout();
    }

    useEffect(() => {
        const trySessionLogin = async () => {
            const response = await serverTrySessionLogin();

            if (isLoginResponse(response)) {
                setState({...state, state: {isLoggedIn: true, authContext: response, error: undefined}});
                return;
            }

            if (isGeneralError(response)) {
                setState({...state, state: {isLoggedIn: false, authContext: undefined, error: response}});
                return;
            }

            if (isFieldError(response)) {
                setState({...state, state: {isLoggedIn: false, authContext: undefined, error: response}});
                return;
            }

            setState({...state, state: {isLoggedIn: false, authContext: undefined}});
        }

        trySessionLogin().then();
    }, []);

    return {
        ...state,
        credentialsLogin: clientRequestLoginWithCredentials,
        logout: clientRequestLogout
    };
};
