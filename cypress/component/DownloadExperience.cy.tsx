import DownloadExperience from "../../components/download/DownloadExperience";
import GithubReleaseResponse from "../../types/githubReleaseResponse";
import mapLauncherRelease from "../../utils/launcherRelease";
import rawRelease from "../../utils/__fixtures__/puduRelease.json";

const FALLBACK_URL = "https://github.com/unitystation/PuduLauncher/releases/latest";
const release = mapLauncherRelease(rawRelease as unknown as GithubReleaseResponse);

describe("<DownloadExperience />", () => {
    it("falls back to the GitHub releases page when no release is available", () => {
        cy.mount(<DownloadExperience release={null} fallbackUrl={FALLBACK_URL} />);

        cy.contains("fetch the latest release").should("be.visible");
        cy.contains("a", "All downloads on GitHub").should("have.attr", "href", FALLBACK_URL);
        cy.get('[role="tablist"]').should("not.exist");
    });

    it("shows the release version and notes link", () => {
        cy.mount(
            <DownloadExperience release={release} fallbackUrl={FALLBACK_URL} initialOs="win" />,
        );

        cy.contains("Pudu Launcher - v2.0.0").should("be.visible");
        cy.contains("a", "Release notes").should(
            "have.attr",
            "href",
            "https://github.com/unitystation/PuduLauncher/releases/tag/v2.0.0",
        );
    });

    it("preselects the server-detected OS and marks it as detected", () => {
        cy.mount(
            <DownloadExperience release={release} fallbackUrl={FALLBACK_URL} initialOs="win" />,
        );

        cy.contains('[role="tab"]', "Windows")
            .should("have.attr", "aria-selected", "true")
            .and("contain.text", "Detected");

        cy.contains("a", "Installer (.exe)").should(
            "have.attr",
            "href",
            "https://github.com/unitystation/PuduLauncher/releases/download/v2.0.0/windows-pudu-launcher-setup2.0.0-x64.exe",
        );
        cy.contains("18 MB").should("be.visible");
        cy.contains("a", "Portable (.zip) · 20 MB").should("exist");
    });

    it("switches to the macOS build with the Intel note", () => {
        cy.mount(
            <DownloadExperience release={release} fallbackUrl={FALLBACK_URL} initialOs="win" />,
        );

        cy.contains('[role="tab"]', "macOS").click();
        cy.contains("a", "Apple Silicon (.dmg)").should(
            "have.attr",
            "href",
            "https://github.com/unitystation/PuduLauncher/releases/download/v2.0.0/darwin-pudu-launcher2.0.0-aarch64.dmg",
        );
        cy.contains("12 MB").should("be.visible");
        cy.contains("This build is for Apple Silicon (M-series) Macs").should("be.visible");
    });

    it("lists every Linux package with the AUR command", () => {
        cy.mount(
            <DownloadExperience release={release} fallbackUrl={FALLBACK_URL} initialOs="linux" />,
        );

        cy.contains("Choose your package").should("be.visible");
        cy.contains("a", "Debian / Ubuntu (.deb) · 15 MB").should("exist");
        cy.contains("a", "Fedora / SUSE (.rpm) · 16 MB").should("exist");
        cy.contains("code", "yay -S pudu-launcher-git").should("exist");
        cy.contains("a", "View on AUR").should(
            "have.attr",
            "href",
            "https://aur.archlinux.org/packages/pudu-launcher-git",
        );
    });

    it("recommends the package matching the detected Linux family", () => {
        cy.mount(
            <DownloadExperience
                release={release}
                fallbackUrl={FALLBACK_URL}
                initialOs="linux"
                initialLinuxFamily="debian"
            />,
        );

        cy.contains("a", "Debian / Ubuntu (.deb) · 15 MB")
            .parent()
            .contains("Recommended")
            .should("exist");
    });

    it("recommends the AUR package for Arch-family systems", () => {
        cy.mount(
            <DownloadExperience
                release={release}
                fallbackUrl={FALLBACK_URL}
                initialOs="linux"
                initialLinuxFamily="arch"
            />,
        );

        cy.contains("Arch Linux (AUR)").parent().contains("Recommended").should("exist");
    });
});
