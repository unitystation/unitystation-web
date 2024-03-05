'use server'

import {revalidatePath} from "next/cache";
import {z} from "zod";

export interface ResendMailResponse {
    success: boolean;
    email?: string;
    message?: string;
    fieldErrors?: { [key: string]: string };
}

export const resendMailConfirmationToken = async (prevState: ResendMailResponse, formData : FormData): Promise<ResendMailResponse> => {
    const schema = z.object({
        email: z.string().email(),
    });

    const parsed = schema.safeParse(
        { email: formData.get('email')}
    );

    if (!parsed.success) {
        return { success: false, email: '', message: '', fieldErrors: { email: 'Invalid email address'}};
    }

    const email = parsed.data.email;

    try {
        const response = await fetch(`${process.env.CC_API_URL}/accounts/resend-account-confirmation/asd`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        if (!response.ok) {
            return { success: false, email: email, message: 'An unexpected error occurred'};
        }

        revalidatePath('reset-password');

        return { success: true};
    } catch (error) {
        return { success: false, email: email, message: 'An unexpected error occurred'};
    }
};
