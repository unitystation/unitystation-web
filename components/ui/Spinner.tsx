/** Three staggered dots, the system's only loading indicator. */
export default function Spinner({ label = "Loading" }: { label?: string }) {
    return (
        <div className="flex items-center gap-2" role="status" aria-label={label}>
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:200ms]" />
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent [animation-delay:400ms]" />
        </div>
    );
}
