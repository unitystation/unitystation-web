import Link from "next/link";
import classNames from "classnames";

type Props = {
    href: string;
    /** Inner layout of the card (e.g. `flex flex-col` or a grid). */
    className?: string;
    children: React.ReactNode;
};

/**
 * A whole card as one link: the Panel surface with an accent border on
 * hover and the standard focus ring. It sets `group`, so children can
 * react to hover (title tint, PostMedia's slow zoom).
 */
export default function CardLink({ href, className, children }: Props) {
    return (
        <Link
            href={href}
            className={classNames(
                "group overflow-hidden rounded-lg border border-seam bg-panel shadow-panel",
                "transition-colors hover:border-accent/60",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                "focus-visible:ring-offset-2 focus-visible:ring-offset-void",
                className,
            )}
        >
            {children}
        </Link>
    );
}
