import {createContext} from "react";
import {AuthContext} from "../types/authTypes";

export const AuthorizerContext = createContext<AuthContext>({
        isLoggedIn: false
    }
)