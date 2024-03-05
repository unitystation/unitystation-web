"use client"

import {createContext} from "react";
import {AuthContext} from "../lib/auth/types";
import LayoutChildren from "../types/layoutChildren";
import {useAuth} from "../lib/auth/useAuth";

export const AuthorizerContext = createContext<AuthContext>({
    state: {
        isLoggedIn: false,
        authContext: undefined,
        error: undefined,
    },
    credentialsLogin: async (email: string, password: string) => {throw new Error("Credentials Login was not served.")},
    logout: async () => {throw new Error("Logout was not served.")}
})

const AuthorizerContextProvider = (props: LayoutChildren) => {
    const context: AuthContext = useAuth();

    return (
        <AuthorizerContext.Provider value={context}>
            {props.children}
        </AuthorizerContext.Provider>
    )
}

export default AuthorizerContextProvider;