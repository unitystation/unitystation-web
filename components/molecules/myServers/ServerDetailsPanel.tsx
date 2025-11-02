import classNames from "classnames";
import { ReactNode } from "react";
import Panel from "../../molecules/layout/Panel";
import { MyServer } from "../../../types/myServer";

type ServerDetailsPanelProps = {
    server: MyServer | null;
    className?: string;
};

type DetailRowProps = {
    label: string;
    value: ReactNode;
};

const DetailRow = ({ label, value }: DetailRowProps) => (
    <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-gray-500">{label}</span>
        <span className="text-sm text-gray-100 break-words">{value}</span>
    </div>
);

const ServerDetailsPanel = ({ server, className }: ServerDetailsPanelProps) => {
    const panelClasses = classNames("w-full", className);

    if (!server) {
        return (
            <Panel className={panelClasses}>
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                    Select a server on the left to inspect its live details.
                </div>
            </Panel>
        );
    }

    const aliveBadgeClasses = classNames(
        "px-2 py-1 text-xs font-semibold rounded",
        server.isAlive ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"
    );
    const whitelistBadgeClasses = classNames(
        "px-2 py-1 text-xs font-semibold rounded",
        server.isWhitelisted ? "bg-blue-900 text-blue-200" : "bg-gray-700 text-gray-200"
    );

    const status = server.status;
    const statusAvailable = server.isAlive && !!status;

    return (
        <Panel className={panelClasses}>
            <div className="flex max-h-full flex-col gap-4 overflow-y-auto pr-1">
                <div>
                    <h3 className="text-xl font-semibold text-white">Server details</h3>
                    <p className="text-sm text-gray-400">ID: {server.id}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <span className={aliveBadgeClasses}>{server.isAlive ? "Alive" : "Offline"}</span>
                    <span className={whitelistBadgeClasses}>
                        {server.isWhitelisted ? "Publicly reachable" : "Awaiting whitelist"}
                    </span>
                </div>

                {!server.isAlive && (
                    <div className="rounded border border-yellow-600 bg-yellow-900/30 p-3 text-sm text-yellow-100">
                        This server is currently offline. Live status information is unavailable.
                    </div>
                )}

                {statusAvailable && status && (
                    <div className="flex flex-col gap-4">
                        <div>
                            <h4 className="text-lg font-semibold text-white">Live status</h4>
                            <p className="text-sm text-gray-400">
                                Updated from the latest heartbeat.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <DetailRow label="Server name" value={status.serverName} />
                            <DetailRow label="Fork" value={status.forkName} />
                            <DetailRow label="Build version" value={status.buildVersion} />
                            <DetailRow label="Game mode" value={status.gameMode} />
                            <DetailRow label="Current map" value={status.currentMap} />
                            <div className="grid grid-cols-2 gap-4">
                                <DetailRow label="Players" value={`${status.playerCount}/${status.playerCountMax}`} />
                                <DetailRow label="FPS" value={status.fps} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <DetailRow label="In-game time" value={status.ingameTime} />
                                <DetailRow label="Round time" value={`${status.roundTime} min`} />
                            </div>
                            <DetailRow label="Good file version" value={status.goodFileVersion} />
                            <div className="grid grid-cols-2 gap-4">
                                <DetailRow label="IP" value={status.serverIP} />
                                <DetailRow label="Port" value={status.serverPort} />
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <DetailRow
                                    label="Windows download"
                                    value={
                                        <a className="text-blue-400 hover:text-blue-300" href={status.winDownload} target="_blank" rel="noreferrer">
                                            Download for Windows
                                        </a>
                                    }
                                />
                                <DetailRow
                                    label="macOS download"
                                    value={
                                        <a className="text-blue-400 hover:text-blue-300" href={status.osxDownload} target="_blank" rel="noreferrer">
                                            Download for macOS
                                        </a>
                                    }
                                />
                                <DetailRow
                                    label="Linux download"
                                    value={
                                        <a className="text-blue-400 hover:text-blue-300" href={status.linuxDownload} target="_blank" rel="noreferrer">
                                            Download for Linux
                                        </a>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )}

                {!statusAvailable && status && (
                    <div className="flex flex-col gap-3">
                        <h4 className="text-lg font-semibold text-white">Last known status</h4>
                        <div className="grid grid-cols-1 gap-4">
                            <DetailRow label="Server name" value={status.serverName} />
                            <DetailRow label="Build version" value={status.buildVersion} />
                            <DetailRow label="Player capacity" value={`${status.playerCountMax} max players`} />
                        </div>
                    </div>
                )}

            </div>
        </Panel>
    );
};

export default ServerDetailsPanel;
