import Button from "../../atoms/Button";
import { FaDiscord } from "react-icons/fa";
import React from "react";
import { IoIosInformationCircle } from "react-icons/io";
import { Alert } from "flowbite-react";

type TokenInfoMessageProps = {
    discordServerLink: string;
};

const TokenAlertMessage = ({ discordServerLink }: TokenInfoMessageProps) => {
    const handleCta = () => {
        const anchor = document.createElement("a");
        anchor.href = discordServerLink;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
    }

    const body = (
        <div className="flex flex-col gap-1 text-xs">
            <p>
                Register a server under your name and receive a token similar to Twitch&apos;s streaming token.
            </p>
            <p>
                Save it somewhere safe and never share it. We currently only list whitelisted servers, so reach
                out to us to get whitelisted.
            </p>
            <div className="mt-2 flex">
                <Button iconLeft={FaDiscord} upperCase={false} onClick={handleCta}>
                    Get whitelisted
                </Button>
            </div>
        </div>
    );

    return (
        <Alert rounded color="info" icon={IoIosInformationCircle} additionalContent={body}>
            <b>Your token is sensitive information!</b>
        </Alert>
    );
};

export default TokenAlertMessage;
