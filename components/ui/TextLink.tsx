import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";

type Props = {
    href: string;
    children: React.ReactNode;
    external?: boolean;
    className?: string;
};

/** Inline text link. Light blue, underlined on hover; external ones get the icon. */
export default function TextLink({ href, children, external, className = "" }: Props) {
    const classes = `inline-flex items-center gap-1 text-accent transition-colors hover:text-crew hover:underline ${className}`;

    if (external) {
        return (
            <a href={href} target="_blank" rel="noreferrer" className={classes}>
                {children}
                <GoLinkExternal className="h-3.5 w-3.5 shrink-0" aria-hidden />
            </a>
        );
    }

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
}
