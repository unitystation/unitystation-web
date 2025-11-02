import React, {type JSX} from "react";

type CommonExtras = {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
};

export type GenericPropsOf<T extends keyof JSX.IntrinsicElements> =
    CommonExtras & React.ComponentPropsWithoutRef<T>;

export type DivCommonProps = GenericPropsOf<"div">;
export type FormCommonProps = GenericPropsOf<"form">;
export type ButtonCommonProps = GenericPropsOf<"button">;