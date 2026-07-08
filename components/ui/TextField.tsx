"use client";

import classNames from "classnames";
import { useId } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    /** Neutral guidance shown under the field. Replaced by `error` when set. */
    helper?: React.ReactNode;
    /** Validation message; paints the field red. */
    error?: React.ReactNode;
};

/** Form input: small label on top, rounded field, helper or error below. */
export default function TextField({ label, helper, error, id, className, ...rest }: Props) {
    const autoId = useId();
    const fieldId = id ?? autoId;
    const describedBy = error || helper ? `${fieldId}-note` : undefined;

    return (
        <div className={classNames("flex flex-col gap-1.5", className)}>
            <label htmlFor={fieldId} className="type-label text-dim">
                {label}
            </label>
            <input
                id={fieldId}
                aria-invalid={error ? true : undefined}
                aria-describedby={describedBy}
                className={classNames(
                    "w-full rounded-md border bg-hull px-3 py-2.5 text-sm text-crew placeholder:text-faint",
                    "transition-colors focus:outline-none focus:border-accent",
                    error ? "border-danger" : "border-steel",
                )}
                {...rest}
            />
            {(error || helper) && (
                <p
                    id={describedBy}
                    className={classNames("text-xs", error ? "text-danger" : "text-faint")}
                >
                    {error ?? helper}
                </p>
            )}
        </div>
    );
}
