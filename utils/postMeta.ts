import type { Tone } from "../components/ui/tones";

/* Blog post `type` → display label + department tone, shared by the home
 * news section and the blog pages. */
export const POST_TYPE_LABEL: Record<string, string> = {
    announcement: "Announcement",
    weekly: "Progress Update",
    community: "Community Highlight",
};

export const POST_TYPE_TONE: Record<string, Tone> = {
    announcement: "info",
    weekly: "primary",
    community: "success",
};

export function postTypeLabel(type: string): string {
    return POST_TYPE_LABEL[type] ?? type;
}

export function postTypeTone(type: string): Tone {
    return POST_TYPE_TONE[type] ?? "neutral";
}
