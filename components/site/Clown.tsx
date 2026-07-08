"use client";

import "./clown.css";
import { useEffect, useRef, useState } from "react";

const MS_PER_FRAME = 30;
const CLOWN_SIZE = 64;
const CLOWN_DEATH_CLICKS = 500;

/* Escalating responses to people who keep clicking the clown. */
function tauntFor(timesClicked: number): string | null {
    if (timesClicked > 499) return "Ok, You killed the clown. I hope you are happy now.";
    if (timesClicked > 300)
        return "What are you trying to do? You want to post how many times you clicked the clown and get a medal or something?";
    if (timesClicked > 200) return "Seriously?";
    if (timesClicked > 100) return "Don't you have anything better to do?";
    if (timesClicked > 50) return "Erm, aren't you getting bored?";
    if (timesClicked > 20) return "Haha, clicking the clown is so funny!";
    return null;
}

/** A honk sends the clown flying in a random direction at a random speed. */
function randomVelocity() {
    const angle = Math.random() * Math.PI * 2;
    const speed = 1.5 + Math.random() * 3.5;
    return { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed };
}

/**
 * The clown. It bounces around the screen, it honks when clicked, and if you
 * click it 500 times it dies. This is load-bearing website infrastructure,
 * do not remove.
 */
export default function Clown() {
    const [timesClicked, setTimesClicked] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const clownRef = useRef<HTMLButtonElement>(null);
    const posRef = useRef({ x: -CLOWN_SIZE, y: -CLOWN_SIZE });
    const velRef = useRef({ x: 1, y: 1 });

    const alive = timesClicked < CLOWN_DEATH_CLICKS;

    const handleClick = () => {
        void audioRef.current?.play();
        setTimesClicked((n) => n + 1);
        velRef.current = randomVelocity();
    };

    useEffect(() => {
        const el = clownRef.current;
        if (!alive || !el) return;

        const place = () => {
            el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
        };

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            // No roaming: sit in the bottom-left corner instead.
            posRef.current = {
                x: CLOWN_SIZE / 2,
                y: window.innerHeight - CLOWN_SIZE * 1.5,
            };
            place();
            return;
        }

        let raf: number;
        let last = performance.now();

        const tick = (now: number) => {
            // Cap long gaps (background tabs) so the clown doesn't teleport.
            const frames = Math.min((now - last) / MS_PER_FRAME, 3);
            last = now;

            const pos = posRef.current;
            const vel = velRef.current;
            const stepX = vel.x * frames;
            const stepY = vel.y * frames;
            if (
                pos.x + stepX > window.innerWidth + CLOWN_SIZE / 4 ||
                pos.x + stepX < -CLOWN_SIZE * 2
            ) {
                vel.x = -vel.x;
            }
            if (
                pos.y + stepY > window.innerHeight + CLOWN_SIZE / 4 ||
                pos.y + stepY < -CLOWN_SIZE * 2
            ) {
                vel.y = -vel.y;
            }
            pos.x += vel.x * frames;
            pos.y += vel.y * frames;
            place();
            raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [alive]);

    const taunt = tauntFor(timesClicked);

    // The fixed, self-clipping cage means the clown can wander past the screen
    // edges without ever widening the page or spawning a horizontal scrollbar.
    return (
        <div className="pointer-events-none fixed inset-0 z-20 overflow-clip">
            {timesClicked > 5 && (
                <div className="type-label absolute left-4 top-20 max-w-72 space-y-1 rounded-md border border-seam bg-panel px-3 py-2 text-dim shadow-float">
                    <p>Times you have clicked the clown: {timesClicked}</p>
                    {taunt && <p className="text-warning">{taunt}</p>}
                </div>
            )}
            {/* A bike horn has no dialogue to caption. */}
            {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
            <audio ref={audioRef} src="/clown/bikehorn.ogg" />
            {alive && (
                <button
                    ref={clownRef}
                    type="button"
                    onClick={handleClick}
                    aria-label="Honk the clown"
                    className="pointer-events-auto absolute left-0 top-0 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    style={{ transform: `translate3d(${-CLOWN_SIZE}px, ${-CLOWN_SIZE}px, 0)` }}
                >
                    {/* oxlint-disable-next-line nextjs/no-img-element */}
                    <img
                        className="clown-img"
                        src="/clown/clown.png"
                        alt=""
                        height={CLOWN_SIZE}
                        width={CLOWN_SIZE}
                    />
                </button>
            )}
        </div>
    );
}
