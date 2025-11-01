import React from "react";
import classNames from "classnames";

interface PageSectionTitleProps {
    children: React.ReactNode,
    extraClasses?: string
}

const PageSectionTitle = (props: PageSectionTitleProps) => {
    const {children, extraClasses} = props;

    return (

        <p className={classNames('text-3xl text-center font-bold leading-tight text-white', extraClasses)}>
            {children}
        </p>
    )
}

export default PageSectionTitle;