"use client";

import { useActionState } from "react";
import Button from "../../../components/ui/Button";
import FormShell, { FormFooterLinks } from "../../../components/ui/FormShell";
import Notice from "../../../components/ui/Notice";
import TextField from "../../../components/ui/TextField";
import { fieldErrorFor } from "../../../lib/auth/fieldError";
import { postResendConfirmationMail, ResendConfirmationMailRequest } from "./actions";

const initialState: ResendConfirmationMailRequest = {
    success: false,
};

export default function ResendConfirmationMail() {
    const [state, formAction, isPending] = useActionState(postResendConfirmationMail, initialState);

    if (state.success) {
        return (
            <FormShell title="Resend confirmation email">
                <Notice tone="success">
                    <p>
                        Your request has been processed successfully. If your account is found in
                        our system and the email address you provided matches our records, we have
                        sent a confirmation email to that address.
                    </p>
                    <p>
                        Please check your inbox for the confirmation email. If you don&apos;t
                        receive it within a few minutes, check your spam or junk folder. For further
                        assistance, don&apos;t hesitate to contact us.
                    </p>
                </Notice>
                <FormFooterLinks links={[{ href: "/login", label: "Back to login" }]} />
            </FormShell>
        );
    }

    return (
        <FormShell title="Resend confirmation email" action={formAction} busy={isPending}>
            {state.error && (
                <Notice tone="danger">
                    <p>
                        There was an unexpected error while trying to resend the confirmation email.
                    </p>
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
                error={fieldErrorFor(state.error, "email")}
            />

            <Button type="submit" className="mt-2 w-full">
                Submit
            </Button>

            <FormFooterLinks links={[{ href: "/login", label: "Back to login" }]} />
        </FormShell>
    );
}
