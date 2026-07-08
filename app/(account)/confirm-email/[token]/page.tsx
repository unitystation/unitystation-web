"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import FormShell, { FormFooterLinks } from "../../../../components/ui/FormShell";
import Spinner from "../../../../components/ui/Spinner";
import Notice from "../../../../components/ui/Notice";
import { postMailConfirmationToken } from "./actions";

export default function MailConfirmationPage() {
    const [response, setResponse] = useState<{ success?: boolean; error?: string }>({});
    const params = useParams<{ token: string }>();
    const token = params?.token;

    useEffect(() => {
        if (!token) return;
        postMailConfirmationToken(token).then((r) => setResponse(r));
    }, [token]);

    if (!token) return null;

    return (
        <FormShell title="Email confirmation">
            {response.success ? (
                <Notice tone="success">
                    <p>Confirmation successful! Your account is ready.</p>
                </Notice>
            ) : response.error ? (
                <Notice tone="danger">
                    <p>{response.error}</p>
                </Notice>
            ) : (
                <div className="flex items-center gap-3 py-2">
                    <Spinner />
                    <p className="type-label text-dim">Waiting for confirmation…</p>
                </div>
            )}

            <FormFooterLinks
                links={[
                    { href: "/login", label: "Go to login" },
                    { href: "/resend-confirm-email", label: "Request a new confirmation email" },
                ]}
            />
        </FormShell>
    );
}
