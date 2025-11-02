import React from "react";
import Panel from "../../molecules/layout/Panel";
import Button from "../../atoms/Button";
import {Alert} from "flowbite-react";
import {IoIosWarning, IoIosCheckmarkCircle, IoIosCloseCircle} from "react-icons/io";
import ServerList from "./ServerList";
import {MyServer} from "../../../types/myServer";

type ServersPanelProps = {
    servers: MyServer[];
    isCreatingServer: boolean;
    onCreateServer: () => void;
    busyServerId: string | null;
    feedbackMessage?: string | null;
    feedbackType?: "success" | "warning" | "error" | null;
    selectedServerId: string | null;
    onSelectServer: (serverId: string) => void;
    onCopyToken: (serverId: string, token: string) => Promise<void>;
    onRegenerate: (serverId: string) => Promise<void>;
};

const ServersPanel = ({
    servers,
    isCreatingServer,
    onCreateServer,
    busyServerId,
    feedbackMessage,
    feedbackType,
    selectedServerId,
    onSelectServer,
    onCopyToken,
    onRegenerate,
}: ServersPanelProps) => {
    const alertConfig = {
        success: {color: "success" as const, icon: IoIosCheckmarkCircle},
        warning: {color: "warning" as const, icon: IoIosWarning},
        error: {color: "failure" as const, icon: IoIosCloseCircle},
    };

    const currentAlert = feedbackType ? alertConfig[feedbackType] : alertConfig.warning;
    const selectedServer = selectedServerId
        ? servers.find((server) => server.id === selectedServerId) ?? null
        : null;

    return (
        <Panel>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Registered servers</h2>
                        <p className="text-sm text-gray-400">
                            New tokens are only shown once. Regenerate if you lost yours.
                        </p>
                    </div>
                    <Button
                        type="button"
                        upperCase={false}
                        filled
                        className="w-full sm:w-auto"
                        onClick={onCreateServer}
                        disabled={isCreatingServer}
                    >
                        {isCreatingServer ? "Creating..." : "Create New Server"}
                    </Button>
                </div>

                {feedbackMessage && (
                    <Alert color={currentAlert.color} icon={currentAlert.icon} rounded>
                        {feedbackMessage}
                    </Alert>
                )}

                <ServerList
                    servers={servers}
                    busyServerId={busyServerId}
                    selectedServerId={selectedServerId}
                    selectedServer={selectedServer}
                    onSelectServer={onSelectServer}
                    onCopyToken={onCopyToken}
                    onRegenerate={onRegenerate}
                />
            </div>
        </Panel>
    );
};

export default ServersPanel;
