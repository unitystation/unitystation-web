import "./globals.css";
import React from "react";
import { Metadata, Viewport } from "next";
import { Chakra_Petch, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Providers from "../context/providers";
import Navbar from "../components/site/Navbar";
import Footer from "../components/site/Footer";
import Clown from "../components/site/Clown";
import ParallaxSpace from "../components/site/ParallaxSpace";

const display = Chakra_Petch({
    subsets: ["latin"],
    weight: ["500", "600", "700"],
    variable: "--font-display",
});

const mono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "600"],
    variable: "--font-mono",
    // Only used for `.type-label` microcopy, absent from many routes (e.g. the
    // account pages). Preloading it everywhere triggers "preloaded resource not
    // used" warnings; load it on demand instead (swap avoids invisible text).
    preload: false,
});

const body = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-body",
});

export const metadata: Metadata = {
    title: "Unitystation - The Space Station 13 Remake Made in Unity",
    keywords: [
        "unitystation",
        "unity",
        "space station 13",
        "ss13",
        "spacestation 13",
        "spacestation13",
        "space station",
        "station",
        "rpg",
        "roleplaying game",
    ],
    description:
        "Unitystation is a free and open-source chaotic multiplayer role-playing and simulation game made in Unity. Remake of the cult classic Space Station 13.",
    authors: { name: "Unitystation Team", url: "https://github.com/unitystation" },
    robots: { follow: true, index: true },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://unitystation.org/",
        title: "Unitystation - The Space Station 13 Remake Made in Unity",
        description:
            "Unitystation is a free and open-source chaotic multiplayer role-playing and simulation game made in Unity. Remake of the cult classic Space Station 13.",
        images: [
            {
                url: "https://cdn.unitystation.org/Branding/US13_OG_image_preview_1.png",
            },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: "#06080b",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${display.variable} ${mono.variable} ${body.variable}`}>
            <body>
                <ParallaxSpace />
                <Clown />
                <Providers>
                    <div className="flex min-h-screen flex-col">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </Providers>
                <Analytics />
            </body>
        </html>
    );
}
