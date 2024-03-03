"use server"

import {cookies} from "next/headers";
import {LoginResponse} from "../../types/authTypes";
import {encryptAuthContext} from "./authorization";

export const tryGetSessionCookie = (): { success: boolean, value?: string } => {
    const sessionCooke = cookies().get("session")?.value;
    if (sessionCooke) {
        return { success: true, value: sessionCooke };
    }

    return { success: false };
}

export const setSessionCookie = async (payload: LoginResponse) => {
    cookies().set("session", await encryptAuthContext(payload), {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24)
    });
}