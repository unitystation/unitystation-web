import layoutChildren from "../../../../types/layoutChildren";
import Container from "../container";
import TopMiddlePlacer from "./topMiddlePlacer";
import Panel from "../panel";
import React from "react";
import classNames from "classnames";

interface FormContainerProps extends layoutChildren, React.FormHTMLAttributes<HTMLFormElement>{
    title: string;
}

const FormContainer = (props: FormContainerProps) => {

    const classes = classNames(
        props.className ? props.className : 'flex flex-col gap-4 w-full',
    );

    return (
        <Container>
            <TopMiddlePlacer>
                <Panel className='flex h-full max-w-md'>
                    <div className='flex flex-col gap-4 p-4 w-full'>
                        <h2 className="text-center text-2xl font-bold">{props.title}</h2>
                        <form className={classes} action={props.action}>
                            {props.children}
                        </form>
                    </div>
                </Panel>
            </TopMiddlePlacer>
        </Container>
    );
}

export default FormContainer;