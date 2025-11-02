import {MyServer} from "../../../types/myServer";
import ServerCard from "../../molecules/myServers/ServerCard";
import ServerDetailsPanel from "../../molecules/myServers/ServerDetailsPanel";

type ServerListProps = {
    servers: MyServer[];
    busyServerId: string | null;
    selectedServerId: string | null;
    selectedServer: MyServer | null;
    onSelectServer: (serverId: string) => void;
    onCopyToken: (serverId: string, token: string) => Promise<void>;
    onRegenerate: (serverId: string) => Promise<void>;
};

const ServerList = ({
    servers,
    busyServerId,
    selectedServerId,
    selectedServer,
    onSelectServer,
    onCopyToken,
    onRegenerate,
}: ServerListProps) => {
    if (servers.length === 0) {
        return (
            <div className="flex flex-col gap-4 lg:flex-row">
                <div className="rounded-lg border border-dashed border-gray-700 bg-gray-900 p-6 text-center text-sm text-gray-400 lg:flex-[5]">
                    You have no registered servers yet. Create one to get started.
                </div>
                <ServerDetailsPanel server={null} className="lg:flex-[2] lg:max-w-md lg:max-h-[32rem]" />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-col gap-4 lg:flex-[5]">
                {servers.map((server) => (
                    <ServerCard
                        key={server.id}
                        server={server}
                        onCopyToken={onCopyToken}
                        onRegenerate={onRegenerate}
                        isBusy={busyServerId === server.id}
                        isSelected={server.id === selectedServerId}
                        onSelect={onSelectServer}
                    />
                ))}
            </div>
            <ServerDetailsPanel server={selectedServer} className="lg:flex-[2] lg:max-w-md lg:max-h-[32rem]" />
        </div>
    );
};

export default ServerList;
