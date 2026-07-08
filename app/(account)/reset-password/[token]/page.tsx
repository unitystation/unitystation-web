"use client";

import { useParams } from "next/navigation";
import { useActionState } from "react";
import Button from "../../../../components/ui/Button";
import FormShell, { FormFooterLinks } from "../../../../components/ui/FormShell";
import Notice from "../../../../components/ui/Notice";
import TextField from "../../../../components/ui/TextField";
import { fieldErrorFor } from "../../../../lib/auth/fieldError";
import { postPasswordReset, ResetPasswordStep2Response } from "./actions";

const initialState: ResetPasswordStep2Response = {
    success: false,
    error: undefined,
};

export default function ResetPasswordPageStep2() {
    const params = useParams<{ token: string }>();
    const token = params?.token;
    const [state, formAction, isPending] = useActionState(postPasswordReset, initialState);

    if (state.success) {
        return (
            <FormShell title="Reset your password">
                <Notice tone="success">
                    <p>Your password has been reset successfully.</p>
                    <p>You can now log in using your new password.</p>
                </Notice>
                <FormFooterLinks links={[{ href: "/login", label: "Go to login" }]} />
            </FormShell>
        );
    }

    return (
        <FormShell title="Reset your password" action={formAction} busy={isPending}>
            {state.error && (
                <Notice tone="danger">
                    <p>
                        There was an error while trying to reset your password. Your password-reset
                        token might be invalid or expired.
                    </p>
                    <p>Please try requesting a new password reset or contact us.</p>
                </Notice>
            )}

            <TextField
                label="New password"
                type="password"
                id="password"
                name="password"
                placeholder="********"
                required
                error={fieldErrorFor(state.error, "password")}
            />

            <TextField
                label="Confirm your password"
                type="password"
                id="password2"
                name="password2"
                placeholder="********"
                required
                error={fieldErrorFor(state.error, "password2")}
            />

            <input type="hidden" id="token" name="token" value={token ?? ""} />

            <Button type="submit" className="mt-2 w-full">
                Reset password
            </Button>
        </FormShell>
    );
}
