const JOBS = [
    "Captain",
    "Head of Personnel",
    "Clown",
    "Mime",
    "Chef",
    "Bartender",
    "Botanist",
    "Chemist",
    "Medical Doctor",
    "Engineer",
    "Atmospheric Technician",
    "Security Officer",
    "Detective",
    "Warden",
    "Janitor",
    "Cargo Technician",
    "Scientist",
    "Chaplain",
    "Assistant",
    "AI",
    "Cyborg",
];

function TickerRow({ hidden }: { hidden?: boolean }) {
    return (
        <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
            {JOBS.map((job) => (
                <li key={job} className="type-label flex items-center whitespace-nowrap text-faint">
                    <span
                        aria-hidden
                        className="mx-6 h-1 w-1 shrink-0 rounded-full bg-seam-bright/60"
                    />
                    {job}
                </li>
            ))}
        </ul>
    );
}

export default function JobsTicker() {
    return (
        <div className="relative overflow-hidden border-y border-seam bg-hull py-3.5">
            <div className="flex w-max motion-safe:animate-marquee hover:[animation-play-state:paused]">
                <TickerRow />
                <TickerRow hidden />
            </div>
            <span className="type-label pointer-events-none absolute inset-y-0 left-0 flex items-center bg-gradient-to-r from-hull via-hull to-transparent py-3.5 pl-4 pr-10 text-dim sm:pl-6">
                Play as
            </span>
        </div>
    );
}
