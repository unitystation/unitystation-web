"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

/** One-line shell command with a copy button. */
export default function CopyCommand({ command }: { command: string }) {
    const [copied, setCopied] = useState(false);

    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard unavailable (e.g. insecure context); the command stays selectable.
        }
    };

    return (
        <span className="inline-flex items-stretch overflow-hidden rounded-md border border-steel">
            <code className="select-all bg-hull px-3 py-1.5 font-mono text-xs text-info">
                {command}
            </code>
            <button
                type="button"
                onClick={onCopy}
                aria-label={copied ? "Command copied" : "Copy install command"}
                className="flex items-center border-l border-steel bg-panel px-2 text-dim transition-colors hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
                {copied ? (
                    <FiCheck className="h-3.5 w-3.5 text-success" aria-hidden />
                ) : (
                    <FiCopy className="h-3.5 w-3.5" aria-hidden />
                )}
            </button>
        </span>
    );
}
