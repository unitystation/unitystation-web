"use client";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import Button from "./Button";

type Props = {
    hasPrevious: boolean;
    hasNext: boolean;
    onPrevious: () => void;
    onNext: () => void;
    /** Optional centre label, e.g. "Page 2". */
    label?: string;
};

/** Prev/next pager for API-paginated lists. */
export default function Pagination({ hasPrevious, hasNext, onPrevious, onNext, label }: Props) {
    return (
        <nav aria-label="Pagination" className="flex items-center justify-between gap-4 py-4">
            <Button
                variant="secondary"
                size="sm"
                iconLeft={BiChevronLeft}
                disabled={!hasPrevious}
                onClick={onPrevious}
            >
                Prev
            </Button>
            {label && <span className="type-label text-faint">{label}</span>}
            <Button
                variant="secondary"
                size="sm"
                iconRight={BiChevronRight}
                disabled={!hasNext}
                onClick={onNext}
            >
                Next
            </Button>
        </nav>
    );
}
