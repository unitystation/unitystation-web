import classNames from "classnames";
import type { Tone } from "./tones";
import { toneBg, toneBorder, toneText } from "./tones";

type Props = {
    children: React.ReactNode;
    tone?: Tone;
    className?: string;
};

export default function Badge({ children, tone = "neutral", className }: Props) {
    return (
        <span
            className={classNames(
                "type-label inline-flex items-center gap-1.5 rounded border px-2 py-0.5",
                toneText[tone],
                toneBorder[tone],
                toneBg[tone],
                className,
            )}
        >
            {children}
        </span>
    );
}
