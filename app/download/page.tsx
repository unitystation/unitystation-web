import { Metadata } from "next";
import { headers } from "next/headers";
import Container from "../../components/ui/Container";
import PageHeader from "../../components/ui/PageHeader";
import TextLink from "../../components/ui/TextLink";
import { LauncherRelease } from "../../types/launcherRelease";
import { detectPlatform } from "../../utils/detectPlatform";
import mapLauncherRelease from "../../utils/launcherRelease";
import { GITHUB_RELEASES_URL, LAUNCHER_REPO_URL } from "../../utils/urlContants";
import DownloadExperience from "../../components/download/DownloadExperience";
import fetchLatestRelease from "./fetchLatestRelease";

export const metadata: Metadata = {
    title: "Download · Unitystation",
    description: "Download the Pudu Launcher and start playing Unitystation.",
};

const DownloadPage = async () => {
    let release: LauncherRelease | null = null;
    try {
        release = mapLauncherRelease(await fetchLatestRelease());
    } catch {
        release = null;
    }

    // Detect the platform on the server from the request so the right OS is in the
    // first paint. The client effect only re-runs when this comes back unknown.
    const userAgent = (await headers()).get("user-agent") ?? undefined;
    const platform = detectPlatform(userAgent);
    const initialOs = platform.os === "unknown" ? undefined : platform.os;

    return (
        <Container className="pb-16">
            <PageHeader
                centered
                title="Download Pudu Launcher"
                lede="The Pudu Launcher keeps your game up to date and gets you into a round quickly. We've highlighted the build for your system below."
            />

            <DownloadExperience
                release={release}
                fallbackUrl={GITHUB_RELEASES_URL}
                initialOs={initialOs}
                initialLinuxFamily={platform.linuxFamily}
            />

            <p className="mt-10 text-center">
                <TextLink href={LAUNCHER_REPO_URL} external className="text-sm">
                    View the launcher source on GitHub
                </TextLink>
            </p>
        </Container>
    );
};

export default DownloadPage;
