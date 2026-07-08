import classNames from "classnames";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

/* Shared look between Button and LinkButton. Solid launcher-style controls:
 * teal for the main action, steel blue for everything else. */
export function buttonClasses(
    variant: ButtonVariant = "primary",
    size: ButtonSize = "md",
    className?: string,
) {
    return classNames(
        "inline-flex items-center justify-center gap-2 select-none rounded-md",
        "font-display font-semibold uppercase tracking-label",
        "transition-colors duration-150 focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-void",
        "disabled:opacity-40 disabled:pointer-events-none",
        {
            "px-3 py-1.5 text-xs": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-7 py-3.5 text-base": size === "lg",
        },
        {
            "bg-primary text-white hover:bg-primary-hot": variant === "primary",
            "bg-steel text-crew hover:bg-seam-bright": variant === "secondary",
            "text-dim hover:text-crew": variant === "ghost",
            "bg-danger-fill text-white hover:bg-danger-fill/80": variant === "danger",
        },
        className,
    );
}
