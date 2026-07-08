"use client";

import { useEffect, useRef } from "react";

/*
 * The game's own main-menu space backdrop, rebuilt for the browser.
 * Textures come straight from the unitystation repo
 * (Assets/Textures/background/space/parallax). Three tiling layers move at
 * different speeds while scrolling; the star layers sit on black and are
 * composited with `screen` blending. A slow horizontal drift (pure CSS,
 * composited) keeps space alive even when the page is idle, like in game.
 */

const TILE = 480;

type StarLayer = {
    src: string;
    /** Fraction of the scroll distance this layer moves. Farther = slower. */
    speed: number;
    /** Idle horizontal drift in px/s, same depth ordering as `speed`. */
    driftPxPerSecond: number;
    /** Upscale factor for the 480px tile. */
    scale: number;
    blend?: "screen";
};

const STAR_LAYERS: StarLayer[] = [
    {
        src: "/background/parallax/parallax_layer1.png",
        speed: 0.05,
        driftPxPerSecond: 2,
        scale: 2.5,
    },
    {
        src: "/background/parallax/parallax_layer2.png",
        speed: 0.15,
        driftPxPerSecond: 6,
        scale: 1.75,
        blend: "screen",
    },
    {
        src: "/background/parallax/parallax_layer3.png",
        speed: 0.3,
        driftPxPerSecond: 13,
        scale: 1.25,
        blend: "screen",
    },
];

export default function ParallaxSpace() {
    const layerRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let ticking = false;

        const update = () => {
            ticking = false;
            const scrollY = window.scrollY;

            STAR_LAYERS.forEach((layer, i) => {
                const el = layerRefs.current[i];
                if (!el) return;
                const tile = TILE * layer.scale;
                el.style.transform = `translate3d(0, ${-((scrollY * layer.speed) % tile)}px, 0)`;
            });
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    const renderLayer = (layer: StarLayer, i: number) => {
        const tile = TILE * layer.scale;
        return (
            // Blend mode sits on the outer div: the inner drift/transform layers
            // create their own stacking contexts, which would isolate the blend
            // from the sibling layers underneath.
            <div
                key={layer.src}
                ref={(el) => {
                    layerRefs.current[i] = el;
                }}
                className="absolute inset-0 will-change-transform"
                style={{ mixBlendMode: layer.blend }}
            >
                <div
                    className="space-drift absolute"
                    style={{
                        inset: `0 ${-tile}px ${-tile}px 0`,
                        backgroundImage: `url(${layer.src})`,
                        backgroundRepeat: "repeat",
                        backgroundSize: `${tile}px ${tile}px`,
                        ["--tile" as string]: tile,
                        ["--drift-duration" as string]: `${Math.round(tile / layer.driftPxPerSecond)}s`,
                    }}
                />
            </div>
        );
    };

    return (
        <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
            {/* Nebula base sits behind everything. */}
            {renderLayer(STAR_LAYERS[0], 0)}

            {/* The planet stays put: pinned to the viewport, indifferent to
                scroll, with the star layers screen-blended over it. */}
            <div className="absolute right-[4vw] top-[14vh]">
                {/* oxlint-disable-next-line nextjs/no-img-element */}
                <img
                    src="/background/parallax/parallax_planet.png"
                    alt=""
                    className="w-[220px] sm:w-[340px] lg:w-[420px]"
                    draggable={false}
                />
            </div>

            {STAR_LAYERS.slice(1).map((layer, i) => renderLayer(layer, i + 1))}
        </div>
    );
}
