import classNames from "classnames";
import {DivCommonProps} from "../../../types/ComponentProps";

interface PanelProps extends DivCommonProps {
    solid?: boolean;
}

export default function Panel(props: PanelProps) {
    const { children, solid, ...rest } = props;
    const className = classNames(
        "mx-auto w-full px-10 py-10 mb-8 format format-sm sm:format-base lg:format-lg format-invert bg-gray-900",{
            "bg-opacity-75": !solid,
        },
        rest.className
    );

    return (
        <article className={className}>
            {children}
        </article>
    );
}