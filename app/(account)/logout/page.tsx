"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import LoadingPanel from "../../../components/ui/LoadingPanel";
import Container from "../../../components/ui/Container";
import { AuthorizerContext } from "../../../context/AuthorizerContextProvider";

export default function LogoutPage() {
    const authState = useContext(AuthorizerContext);
    const router = useRouter();

    useEffect(() => {
        authState.logout().then(() => {
            router.replace("/login");
        });
        // Log out exactly once on mount. `authState` gets a fresh identity on every
        // render (useAuth returns a new object each time), so depending on it here
        // would re-run this effect after logout's setState and loop infinitely.
        // oxlint-disable-next-line react/exhaustive-deps
    }, []);

    return (
        <Container width="narrow" className="py-16">
            <LoadingPanel label="Signing off" />
        </Container>
    );
}
