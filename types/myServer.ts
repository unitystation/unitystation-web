import type {ServerStatus} from "./serverStatus";

export type MyServer = {
    id: string;
    token?: string;
    isTokenVisible: boolean;
    isAlive: boolean;
    isWhitelisted: boolean;
    status?: ServerStatus | null;
};
