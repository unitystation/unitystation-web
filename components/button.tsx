type ButtonProps = {
    filled: boolean, text: string, linkTo: string
}


const Button = (props: ButtonProps) => {
    const {filled, text, linkTo} = props;
    const filledClass = 'bg-gray-800 border-2 border-transparent text-white text-md mr-4 hover:bg-gray-900';
    const outlineClass = 'bg-transparent border-2 border-gray-800 text-white text-md hover:bg-gray-800';

    return (

            <a href={linkTo}
                  className={`uppercase py-2 px-4 ${filled ? filledClass : outlineClass}` }>
                {text}
            </a>
    )

};

export default Button;
