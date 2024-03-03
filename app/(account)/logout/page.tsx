"use client"

import {useContext, useEffect} from "react";
import {logout} from "../../../lib/auth/authorization";
import {redirect} from "next/navigation";
import {AuthorizerContext} from "../../../context/authorizerContext";

const LogoutPage = () => {

    const {revalidateAuth} = useContext(AuthorizerContext);

    useEffect(() => {
        logout().then(_ => {
                revalidateAuth();
                redirect("/");
            }
        );
    }, []);
}

export default LogoutPage;