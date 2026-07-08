import classNames from "classnames";
import PanelBar from "./PanelBar";
import StatusLight from "./StatusLight";
import type { Tone } from "./tones";

type Props = {
    children: React.ReactNode;
    /** Optional launcher-style title bar. */
    title?: string;
    /** Right-aligned meta text in the title bar (e.g. a date or version). */
    meta?: React.ReactNode;
    /**
     * Show a blinking LED in the title bar. Reserved for live panels (the
     * hero screenshot feed, the launcher download); most panels have none.
     */
    led?: boolean;
    /** Colour of the LED; only meaningful together with `led`. */
    tone?: Tone;
    /** Remove inner padding when the content manages its own (tables, images). */
    flush?: boolean;
    className?: string;
};

/**
 * The base surface of the system: a solid steel-blue plate floating over
 * space, with an optional lighter title bar (the launcher-window look).
 *
 * No `overflow-hidden` here: it would clip popovers (e.g. the download
 * Dropdown in BuildPanel). The title bar rounds its own top corners; flush
 * content must not paint a background into the bottom corners.
 */
export default function Panel({
    children,
    title,
    meta,
    led = false,
    tone = "success",
    flush = false,
    className,
}: Props) {
    return (
        <section
            className={classNames("rounded-lg border border-seam bg-panel shadow-panel", className)}
        >
            {title && (
                <PanelBar as="header">
                    <p className="type-label flex items-center gap-2 text-crew">
                        {led && <StatusLight tone={tone} blink />}
                        {title}
                    </p>
                    {meta && <div className="type-label text-dim">{meta}</div>}
                </PanelBar>
            )}
            <div className={flush ? undefined : "p-5 sm:p-6"}>{children}</div>
        </section>
    );
}
