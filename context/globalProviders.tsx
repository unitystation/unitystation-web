import AuthorizerContextProvider from "./AuthorizerContextProvider";
import {DivCommonProps} from "../types/ComponentProps";


const GlobalProviders = (props: DivCommonProps) => {

    return (
        <AuthorizerContextProvider>
            {props.children}
        </AuthorizerContextProvider>
    )
}

export default GlobalProviders;