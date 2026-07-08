/*
 * Accent tones: the one accent scale of the design system, built on the
 * classic StationHub palette. Components accept a `tone` and resolve it
 * here so colour usage stays consistent everywhere.
 */
export type Tone = "primary" | "info" | "success" | "warning" | "danger" | "neutral";

export const toneText: Record<Tone, string> = {
    primary: "text-accent",
    info: "text-info",
    success: "text-success",
    warning: "text-warning",
    danger: "text-danger",
    neutral: "text-dim",
};

export const toneBorder: Record<Tone, string> = {
    primary: "border-accent/40",
    info: "border-info/40",
    success: "border-success/40",
    warning: "border-warning/40",
    danger: "border-danger/40",
    neutral: "border-seam-bright",
};

export const toneBg: Record<Tone, string> = {
    primary: "bg-primary/15",
    info: "bg-info/10",
    success: "bg-success/10",
    warning: "bg-warning/10",
    danger: "bg-danger/10",
    neutral: "bg-raised/50",
};

export const toneSolidBg: Record<Tone, string> = {
    primary: "bg-accent",
    info: "bg-info",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-danger",
    neutral: "bg-seam-bright",
};
