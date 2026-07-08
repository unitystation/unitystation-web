"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import classNames from "classnames";
import { GoLinkExternal } from "react-icons/go";
import { FiMenu, FiX } from "react-icons/fi";
import { AuthorizerContext } from "../../context/AuthorizerContextProvider";
import Dropdown from "../ui/Dropdown";

const PLAYER_WIKI = "https://wiki.unitystation.org";
const DEV_WIKI = "https://unitystation.github.io/unitystation/";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/download", label: "Download" },
    { href: "/blog", label: "Blog" },
    { href: "/changelog", label: "Changelog" },
    { href: "/ledger", label: "Ledger" },
];

const EXTERNAL_LINKS = [
    { href: PLAYER_WIKI, label: "Player's wiki" },
    { href: DEV_WIKI, label: "Dev's wiki" },
];

/** Every nav link, internal then external. Rendered once per breakpoint layout. */
function NavItems({ onItemClick }: { onItemClick?: () => void }) {
    const pathname = usePathname();

    return (
        <>
            {NAV_LINKS.map(({ href, label }) => (
                <Link
                    key={href}
                    href={href}
                    onClick={onItemClick}
                    className={classNames(
                        "type-label px-3 py-2 transition-colors",
                        pathname === href ? "text-accent" : "text-dim hover:text-crew",
                    )}
                >
                    {label}
                </Link>
            ))}
            {EXTERNAL_LINKS.map(({ href, label }) => (
                <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="type-label flex items-center gap-1 px-3 py-2 text-dim transition-colors hover:text-crew"
                >
                    {label}
                    <GoLinkExternal className="h-3 w-3" aria-hidden />
                </a>
            ))}
        </>
    );
}

export default function Navbar() {
    const { state } = useContext(AuthorizerContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const username = state.authContext?.account.username;
    const accountItems = state.isLoggedIn
        ? [{ label: "Logout", href: "/logout" }]
        : [
              { label: "Login / Register", href: "/login" },
              { label: "Reset password", href: "/reset-password" },
          ];

    return (
        <header className="sticky top-0 z-40 border-b border-seam bg-hull shadow-nav">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
                {/* Brand */}
                <Link
                    href="/"
                    className="group flex items-center"
                    onClick={() => setMenuOpen(false)}
                >
                    <span className="font-display text-lg font-bold text-crew transition-colors group-hover:text-accent">
                        Unitystation
                    </span>
                </Link>

                {/* Desktop nav */}
                <nav className="hidden items-center lg:flex" aria-label="Main">
                    <NavItems />
                </nav>

                <div className="flex items-center gap-2">
                    <Dropdown label={username ?? "Account"} items={accountItems} />
                    <button
                        type="button"
                        className="p-2 text-dim transition-colors hover:text-crew lg:hidden"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((v) => !v)}
                    >
                        {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile nav */}
            {menuOpen && (
                <nav className="border-t border-seam bg-hull lg:hidden" aria-label="Main mobile">
                    <div className="flex flex-col px-4 py-2">
                        <NavItems onItemClick={() => setMenuOpen(false)} />
                    </div>
                </nav>
            )}
        </header>
    );
}
