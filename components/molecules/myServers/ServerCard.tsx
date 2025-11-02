import React from "react";
import classNames from "classnames";
import Button from "../../atoms/Button";
import {MyServer} from "../../../types/myServer";

export type ServerCardProps = {
    server: MyServer;
    onCopyToken: (serverId: string, token: string) => Promise<void>;
    onRegenerate: (serverId: string) => Promise<void>;
    isBusy: boolean;
    isSelected?: boolean;
    onSelect?: (serverId: string) => void;
};

const ServerCard = ({server, onCopyToken, onRegenerate, isBusy, isSelected = false, onSelect}: ServerCardProps) => {
    const isTokenVisible = server.isTokenVisible && !!server.token;
    const tokenText = isTokenVisible
        ? server.token
        : "Token is hidden. Regenerate it if you lost it.";

    const cardClasses = classNames(
        "flex flex-col gap-3 rounded-lg border border-gray-700 bg-gray-900 p-4 transition-shadow cursor-pointer",
        {
            "border-blue-500 shadow-lg shadow-blue-500/20": isSelected,
            "hover:border-blue-400 hover:shadow hover:shadow-blue-500/10": !isSelected,
        }
    );

    const handleCardClick = () => {
        onSelect?.(server.id);
    };

    const handleCopyToken = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (!server.token) {
            return;
        }
        await onCopyToken(server.id, server.token);
    };

    const handleRegenerateToken = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        await onRegenerate(server.id);
    };

    return (
        <div className={cardClasses} onClick={handleCardClick} role="button" tabIndex={0} onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect?.(server.id);
            }
        }}>
            <div className="flex flex-col gap-1 text-sm">
                <span className="font-semibold text-gray-300">Server ID</span>
                <span className="break-all font-mono text-base text-white">{server.id}</span>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex-1 break-all rounded-md border border-gray-700 bg-gray-800 p-3 text-sm text-gray-100">
                    {tokenText}
                </div>
                {isTokenVisible ? (
                    <Button
                        type="button"
                        upperCase={false}
                        filled
                        className="w-full sm:w-auto"
                        onClick={handleCopyToken}
                        disabled={isBusy}
                    >
                        {isBusy ? "Copying..." : "Copy Token"}
                    </Button>
                ) : (
                    <Button
                        type="button"
                        upperCase={false}
                        filled
                        className="w-full sm:w-auto"
                        onClick={handleRegenerateToken}
                        disabled={isBusy}
                    >
                        {isBusy ? "Regenerating..." : "Regenerate Token"}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ServerCard;
