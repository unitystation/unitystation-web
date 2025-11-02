import {IconType} from "react-icons";
import classNames from "classnames";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    filled?: boolean;
    upperCase?: boolean;
    iconLeft?: IconType;
    iconRight?: IconType;
}

const Button = ({
    type = "button",
    filled = true,
    upperCase = true,
    iconLeft: IconLeft,
    iconRight: IconRight,
    className,
    disabled = false,
    children,
    ...rest
}: ButtonProps) => {
    const filledClass =
        "bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900";
    const outlineClass =
        "bg-gray-800 bg-opacity-30 border-2 border-gray-800 text-white text-md hover:bg-gray-800";
    const disabledClass = "opacity-60 cursor-not-allowed hover:bg-gray-800";

    const classes = classNames(
        "py-2 px-4 flex justify-center items-center transition-colors duration-150",
        {"uppercase": upperCase},
        filled ? filledClass : outlineClass,
        disabled && disabledClass,
        className
    );

    return (
        <button type={type} className={classes} disabled={disabled} {...rest}>
            {IconLeft && <IconLeft className="mr-3 w-7 h-7" />}
            {children}
            {IconRight && <IconRight className="ml-3 w-7 h-7" />}
        </button>
    );
};

export default Button;
