type Props = {
    title: string;
    lede?: React.ReactNode;
    centered?: boolean;
};

/** Standard page opening: display title and an optional short description. */
export default function PageHeader({ title, lede, centered }: Props) {
    return (
        <header className={`py-10 sm:py-14 ${centered ? "text-center" : ""}`}>
            <h1 className="font-display text-4xl font-bold leading-none tracking-tight text-crew sm:text-5xl">
                {title}
            </h1>
            {lede && (
                <p className={`mt-4 max-w-2xl text-dim ${centered ? "mx-auto" : ""}`}>{lede}</p>
            )}
        </header>
    );
}
