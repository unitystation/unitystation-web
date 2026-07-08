export interface DownloadVariant {
    label: string;
    url: string;
    sizeMB: number;
}

export interface AurVariant {
    cmd: string;
    pageUrl: string;
}

export interface WindowsPlatform {
    recommended?: DownloadVariant;
    alternatives: DownloadVariant[];
}

export interface MacPlatform {
    recommended?: DownloadVariant;
    note: string;
}

export interface LinuxPlatform {
    deb?: DownloadVariant;
    rpm?: DownloadVariant;
    aur: AurVariant;
}

export type OsKey = "win" | "mac" | "linux";

export interface LauncherRelease {
    version: string;
    releasesPageUrl: string;
    platforms: {
        windows: WindowsPlatform;
        mac: MacPlatform;
        linux: LinuxPlatform;
    };
}
