'use server'

import {revalidatePath} from "next/cache";
import {z} from "zod";

export interface ResetPassowrdStep1 {
    success: boolean;
    email?: string;
    message?: string;
    fieldErrors?: { [key: string]: string };
}

export const requestAPasswordReset = async (_: ResetPassowrdStep1, formData : FormData): Promise<ResetPassowrdStep1> => {
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
        const response = await fetch(`${process.env.CC_API_URL}/accounts/reset-password/`, {
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
