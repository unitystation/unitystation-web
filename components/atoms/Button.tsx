import {IconType} from "react-icons";
import classNames from "classnames";
import React from "react";

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    filled?: boolean,
    upperCase?: boolean,
    type?: 'button' | 'submit' | 'reset',
    iconLeft?: IconType,
    iconRight?: IconType,
    className?: string
}

const Button = (props: ButtonProps) => {
    const {type = 'button', filled = true, upperCase = true, iconLeft: IconLeft, iconRight: IconRight} = props;
    const filledClass = 'bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900';
    const outlineClass = 'bg-gray-800 bg-opacity-30 border-2 border-gray-800 text-white text-md hover:bg-gray-800';
    const classes = classNames(
        'py-2 px-4 flex justify-center items-center',
        {'uppercase': upperCase},
        filled ? filledClass : outlineClass,
        props.className
    )

    return (
        <button onClick={props.onClick} type={type} className={classes}>
            {IconLeft && <IconLeft className="mr-3 w-7 h-7" />}
            {props.children}
            {IconRight && <IconRight className="ml-3 w-7 h-7" />}
        </button>
    )
}

export default Button;