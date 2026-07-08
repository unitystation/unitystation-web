import classNames from "classnames";

type Props = {
    "aria-label": string;
    className?: string;
    children: React.ReactNode;
};

/**
 * Fuses Buttons/LinkButtons into one segmented launcher bar: the group owns
 * the border, corners and bevel; children are flattened into equal segments.
 */
export default function ButtonGroup({ className, children, ...rest }: Props) {
    return (
        <div
            role="group"
            className={classNames(
                "flex divide-x divide-seam overflow-hidden rounded-md",
                "border border-seam bg-steel shadow-bevel",
                "[&>*]:flex-1 [&>*]:rounded-none",
                // keep focus rings visible inside the clipped container
                "[&>*:focus-visible]:ring-inset [&>*:focus-visible]:ring-offset-0",
                className,
            )}
            {...rest}
        >
            {children}
        </div>
    );
}
