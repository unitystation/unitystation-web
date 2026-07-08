"use client";

import { useActionState } from "react";
import Button from "../../../components/ui/Button";
import FormShell, { FormFooterLinks } from "../../../components/ui/FormShell";
import Notice from "../../../components/ui/Notice";
import TextField from "../../../components/ui/TextField";
import { isGeneralError } from "../../../lib/auth/guards";
import { fieldErrorFor } from "../../../lib/auth/fieldError";
import { registerAccount, RegisterResponse } from "./actions";

const initialState: RegisterResponse = {
    success: false,
    error: undefined,
};

const UNIQUE_ID_HELPER =
    "Choose a unique identifier for your account. This identifier is permanent and cannot be changed later, please choose carefully!";
const USERNAME_HELPER =
    "Choose a username that will be displayed to other users. This can be changed later.";

export default function RegisterPage() {
    const [state, formAction, isPending] = useActionState(registerAccount, initialState);

    if (state.success) {
        return (
            <FormShell title="Create a new account">
                <Notice tone="success">
                    <p>An email has been sent with instructions to confirm your account.</p>
                    <p>
                        Please check your inbox and follow the instructions to complete the process.
                    </p>
                    <p>
                        Didn&apos;t receive the email? Check your Spam folder or try resending the
                        email. Ensure your email address is entered correctly.
                    </p>
                </Notice>
                <FormFooterLinks links={[{ href: "/login", label: "Go to login" }]} />
            </FormShell>
        );
    }

    return (
        <FormShell title="Create a new account" action={formAction} busy={isPending}>
            {state.error && isGeneralError(state.error) && (
                <Notice tone="danger">
                    <p>{state.error.error}</p>
                </Notice>
            )}

            <TextField
                label="Your email"
                id="email"
                name="email"
                type="email"
                placeholder="cuban@pete.com"
                required
                error={fieldErrorFor(state.error, "email")}
            />

            <TextField
                label="Your unique identifier"
                id="unique_identifier"
                name="unique_identifier"
                type="text"
                placeholder="YourUniqueID"
                required
                helper={UNIQUE_ID_HELPER}
                error={fieldErrorFor(state.error, "unique_identifier")}
            />

            <TextField
                label="Username"
                id="username"
                name="username"
                type="text"
                placeholder="YourUsername"
                required
                helper={USERNAME_HELPER}
                error={fieldErrorFor(state.error, "username")}
            />

            <TextField
                label="Your password"
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required
                error={fieldErrorFor(state.error, "password")}
            />

            <TextField
                label="Confirm your password"
                id="password2"
                name="password2"
                type="password"
                placeholder="********"
                required
                error={fieldErrorFor(state.error, "password2")}
            />

            <Button type="submit" className="mt-2 w-full">
                Register
            </Button>

            <FormFooterLinks links={[{ href: "/login", label: "Already have an account?" }]} />
        </FormShell>
    );
}
