import React from "react";
import Link from "next/link";
import classNames from "classnames";

interface LinkElement {
    link: string;
    linkText: string;
}

interface AlternativeActionsProps {
    links: LinkElement[];
    className?: string;
}

const AlternativeActions = (props: AlternativeActionsProps) => {
    const classes = classNames(
        props.className ? props.className : 'flex flex-col text-center',
    )

    return (
        <div className={classes}>
            {props.links.map((link, index) => (
                <Link className="text-sm text-gray-500 hover:text-blue-600 hover:underline" href={link.link}
                      key={index}>
                    {link.linkText}
                </Link>
            ))}
        </div>
    )
}

export default AlternativeActions;
