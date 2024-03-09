"use server"

import {FieldError, GeneralError, isFieldError, isGeneralError} from "../../../../lib/auth/guards";
import {z} from "zod";

export interface ResetPasswordStep2Response {
    success: boolean;
    error?: GeneralError | FieldError;
}

export const postPasswordReset = async (_: ResetPasswordStep2Response, formData: FormData): Promise<ResetPasswordStep2Response> => {
    const schema = z.object({
        password: z.string().min(6),
        token: z.string().min(1)
    });

    const parsed = schema.safeParse({
        password: formData.get('password'),
        password2: formData.get('password2'),
        token: formData.get('token')
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
        password: parsed.data.password,
        token: parsed.data.token
    }

    try {
        const response = await fetch(`${process.env.CC_API_URL}/accounts/reset-password/${parsed.data.token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            if (isFieldError(response) && response.error.token) {
                return {success: false, error: {status: 400, error: "Your link has expired. Please request a new one."}};
            }

            if (isFieldError(response) || isGeneralError(response)) {
                return {success: false, error: response};
            }

            return { success: false, error: {status: 400, error: "An unexpected error occurred"}};
        }

        return { success: true};
    } catch (error) {
        return { success: false, error: {status: 400, error: "An unexpected error occurred"}};
    }
}