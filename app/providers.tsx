'use client'

import LayoutChildren from "../types/layoutChildren";
import {AuthorizerContext} from "../context/authorizerContext";
import {useAuth} from "../lib/auth/useAuth";
import {useState} from "react";


export const Providers = (props: LayoutChildren) => {

    const {isLoggedIn, authContext, error} = useAuth();
    const [authState, setAuthState] = useState({isLoggedIn, authContext, error});

    const useRevalidateAuth = () => {
        const {isLoggedIn, authContext, error} = useAuth();
        setAuthState({isLoggedIn, authContext, error});
    }

    return (
        <AuthorizerContext.Provider value={{...authState, revalidateAuth: useRevalidateAuth}}>
            {props.children}
        </AuthorizerContext.Provider>
    )
}