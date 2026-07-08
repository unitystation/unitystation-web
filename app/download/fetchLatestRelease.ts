import GithubReleaseResponse from "../../types/githubReleaseResponse";
import { LAUNCHER_RELEASES_API } from "../../utils/urlContants";

async function fetchLatestRelease(): Promise<GithubReleaseResponse> {
    const response = await fetch(LAUNCHER_RELEASES_API, {
        next: { revalidate: 3600 },
        headers: { Accept: "application/vnd.github+json" },
    });
    if (!response.ok) {
        throw new Error(`GitHub releases API responded ${response.status}`);
    }
    return response.json();
}

export default fetchLatestRelease;
