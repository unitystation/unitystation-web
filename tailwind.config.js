/** @type {import('tailwindcss').Config} */

/*
 * Unitystation design tokens. Every colour maps to a CSS custom property
 * declared in app/globals.css (the classic StationHub palette), so the
 * palette can be re-themed in one place.
 */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: "#000",
            white: "#fff",

            // Surfaces (darkest to lightest)
            void: "rgb(var(--c-void) / <alpha-value>)",
            hull: "rgb(var(--c-hull) / <alpha-value>)",
            panel: "rgb(var(--c-panel) / <alpha-value>)",
            raised: "rgb(var(--c-raised) / <alpha-value>)",

            // Lines & interactive chrome
            seam: "rgb(var(--c-seam) / <alpha-value>)",
            "seam-bright": "rgb(var(--c-seam-bright) / <alpha-value>)",
            steel: "rgb(var(--c-steel) / <alpha-value>)",

            // Text
            crew: "rgb(var(--c-crew) / <alpha-value>)",
            dim: "rgb(var(--c-dim) / <alpha-value>)",
            faint: "rgb(var(--c-faint) / <alpha-value>)",

            // Accents
            primary: {
                DEFAULT: "rgb(var(--c-primary) / <alpha-value>)",
                hot: "rgb(var(--c-primary-hot) / <alpha-value>)",
            },
            accent: "rgb(var(--c-accent) / <alpha-value>)",
            info: "rgb(var(--c-info) / <alpha-value>)",
            success: "rgb(var(--c-success) / <alpha-value>)",
            warning: "rgb(var(--c-warning) / <alpha-value>)",
            danger: {
                DEFAULT: "rgb(var(--c-danger) / <alpha-value>)",
                fill: "rgb(var(--c-danger-fill) / <alpha-value>)",
            },
        },
        fontFamily: {
            display: ["var(--font-display)", "system-ui", "sans-serif"],
            mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
            body: ["var(--font-body)", "system-ui", "sans-serif"],
        },
        /* Shadows are tokens too (this replaces Tailwind's shadow-sm/md/lg
         * scale on purpose): never write an arbitrary shadow-[…] in a
         * component. */
        boxShadow: {
            none: "none",
            panel: "0 10px 30px rgba(0, 0, 0, 0.45)", // panels, cards, tables
            nav: "0 4px 16px rgba(0, 0, 0, 0.35)", // the sticky navbar
            float: "0 6px 20px rgba(0, 0, 0, 0.4)", // small floating boxes (the clown's taunt)
            menu: "0 12px 32px rgba(0, 0, 0, 0.6)", // dropdown menus
            window: "0 32px 80px rgba(0, 0, 0, 0.7)", // the hero's launcher window
            bevel: "inset 0 1px 0 rgb(255 255 255 / 0.06)", // top highlight on steel toolbars
            cta: "inset 0 1px 0 rgb(255 255 255 / 0.18), 0 16px 40px rgb(var(--c-primary) / 0.35)", // the hero download button's teal glow
        },
        extend: {
            container: {
                center: true,
            },
            letterSpacing: {
                label: "0.14em",
            },
            animation: {
                "led-blink": "led-blink 2.4s steps(1) infinite",
                "fade-up": "fade-up 0.5s ease-out both",
                marquee: "marquee 120s linear infinite",
            },
            keyframes: {
                marquee: {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-50%)" },
                },
                "led-blink": {
                    "0%, 92%, 100%": { opacity: "1" },
                    "94%, 98%": { opacity: "0.25" },
                },
                "fade-up": {
                    from: { opacity: "0", transform: "translateY(12px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
            },
        },
    },
    plugins: [],
};
