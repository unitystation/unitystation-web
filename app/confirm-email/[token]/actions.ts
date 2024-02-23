"use server"

export const postMailConfirmationToken = async (token: string): Promise<any> => {
    try {
        const response = await fetch(`${process.env.CC_API_URL}/accounts/confirm-account`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            if (errorResponse.error) {
                if (typeof errorResponse.error === 'string') {
                    return { error: errorResponse.error };
                } else if (errorResponse.error.token) {
                    return { error: errorResponse.error.token.join(' ') };
                } else if (errorResponse.error.non_field_errors) {
                    return { error: errorResponse.error.non_field_errors.join(' ') };
                }
            }
            return { error: "An unexpected error occurred." };
        }

        return { success: true };
    } catch (error) {
        return { error: "An unexpected error occurred." };
    }
};
