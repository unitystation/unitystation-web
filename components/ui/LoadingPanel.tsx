import Spinner from "./Spinner";

/** Full-width placeholder panel while a list or page section loads. */
export default function LoadingPanel({ label = "Loading" }: { label?: string }) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-seam bg-panel py-14">
            <Spinner label={label} />
            <p className="type-label text-faint">{label}…</p>
        </div>
    );
}
