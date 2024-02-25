'use client'

import LayoutChildren from "../types/layoutChildren";
import {AuthorizerContext} from "../context/authorizerContext";

export const Providers = (props: LayoutChildren) => {

    return (
        <AuthorizerContext.Provider value={{isLoggedIn: false}}>
            {props.children}
        </AuthorizerContext.Provider>
    )
}