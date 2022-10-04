/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    ],
    important: true, // Active dark mode on class basis
    darkMode: "class", i18n: {
        locales: ["en-US"], defaultLocale: "en-US",
    },
    purge: {
        content: ["./pages/**/*.tsx", "./components/**/*.tsx"], // These options are passed through directly to PurgeCSS
    },
    theme: {
        extend: {
            container: {
                center: true,
            },
            backgroundImage: {
                "layer1" : "url('../public/background/layer1.png')",
            }
        },
    },
    variants: {
        extend: {
            backgroundColor: ["checked"], borderColor: ["checked"], inset: ["checked"], zIndex: ["hover", "active"],
        },
    },
    plugins: [
        require('flowbite/plugin'),
    ],
    future: {
        purgeLayersByDefault: true,
    },
};

