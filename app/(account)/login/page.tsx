"use client";

import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import FormShell, { FormFooterLinks } from "../../../components/ui/FormShell";
import Notice from "../../../components/ui/Notice";
import TextField from "../../../components/ui/TextField";
import { AuthorizerContext } from "../../../context/AuthorizerContextProvider";
import { isGeneralError } from "../../../lib/auth/guards";
import { fieldErrorFor } from "../../../lib/auth/fieldError";

export default function LoginPage() {
    const { state, credentialsLogin } = useContext(AuthorizerContext);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (state.isLoggedIn) {
            redirect("/");
        }
    }, [state.isLoggedIn]);

    const handleSubmit = async () => {
        setIsLoading(true);
        await credentialsLogin(email, password);
        setIsLoading(false);
    };

    if (state.isLoggedIn) return null;

    return (
        <FormShell title="Login" action={handleSubmit} busy={isLoading}>
            {state.error && isGeneralError(state.error) && (
                <Notice tone="danger">
                    <p>{state.error.error}</p>
                </Notice>
            )}

            <TextField
                label="Your email"
                type="email"
                placeholder="cuban@pete.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrorFor(state.error, "email")}
            />

            <TextField
                label="Your password"
                id="password"
                type="password"
                placeholder="********"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={fieldErrorFor(state.error, "password")}
            />

            <Button type="submit" className="mt-2 w-full">
                Log in
            </Button>

            <FormFooterLinks
                links={[
                    { href: "/register", label: "Don't have an account?" },
                    { href: "/reset-password", label: "Forgot your password?" },
                    {
                        href: "/resend-confirm-email",
                        label: "Haven't received confirmation email yet?",
                    },
                ]}
            />
        </FormShell>
    );
}
