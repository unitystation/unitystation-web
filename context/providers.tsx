import LayoutChildren from "../types/layoutChildren";
import AuthorizerContextProvider from "./AuthorizerContextProvider";


const Providers = (props: LayoutChildren) => {

    return (
        <AuthorizerContextProvider>
            {props.children}
        </AuthorizerContextProvider>
    )
}

export default Providers;