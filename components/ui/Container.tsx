import classNames from "classnames";

type Props = {
    children: React.ReactNode;
    /** narrow = forms & articles, default = page content, wide = tables/grids */
    width?: "narrow" | "default" | "wide";
    className?: string;
};

/** Horizontal page rhythm. All routed pages wrap their content in one. */
export default function Container({ children, width = "default", className }: Props) {
    return (
        <div
            className={classNames(
                "mx-auto w-full px-4 sm:px-6",
                {
                    "max-w-2xl": width === "narrow",
                    "max-w-5xl": width === "default",
                    "max-w-7xl": width === "wide",
                },
                className,
            )}
        >
            {children}
        </div>
    );
}
