"use client"

import {useContext, useEffect} from "react";
import {redirect} from "next/navigation";
import {AuthorizerContext} from "../../../context/AuthorizerContextProvider";

const LogoutPage = () => {
    const authState = useContext(AuthorizerContext);

    useEffect(() => {
        authState.logout().then(() => {
            redirect("login");
        });
    }, []);
}

export default LogoutPage;