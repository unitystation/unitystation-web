import { UAParser } from "ua-parser-js";
import { OsKey } from "../types/launcherRelease";

export type LinuxFamily = "arch" | "debian" | "rpm";
export type DetectedOs = OsKey | "unknown";

export interface PlatformInfo {
    os: DetectedOs;
    linuxFamily?: LinuxFamily;
}

const ARCH_DISTROS = ["arch", "manjaro", "endeavouros", "garuda"];
const DEBIAN_DISTROS = ["debian", "ubuntu", "mint", "pop", "elementary"];
const RPM_DISTROS = ["fedora", "redhat", "rhel", "centos", "suse", "opensuse", "rocky", "alma"];

function linuxFamilyFrom(osName: string): LinuxFamily | undefined {
    if (ARCH_DISTROS.some((d) => osName.includes(d))) return "arch";
    if (DEBIAN_DISTROS.some((d) => osName.includes(d))) return "debian";
    if (RPM_DISTROS.some((d) => osName.includes(d))) return "rpm";
    return undefined;
}

export function detectPlatform(uaString?: string): PlatformInfo {
    const parser = uaString ? new UAParser(uaString) : new UAParser();
    const osName = (parser.getResult().os.name ?? "").toLowerCase();

    if (osName.includes("windows")) return { os: "win" };
    if (osName.includes("mac")) return { os: "mac" };

    const family = linuxFamilyFrom(osName);
    if (osName.includes("linux") || family) {
        return { os: "linux", linuxFamily: family };
    }
    return { os: "unknown" };
}

export function recommendedLinuxFormat(
    family: LinuxFamily | undefined,
): "aur" | "deb" | "rpm" | undefined {
    if (family === "arch") return "aur";
    if (family === "debian") return "deb";
    if (family === "rpm") return "rpm";
    return undefined;
}
