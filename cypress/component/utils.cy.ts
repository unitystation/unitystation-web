import { detectPlatform, recommendedLinuxFormat } from "../../utils/detectPlatform";
import mapLauncherRelease from "../../utils/launcherRelease";
import { postTypeLabel, postTypeTone } from "../../utils/postMeta";
import { toAgoTime } from "../../utils/timeUtils";
import GithubReleaseResponse from "../../types/githubReleaseResponse";
import rawRelease from "../../utils/__fixtures__/puduRelease.json";

const WINDOWS_UA =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";
const MAC_UA =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15";
const UBUNTU_UA = "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0";
const FEDORA_UA = "Mozilla/5.0 (X11; Fedora; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0";
const GENERIC_LINUX_UA =
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

describe("detectPlatform", () => {
    it("detects Windows", () => {
        expect(detectPlatform(WINDOWS_UA)).to.deep.equal({ os: "win" });
    });

    it("detects macOS", () => {
        expect(detectPlatform(MAC_UA)).to.deep.equal({ os: "mac" });
    });

    it("detects Debian-family Linux", () => {
        expect(detectPlatform(UBUNTU_UA)).to.deep.equal({ os: "linux", linuxFamily: "debian" });
    });

    it("detects RPM-family Linux", () => {
        expect(detectPlatform(FEDORA_UA)).to.deep.equal({ os: "linux", linuxFamily: "rpm" });
    });

    it("detects generic Linux without a family", () => {
        expect(detectPlatform(GENERIC_LINUX_UA)).to.deep.equal({
            os: "linux",
            linuxFamily: undefined,
        });
    });

    it("returns unknown for unrecognised agents", () => {
        expect(detectPlatform("curl/8.0.1").os).to.equal("unknown");
    });
});

describe("recommendedLinuxFormat", () => {
    it("maps each family to its package format", () => {
        expect(recommendedLinuxFormat("arch")).to.equal("aur");
        expect(recommendedLinuxFormat("debian")).to.equal("deb");
        expect(recommendedLinuxFormat("rpm")).to.equal("rpm");
        expect(recommendedLinuxFormat(undefined)).to.equal(undefined);
    });
});

describe("mapLauncherRelease", () => {
    const release = mapLauncherRelease(rawRelease as unknown as GithubReleaseResponse);

    it("maps the version and releases page", () => {
        expect(release.version).to.equal("v2.0.0");
        expect(release.releasesPageUrl).to.equal(
            "https://github.com/unitystation/PuduLauncher/releases/tag/v2.0.0",
        );
    });

    it("picks the Windows installer, not its .sig file", () => {
        const { recommended, alternatives } = release.platforms.windows;
        expect(recommended?.url).to.match(/setup2\.0\.0-x64\.exe$/);
        expect(recommended?.label).to.equal("Installer (.exe)");
        expect(recommended?.sizeMB).to.equal(18);
        expect(alternatives).to.have.length(1);
        expect(alternatives[0].url).to.match(/portable-x64\.zip$/);
        expect(alternatives[0].sizeMB).to.equal(20);
    });

    it("picks the macOS dmg over the tar.gz", () => {
        const { recommended, note } = release.platforms.mac;
        expect(recommended?.url).to.match(/\.dmg$/);
        expect(recommended?.sizeMB).to.equal(12);
        expect(note).to.contain("Apple Silicon");
    });

    it("maps the Linux packages and AUR command", () => {
        const { deb, rpm, aur } = release.platforms.linux;
        expect(deb?.url).to.match(/\.deb$/);
        expect(deb?.sizeMB).to.equal(15);
        expect(rpm?.url).to.match(/\.rpm$/);
        expect(rpm?.sizeMB).to.equal(16);
        expect(aur.cmd).to.equal("yay -S pudu-launcher-git");
        expect(aur.pageUrl).to.equal("https://aur.archlinux.org/packages/pudu-launcher-git");
    });
});

describe("postMeta", () => {
    it("maps known post types to labels and tones", () => {
        expect(postTypeLabel("announcement")).to.equal("Announcement");
        expect(postTypeLabel("weekly")).to.equal("Progress Update");
        expect(postTypeLabel("community")).to.equal("Community Highlight");
        expect(postTypeTone("weekly")).to.equal("primary");
    });

    it("passes unknown types through with a neutral tone", () => {
        expect(postTypeLabel("mystery")).to.equal("mystery");
        expect(postTypeTone("mystery")).to.equal("neutral");
    });
});

describe("toAgoTime", () => {
    const secondsAgo = (s: number) => new Date(Date.now() - s * 1000);

    it("formats each magnitude with correct pluralisation", () => {
        expect(toAgoTime(secondsAgo(0))).to.equal("just now");
        expect(toAgoTime(secondsAgo(5))).to.equal("5 seconds ago");
        expect(toAgoTime(secondsAgo(90))).to.equal("1 minute ago");
        expect(toAgoTime(secondsAgo(2 * 3600))).to.equal("2 hours ago");
        expect(toAgoTime(secondsAgo(3 * 86400))).to.equal("3 days ago");
        expect(toAgoTime(secondsAgo(65 * 86400))).to.equal("2 months ago");
        expect(toAgoTime(secondsAgo(400 * 86400))).to.equal("1 year ago");
    });
});

export {};
