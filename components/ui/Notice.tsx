import StatusLight from "./StatusLight";
import type { Tone } from "./tones";
import { toneBg, toneBorder, toneText } from "./tones";

const DEFAULT_HEADINGS: Partial<Record<Tone, string>> = {
    success: "Success",
    danger: "Error",
    info: "Notice",
    warning: "Warning",
};

type Props = {
    tone?: Tone;
    /** Short heading; defaults per tone (Success / Error / Notice / Warning). */
    heading?: string;
    children: React.ReactNode;
    className?: string;
};

/** Inline status block for form results and warnings. */
export default function Notice({ tone = "info", heading, children, className = "" }: Props) {
    const resolvedHeading = heading ?? DEFAULT_HEADINGS[tone] ?? "Notice";
    return (
        <div
            role="status"
            className={`rounded-md border ${toneBorder[tone]} ${toneBg[tone]} p-4 ${className}`}
        >
            <p className={`type-label mb-2 flex items-center gap-2 ${toneText[tone]}`}>
                <StatusLight tone={tone} />
                {resolvedHeading}
            </p>
            <div className="space-y-2 text-sm text-dim">{children}</div>
        </div>
    );
}
