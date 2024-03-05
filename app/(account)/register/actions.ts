"use server"

import {FieldError, GeneralError} from "../../../lib/auth/guards";
import {z} from "zod";
import {revalidatePath} from "next/cache";

export interface RegisterResponse {
    success: boolean;
    error?: GeneralError | FieldError;
}


export const registerAccount = async (_: RegisterResponse, formData: FormData): Promise<RegisterResponse> => {
    const schema = z.object({
        email: z.string().email(),
        unique_identifier: z.string().min(3),
        username: z.string().min(3),
        password: z.string().min(6)
    });

    const parsed = schema.safeParse({
        email: formData.get('email'),
        unique_identifier: formData.get('unique_identifier'),
        username: formData.get('username'),
        password: formData.get('password')
    });

    if (!parsed.success) {
        const fieldErrors = parsed.error.errors.reduce((acc, error) => {
            return {...acc, [error.path[0]]: error.message}
        }, {});

        return {success: false, error: {status: 400, error: fieldErrors}};
    }

    const password2 = formData.get('password2');
    if (password2 !== parsed.data.password) {
        return {
            success: false,
            error:
                {
                    status: 400,
                    error: {
                        password2: ['Passwords do not match']
                    }
                }
        }
    }

    const body = {
        email: parsed.data.email,
        unique_identifier: parsed.data.unique_identifier,
        username: parsed.data.username,
        password: parsed.data.password
    }

    try {
        const response = await fetch(`${process.env.CC_API_URL}/accounts/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.json();
            return {success: false, error: error};
        }

        revalidatePath('register');

        return {success: true};
    } catch (error) {
        return {success: false, error: {status: 500, error: 'An unexpected error occurred'}};
    }
}