"use client";

import type { IconType } from "react-icons";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./buttonStyles";

export type { ButtonSize, ButtonVariant } from "./buttonStyles";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    iconLeft?: IconType;
    iconRight?: IconType;
};

export default function Button({
    variant = "primary",
    size = "md",
    iconLeft: IconLeft,
    iconRight: IconRight,
    className,
    children,
    type = "button",
    ...rest
}: ButtonProps) {
    return (
        <button type={type} className={buttonClasses(variant, size, className)} {...rest}>
            {IconLeft && <IconLeft className="h-4 w-4 shrink-0" aria-hidden />}
            {children}
            {IconRight && <IconRight className="h-4 w-4 shrink-0" aria-hidden />}
        </button>
    );
}
