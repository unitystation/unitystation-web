"use client";

import { useActionState } from "react";
import Button from "../../../components/ui/Button";
import FormShell, { FormFooterLinks } from "../../../components/ui/FormShell";
import Notice from "../../../components/ui/Notice";
import TextField from "../../../components/ui/TextField";
import { requestAPasswordReset, ResetPassowrdStep1 } from "./actions";

const initialState: ResetPassowrdStep1 = {
    success: false,
    message: undefined,
    email: "",
};

export default function ResetPasswordPage() {
    const [state, formAction, isPending] = useActionState(requestAPasswordReset, initialState);

    if (state.success) {
        return (
            <FormShell title="Reset password">
                <Notice tone="success">
                    <p>An email has been sent with instructions to reset your password.</p>
                    <p>
                        Please check your inbox and follow the instructions to complete the process.
                    </p>
                    <p>
                        Didn&apos;t receive the email? Check your Spam folder or try requesting a
                        password reset again. Ensure your email address is entered correctly.
                    </p>
                </Notice>
                <FormFooterLinks links={[{ href: "/login", label: "Back to login" }]} />
            </FormShell>
        );
    }

    return (
        <FormShell title="Reset password" action={formAction} busy={isPending}>
            {state.message && (
                <Notice tone="danger">
                    <p>There was an unexpected error while trying to reset your password.</p>
                    <p>Please try again later or contact us.</p>
                </Notice>
            )}

            <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                placeholder="cuban@pete.com"
                required
                error={state.fieldErrors?.email}
            />

            <Button type="submit" className="mt-2 w-full">
                Submit
            </Button>

            <FormFooterLinks links={[{ href: "/login", label: "Back to login" }]} />
        </FormShell>
    );
}
