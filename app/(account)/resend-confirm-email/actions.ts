"use server"

import {z} from 'zod';
import {FieldError, GeneralError, isFieldError} from "../../../lib/auth/guards";

export interface ResendConfirmationMailRequest {
    success: boolean;
    error?: GeneralError | FieldError;
}

export const postResendConfirmationMail = async (_: ResendConfirmationMailRequest, formData: FormData): Promise<ResendConfirmationMailRequest>  => {
    const schema = z.object({
        email: z.string().email()
    });

    const parsed = schema.safeParse({
        email: formData.get('email')
    });

    if (!parsed.success) {
        const fieldErrors = parsed.error.errors.reduce((acc, error) => {
            return {...acc, [error.path[0]]: error.message}
        }, {});

        return {success: false, error: {status: 400, error: fieldErrors}};
    }

    try {
        const response = await fetch(`${process.env.CC_API_URL}/accounts/resend-account-confirmation`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: parsed.data.email
            })
        });

        if (!response.ok) {
            const error = await response.json();
            if (isFieldError(error)) {
                return {success: false, error: error};
            }

            throw new Error('Unknown error');
        }

    } catch (e) {
        return {success: false, error: {error: 'An unexpected error happened', status: 500}};
    }

    return {success: true}
}