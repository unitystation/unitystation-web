import type { Tone } from "./tones";
import { toneSolidBg } from "./tones";

type Props = {
    tone?: Tone;
    /** Blinking draws the eye, reserve it for live/important indicators. */
    blink?: boolean;
    className?: string;
};

/** Tiny indicator LED used in panel titles and loading states. */
export default function StatusLight({ tone = "success", blink = false, className = "" }: Props) {
    return (
        <span
            aria-hidden
            className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${toneSolidBg[tone]} ${blink ? "motion-safe:animate-led-blink" : ""} ${className}`}
        />
    );
}
