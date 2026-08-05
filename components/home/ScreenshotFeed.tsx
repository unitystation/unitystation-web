"use client";

import classNames from "classnames";
import { useEffect, useState } from "react";
import PanelBar from "../ui/PanelBar";

const HERO_IMAGES: string[] = [
    "https://cdn.unitystation.org/Website-Statics/heroImages/bar-engine.png",
    "https://cdn.unitystation.org/Website-Statics/heroImages/clowns.png",
    "https://cdn.unitystation.org/Website-Statics/heroImages/conveyor.jpg",
    "https://cdn.unitystation.org/Website-Statics/heroImages/df.jpg",
    "https://cdn.unitystation.org/Website-Statics/heroImages/go-outsid.png",
    "https://cdn.unitystation.org/Website-Statics/heroImages/honk.jpg",
    "https://cdn.unitystation.org/Website-Statics/heroImages/hugger.png",
    "https://cdn.unitystation.org/Website-Statics/heroImages/lemons.png",
    "https://cdn.unitystation.org/Website-Statics/heroImages/shuttlecrash.png",
    "https://cdn.unitystation.org/Website-Statics/heroImages/chairs.jpg",
];

const ROTATE_INTERVAL_MS = 10_000;

/**
 * The hero's launcher window: in-game screenshots on a slow crossfade, a
 * frame picker in the bottom bar, and an offset back plate for depth.
 *
 * Frames mount lazily only the current frame and the next one are in the
 * DOM so a visit doesn't download all ten full-size screenshots up front.
 * Once a frame has loaded it stays mounted, keeping the crossfade smooth.
 */
export default function ScreenshotFeed() {
    const [frame, setFrame] = useState(0);
    const [loaded, setLoaded] = useState(() => new Set([0, 1]));

    /** Mount a frame (and the one after it, as preload) and fade to it. */
    const showFrame = (i: number) => {
        setFrame(i);
        setLoaded((prev) => new Set(prev).add(i).add((i + 1) % HERO_IMAGES.length));
    };

    // Auto-advance; re-arms whenever the frame changes, so picking a frame
    // also restarts the timer. Inlines showFrame so the dependency list stays
    // primitive (oxlint's exhaustive-deps isn't React Compiler-aware yet).
    useEffect(() => {
        const timeout = setTimeout(() => {
            const next = (frame + 1) % HERO_IMAGES.length;
            setFrame(next);
            setLoaded((prev) => new Set(prev).add(next).add((next + 1) % HERO_IMAGES.length));
        }, ROTATE_INTERVAL_MS);
        return () => clearTimeout(timeout);
    }, [frame]);

    return (
        <div className="relative">
            <div
                aria-hidden
                className="absolute -right-4 -top-4 hidden h-full w-full rounded-lg border border-seam bg-raised sm:block"
            />
            <div className="relative overflow-hidden rounded-lg border border-seam bg-panel shadow-window">
                <div className="relative aspect-video bg-void xl:aspect-[16/10]">
                    {HERO_IMAGES.map((src, i) =>
                        loaded.has(i) ? (
                            <div
                                key={src}
                                aria-hidden={i !== frame}
                                className={classNames(
                                    "absolute inset-0 bg-cover bg-center",
                                    "transition-opacity duration-1000 ease-in-out",
                                    i === frame ? "opacity-100" : "opacity-0",
                                )}
                                style={{ backgroundImage: `url(${src})` }}
                            />
                        ) : null,
                    )}
                    <div className="absolute inset-0" aria-hidden />
                </div>

                {/* Status bar: frame picker + counter */}
                <PanelBar edge="bottom">
                    <div
                        className="flex items-center gap-1.5"
                        role="group"
                        aria-label="Screenshots"
                    >
                        {HERO_IMAGES.map((src, i) => (
                            <button
                                key={src}
                                type="button"
                                onClick={() => showFrame(i)}
                                aria-label={`Show screenshot ${i + 1}`}
                                aria-current={i === frame}
                                className={classNames(
                                    "h-1.5 rounded-full transition-all duration-300",
                                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                                    i === frame
                                        ? "w-6 bg-accent"
                                        : "w-2.5 bg-steel hover:bg-seam-bright",
                                )}
                            />
                        ))}
                    </div>
                    <p className="type-label text-dim">In-game screenshots</p>
                    <p className="type-label text-faint">
                        {String(frame + 1).padStart(2, "0")} /{" "}
                        {String(HERO_IMAGES.length).padStart(2, "0")}
                    </p>
                </PanelBar>
            </div>
        </div>
    );
}
