
import React from "react";
import {Label, TextInput} from "flowbite-react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    shadow?: boolean;
    label: string;
    helperText?: React.ReactNode;
}

const TextField = (props: TextFieldProps) => {
    const {shadow = false} = props;

    return (
        <div className={props.className}>
            <div className="mb-2 block">
                <Label htmlFor={props.id} value={props.label}/>
            </div>
            <TextInput
                className='w-full'
                id={props.id}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                required={props.required}
                shadow={shadow}
                helperText={props.helperText}
            />
        </div>
    )
}

export default TextField;