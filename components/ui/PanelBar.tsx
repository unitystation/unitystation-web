import classNames from "classnames";

type Props = {
    children: React.ReactNode;
    /** Which edge of the panel the strip sits on; sets its border and corner rounding. */
    edge?: "top" | "bottom";
    /** Render as a <header> when the strip titles its panel. */
    as?: "div" | "header";
    className?: string;
};

/**
 * The raised strip of a launcher window: title bars and status bars. Sits
 * flush against a Panel edge (or any bg-panel frame) and rounds the outer
 * corners so it never paints over the panel's radius.
 */
export default function PanelBar({ children, edge = "top", as: Tag = "div", className }: Props) {
    return (
        <Tag
            className={classNames(
                "flex items-center justify-between gap-4 bg-raised px-4 py-2.5",
                edge === "top"
                    ? "rounded-t-[7px] border-b border-seam"
                    : "rounded-b-[7px] border-t border-seam",
                className,
            )}
        >
            {children}
        </Tag>
    );
}
