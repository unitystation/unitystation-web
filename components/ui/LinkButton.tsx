import Link from "next/link";
import type { IconType } from "react-icons";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./buttonStyles";

type Props = {
    href: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconLeft?: IconType;
    iconRight?: IconType;
    /** External links get target=_blank + rel automatically. */
    external?: boolean;
    className?: string;
    children: React.ReactNode;
};

/** The Button, as a link. Same variants, same sizes */
export default function LinkButton({
    href,
    variant = "primary",
    size = "md",
    iconLeft: IconLeft,
    iconRight: IconRight,
    external,
    className,
    children,
}: Props) {
    const classes = buttonClasses(variant, size, className);
    const content = (
        <>
            {IconLeft && <IconLeft className="h-4 w-4 shrink-0" aria-hidden />}
            {children}
            {IconRight && <IconRight className="h-4 w-4 shrink-0" aria-hidden />}
        </>
    );

    if (external) {
        return (
            <a href={href} target="_blank" rel="noreferrer" className={classes}>
                {content}
            </a>
        );
    }

    return (
        <Link href={href} className={classes}>
            {content}
        </Link>
    );
}
