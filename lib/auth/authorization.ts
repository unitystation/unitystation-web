'use server'

import { LoginResponse } from "./types";
import { EncryptJWT, jwtDecrypt, jwtVerify, SignJWT } from "jose";
import { isLoginResponse, parseError } from "./guards";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretText = `${process.env.SECRET}`;
const secretKey = Uint8Array.from(Buffer.from(secretText, 'base64'));

export const tryGetSessionCookie = async (): Promise<{ success: boolean, value?: string }> => {
    const cookiesManager = await cookies();
    const sessionCookie = cookiesManager.get("session")?.value;

    if (sessionCookie) {
        return { success: true, value: sessionCookie };
    }

    return { success: false };
}

export const setSessionCookie = async (payload: LoginResponse) => {
    const cookiesManager = await cookies();
    cookiesManager.set("session", await encryptSessionData(payload), {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    });
}

export const destroySessionCookie = async () => {
    const cookiesManager = await cookies();
    cookiesManager.set("session", "", {
        httpOnly: true,
        expires: new Date(0)
    })
}

export const encryptSessionData = async (payload: LoginResponse) => {
    return await new EncryptJWT(payload as any)
        .setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .encrypt(secretKey);
}

export const decryptSessionData = async (token: string) => {
    const { payload } = await jwtDecrypt(token, secretKey);

    if (isLoginResponse(payload)) {
        return payload;
    } else {
        throw new Error("Invalid token payload structure.");
    }
}


export const serverRequestLoginWithCredentials = async (email: string, password: string) => {
    const response = await fetch(`${process.env.CC_API_URL}/accounts/login-credentials`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const parsed = await evaluateResponse(response);

    if (isLoginResponse(parsed)) {
        await setSessionCookie(parsed)
    }

    return parsed;
}

export const serverRequestLoginWithToken = async (token: string) => {
    const response = await fetch(`${process.env.CC_API_URL}/accounts/login-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        credentials: "include",
    });

    const parsed = await evaluateResponse(response);

    if (isLoginResponse(parsed)) {
        await setSessionCookie(parsed);
    }

    return parsed;
}

export const serverTrySessionLogin = async () => {
    const sessionCookie = await tryGetSessionCookie();
    if (sessionCookie.success) {
        const payload = await decryptSessionData(sessionCookie.value!);
        if (isLoginResponse(payload)) {

            //update the session cookie with a new expiration
            await setSessionCookie(payload);
            return await serverRequestLoginWithToken(payload.token);
        }

        return { IsLoggedIn: false, authContext: undefined, error: parseError(payload) };
    }

    return { IsLoggedIn: false, authContext: undefined, error: undefined };
}

export const serverLogout = async () => {
    await destroySessionCookie();
    redirect("login");
}

const evaluateResponse = async (response: Response) => {
    if (response.ok) {
        return await response.json() as LoginResponse;
    } else {
        const errorData = await response.json();
        return parseError(errorData);
    }
}
