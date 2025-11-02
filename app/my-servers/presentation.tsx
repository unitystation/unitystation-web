"use client";

import {useEffect, useState} from "react";
import FullPage from "../../components/organisms/layout/FullPage";
import Container from "../../components/molecules/layout/Container";
import PageHeading from "../../components/atoms/PageHeading";
import TokenAlertMessage from "../../components/molecules/myServers/TokenAlertMessage";
import ServersPanel from "../../components/organisms/myServers/ServersPanel";
import {MyServer} from "../../types/myServer";
import {ServerStatus} from "../../types/serverStatus";
import {DISCORD_INVITE_URL} from "../../utils/urlContants";

const randomToken = () => {
    const base = Math.random().toString(36).slice(2, 10).toUpperCase();
    const suffix = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `srv_${base}_${suffix}`;
};

const generateMockStatus = (): ServerStatus => ({
    passworded: false,
    serverName: "Unitystation - Playtest Server",
    forkName: "UnityStationDevelop",
    buildVersion: 25110119,
    currentMap: "MainStations/SquareStation.json",
    gameMode: "Secret",
    ingameTime: "12:47:56",
    roundTime: "49",
    playerCount: Math.floor(Math.random() * 10),
    playerCountMax: 45,
    serverIP: "94.130.57.141",
    serverPort: 7777,
    winDownload: "https://unitystationfile.b-cdn.net/UnityStationDevelop/StandaloneWindows64/25110119.zip",
    osxDownload: "https://unitystationfile.b-cdn.net/UnityStationDevelop/StandaloneOSX/25110119.zip",
    linuxDownload: "https://unitystationfile.b-cdn.net/UnityStationDevelop/StandaloneLinux64/25110119.zip",
    fps: 98,
    goodFileVersion: "0.32.0",
});

const mockCreateServer = async (): Promise<MyServer> => {
    return await new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: `server-${Date.now()}`,
                token: randomToken(),
                isTokenVisible: true,
                isAlive: true,
                isWhitelisted: false,
                status: generateMockStatus(),
            });
        }, 800);
    });
};

const mockRegenerateToken = async (): Promise<string> => {
    return await new Promise((resolve) => {
        setTimeout(() => resolve(randomToken()), 700);
    });
};

const initialServers: MyServer[] = [
    {
        id: "server-001",
        token: undefined,
        isTokenVisible: false,
        isAlive: false,
        isWhitelisted: false,
        status: null,
    },
    {
        id: "server-002",
        token: randomToken(),
        isTokenVisible: true,
        isAlive: true,
        isWhitelisted: true,
        status: generateMockStatus(),
    },
];

export default function MyServersPresentation() {
    const [servers, setServers] = useState<MyServer[]>(initialServers);
    const [isCreatingServer, setIsCreatingServer] = useState(false);
    const [busyServerId, setBusyServerId] = useState<string | null>(null);
    const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
    const [feedbackType, setFeedbackType] = useState<"success" | "warning" | "error" | null>(null);
    const [selectedServerId, setSelectedServerId] = useState<string | null>(initialServers[0]?.id ?? null);

    useEffect(() => {
        if (!feedbackMessage) return;
        const timeout = setTimeout(() => {
            setFeedbackMessage(null);
            setFeedbackType(null);
        }, 4000);
        return () => clearTimeout(timeout);
    }, [feedbackMessage, feedbackType]);

    useEffect(() => {
        if (servers.length === 0) {
            setSelectedServerId(null);
            return;
        }

        setSelectedServerId((current) => {
            if (!current) {
                return servers[0].id;
            }

            return servers.some((server) => server.id === current) ? current : servers[0].id;
        });
    }, [servers]);

    const handleCreateServer = async () => {
        setIsCreatingServer(true);
        try {
            const newServer = await mockCreateServer();
            setServers((prev) => [newServer, ...prev]);
            setFeedbackMessage("New server created. Copy the token now to keep it safe.");
            setFeedbackType("success");
            setSelectedServerId(newServer.id);
        } finally {
            setIsCreatingServer(false);
        }
    };

    const handleCopyToken = async (serverId: string, token: string) => {
        setBusyServerId(serverId);
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(token);
                setFeedbackMessage("Token copied to clipboard. It will now be hidden.");
                setFeedbackType("success");
            } else {
                setFeedbackMessage("Clipboard access not available. Please copy the token manually.");
                setFeedbackType("warning");
            }
        } catch {
            setFeedbackMessage("Failed to copy token. Try again or copy it manually.");
            setFeedbackType("error");
        } finally {
            setServers((prev) =>
                prev.map((server) =>
                    server.id === serverId
                        ? { ...server, token: undefined, isTokenVisible: false }
                        : server
                )
            );
            setBusyServerId(null);
        }
    };

    const handleRegenerateToken = async (serverId: string) => {
        setBusyServerId(serverId);
        try {
            const newToken = await mockRegenerateToken();
            setServers((prev) =>
                prev.map((server) =>
                    server.id === serverId
                        ? { ...server, token: newToken, isTokenVisible: true }
                        : server
                )
            );
            setFeedbackMessage("Token regenerated successfully. Copy it before leaving this page.");
            setFeedbackType("success");
        } finally {
            setBusyServerId(null);
        }
    };

    return (
        <FullPage>
            <Container>
                <PageHeading isCentered>My Servers</PageHeading>
                <div className="flex flex-col gap-4">
                    <TokenAlertMessage discordServerLink={DISCORD_INVITE_URL} />

                    <ServersPanel
                        servers={servers}
                        isCreatingServer={isCreatingServer}
                        onCreateServer={handleCreateServer}
                        busyServerId={busyServerId}
                        feedbackMessage={feedbackMessage}
                        feedbackType={feedbackType}
                        selectedServerId={selectedServerId}
                        onSelectServer={(serverId: string) => setSelectedServerId(serverId)}
                        onCopyToken={handleCopyToken}
                        onRegenerate={handleRegenerateToken}
                    />
                </div>
            </Container>
        </FullPage>
    );
}
