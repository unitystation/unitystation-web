"use client";

import { useEffect, useState } from "react";

const TAGLINES = [
    "Join our Discord server to get involved!",
    "Yeah, we have some bugs but at least they are funny!",
    "We are not dead yet!",
    "Surviving the curse one PR at a time!",
    "Thank you patreons for keeping the lights on!",
    "Check our Github if you want to contribute!",
    "Devlog might release any time now!",
    "[object Object]",
    "Playtest every Saturday!",
];

const ROTATE_MS = 5_000;

/**
 * Minecraft-style splash text: a random community one-liner hanging
 * diagonally off the top-left of the title, pulsing. Absolutely
 * positioned, render it inside a `relative` wrapper around the headline.
 */
export default function RotatingTagline() {
    const [tagline, setTagline] = useState(TAGLINES[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTagline(TAGLINES[Math.floor(Math.random() * TAGLINES.length)]);
        }, ROTATE_MS);
        return () => clearInterval(interval);
    }, []);

    return (
        <p className="splash-text pointer-events-none absolute -top-9 left-0 z-10 max-w-64 text-center font-display text-sm font-semibold leading-tight text-warning [text-shadow:2px_2px_0_rgb(var(--c-void)/0.95)] sm:-left-4 sm:-top-8 lg:left-0">
            {tagline}
        </p>
    );
}
