import {IconType} from "react-icons";
import classNames from "classnames";
import LayoutChildren from "../../../types/layoutChildren";

interface ButtonProps extends LayoutChildren{
    filled: boolean,
    type: 'button' | 'submit' | 'reset',
    iconLeft?: IconType,
    iconRight?: IconType,
    className?: string
}

const Button = (props: ButtonProps) => {
    const {filled, iconLeft: IconLeft, iconRight: IconRight, ...rest} = props;
    const filledClass = 'bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900';
    const outlineClass = 'bg-gray-800 bg-opacity-30 border-2 border-gray-800 text-white text-md hover:bg-gray-800';
    const classes = classNames(
        'uppercase py-2 px-4 flex justify-center items-center',
        filled ? filledClass : outlineClass,
        props.className
    )

    return (
        <button className={classes}>{props.children}</button>
    )

}

export default Button;