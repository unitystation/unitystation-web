import classNames from "classnames";

type Props = {
    /** The small mono line above the heading ("From the blog"). */
    kicker: string;
    title: string;
    /** Optional lead paragraph under the heading. */
    lead?: React.ReactNode;
    /** `lg` opens a full section; `md` for headers that share the row with an action. */
    size?: "md" | "lg";
    centered?: boolean;
    className?: string;
};

/**
 * Opens a section that sits directly on the starfield: kicker line, display
 * heading and optional lead, all with text halos. For content inside a
 * Panel use PageHeader instead, panels never need halos.
 */
export default function SectionIntro({
    kicker,
    title,
    lead,
    size = "lg",
    centered,
    className,
}: Props) {
    return (
        <div
            className={classNames(centered && "flex flex-col items-center text-center", className)}
        >
            <p className="type-label text-halo-sm text-faint underline">{kicker}</p>
            <h2
                className={classNames(
                    "text-halo-lg mt-4 font-display font-bold leading-tight text-crew",
                    size === "lg" ? "text-3xl sm:text-5xl" : "text-3xl sm:text-4xl",
                )}
            >
                {title}
            </h2>
            {lead && (
                <p
                    className={classNames(
                        "text-halo-md mt-5 text-base text-dim sm:text-lg",
                        centered ? "max-w-xl" : "max-w-2xl",
                    )}
                >
                    {lead}
                </p>
            )}
        </div>
    );
}
