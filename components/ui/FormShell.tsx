import Spinner from "./Spinner";

type Props = {
    title: string;
    /** Server action or submit handler, passed straight to <form action>. */
    action?: ((formData: FormData) => void) | string;
    /** Dim the form and show the spinner while a request is in flight. */
    busy?: boolean;
    children: React.ReactNode;
};

/**
 * Centered card for the account flows: title, then fields.
 * Pair with <FormFooterLinks> for the "already have an account?" row.
 */
export default function FormShell({ title, action, busy, children }: Props) {
    return (
        <div className="mx-auto w-full max-w-md py-12 sm:py-16">
            <div className="relative overflow-hidden rounded-lg border border-seam bg-panel shadow-panel">
                <div className="p-6 sm:p-8">
                    <h1 className="mb-6 font-display text-3xl font-bold leading-none text-crew">
                        {title}
                    </h1>
                    <form action={action} className="flex flex-col gap-5">
                        {children}
                    </form>
                </div>

                {busy && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-void/80">
                        <Spinner />
                        <p className="type-label text-dim">Loading…</p>
                    </div>
                )}
            </div>
        </div>
    );
}

type FooterLink = { href: string; label: string };

export function FormFooterLinks({ links }: { links: FooterLink[] }) {
    return (
        <div className="mt-2 flex flex-col gap-1.5 border-t border-seam pt-4">
            {links.map(({ href, label }) => (
                <a
                    key={href}
                    href={href}
                    className="text-sm text-accent transition-colors hover:text-crew hover:underline"
                >
                    {label}
                </a>
            ))}
        </div>
    );
}
