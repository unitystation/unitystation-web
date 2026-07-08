"use client";

import classNames from "classnames";
import { useEffect, useRef, useState } from "react";
import { BiSolidChevronDown } from "react-icons/bi";
import { buttonClasses, type ButtonVariant } from "./buttonStyles";

export type DropdownItem = {
    label: React.ReactNode;
    /** Renders an <a> when set… */
    href?: string;
    /** …or a button when set instead. */
    onClick?: () => void;
};

type Props = {
    label: React.ReactNode;
    items: DropdownItem[];
    variant?: ButtonVariant;
    align?: "left" | "right";
    className?: string;
};

/** Click-to-open menu. Closes on outside click and Escape. */
export default function Dropdown({
    label,
    items,
    variant = "secondary",
    align = "right",
    className,
}: Props) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (e: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
        };
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [open]);

    const itemClasses =
        "block w-full px-4 py-2.5 text-left text-sm text-dim transition-colors hover:bg-raised hover:text-crew";

    return (
        <div ref={rootRef} className={classNames("relative", className)}>
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={buttonClasses(variant, "sm")}
            >
                {label}
                <BiSolidChevronDown
                    className={classNames("h-4 w-4 transition-transform", { "rotate-180": open })}
                    aria-hidden
                />
            </button>

            <div
                role="menu"
                className={classNames(
                    "absolute top-full z-30 mt-2 min-w-52 overflow-hidden rounded-md border border-seam bg-panel shadow-menu",
                    "transition-[opacity,transform] duration-150",
                    align === "right" ? "right-0" : "left-0",
                    open
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0",
                )}
            >
                {items.map((item, i) =>
                    item.href ? (
                        <a
                            key={i}
                            role="menuitem"
                            href={item.href}
                            className={itemClasses}
                            onClick={() => setOpen(false)}
                        >
                            {item.label}
                        </a>
                    ) : (
                        <button
                            key={i}
                            role="menuitem"
                            type="button"
                            className={itemClasses}
                            onClick={() => {
                                setOpen(false);
                                item.onClick?.();
                            }}
                        >
                            {item.label}
                        </button>
                    ),
                )}
            </div>
        </div>
    );
}
