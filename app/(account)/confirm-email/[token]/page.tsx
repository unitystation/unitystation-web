"use client"
import {useParams} from "next/navigation";
import {postMailConfirmationToken} from "./actions";
import React, {useEffect, useState} from "react";
import Panel from "../../../../components/molecules/layout/Panel";
import ContactInformation from "../../../../components/organisms/home/ContactInformation";


const MailConfirmationPage = () => {
    const [response, setResponse] = useState<{ success?: boolean; error?: string }>({});
    const {token} = useParams<{token: string}>();

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                return await postMailConfirmationToken(token);
            }
        };

        fetchData().then(r => {
            setResponse(r);
        });
    }, [token]);

    if (!token) {
        return <main>
        </main>;
    }

    return (
        <main className="flex flex-col justify-between min-h-screen pt-8 pb-16 lg:pt-16 lg:pb-24">
            <div>
                <Panel>
                    <div
                        className="mb-4 text-4xl text-center font-extrabold leading-tight lg:mb-6 text-white">
                        {response.success ? (
                            <h1>Confirmation successful!</h1>
                        ) : (
                            <h1>{response.error || 'Waiting for confirmation...'}</h1>
                        )}
                    </div>
                </Panel>
            </div>
            <ContactInformation/>
        </main>
    );
};

export default MailConfirmationPage;
