'use server'

import {LoginResponse} from "../../types/authTypes";
import {SignJWT, jwtVerify} from "jose";
import {cookies} from "next/headers";
import {isLoginResponse, parseError} from "../errors";
import {setSessionCookie} from "./session";

const secretKeyText = `${process.env.SECRET}`;
const secretKey = new TextEncoder().encode(secretKeyText);


export const encryptAuthContext = async (payload: LoginResponse) => {
    return await new SignJWT(payload as any)
        .setProtectedHeader({alg: "HS256"})
        .setIssuedAt()
        .setExpirationTime("one day from now")
        .sign(secretKey);
}

export const decryptAuthContext = async (token: string) => {
    const {payload} = await jwtVerify(token, secretKey, {algorithms: ["HS256"]});

    if (isLoginResponse(payload)) {
        return payload;
    } else {
        throw new Error("Invalid token payload structure.");
    }
}

export const loginWithCredentials = async (email: string, password: string) => {
    const response = await fetch(`${process.env.CC_API_URL}/accounts/login-credentials`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    });

    const parsed = evaluateResponse(response);

    if (isLoginResponse(parsed)) {
        await setSessionCookie(parsed)
    }

    return parsed;
}

export const loginWithToken = async (token: string) => {
    const response = await fetch(`${process.env.CC_API_URL}/accounts/login-token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({token})
    });

    const parsed = evaluateResponse(response);

    if (isLoginResponse(parsed)) {
        await setSessionCookie(parsed);
    }

    return parsed;
}

export const logout = async () => {
    cookies().set("session", "", {expires: new Date(0)});
}

const evaluateResponse = async (response: Response) => {
    if (response.ok) {
        return await response.json() as LoginResponse;
    } else {
        const errorData = await response.json();
        return parseError(errorData);
    }
}