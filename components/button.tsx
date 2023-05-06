import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { icon } from "@fortawesome/fontawesome-svg-core";

type ButtonProps = {
    filled: boolean, text: string, linkTo: string, buttonIcon?: IconDefinition,
}


const Button = (props: ButtonProps) => {
    const {filled, text, linkTo, buttonIcon} = props;
    const filledClass = 'bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900';
    const outlineClass = 'bg-transparent border-2 border-gray-800 text-white text-md hover:bg-gray-800';

    return (

            <a href={linkTo}
                  className={`uppercase py-2 px-4 ${filled ? filledClass : outlineClass}` }>
                {buttonIcon == null ? '' : <FontAwesomeIcon icon={buttonIcon}></FontAwesomeIcon>}
                {text}
            </a>
    )

};

export default Button;
