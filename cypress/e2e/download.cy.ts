/**
 * The release is fetched on the server from the GitHub API, so it can't be
 * stubbed from the browser. This spec smoke-tests the page in both states it
 * can legitimately render in; the full download UI logic is covered by the
 * DownloadExperience component tests.
 */
describe("Download page", () => {
    beforeEach(() => {
        cy.visit("/download");
    });

    it("renders the page header and source link", () => {
        cy.contains("Download Pudu Launcher").should("be.visible");
        cy.contains("a", "View the launcher source on GitHub").should(
            "have.attr",
            "href",
            "https://github.com/unitystation/PuduLauncher",
        );
    });

    it("shows either the release panel or the GitHub fallback", () => {
        cy.get("body").then(($body) => {
            if ($body.find('[role="tablist"][aria-label="Operating system"]').length > 0) {
                // Release fetched: OS tabs are present and switchable.
                cy.get('[role="tab"]').should("have.length", 3);
                cy.hydratedClick(
                    '[role="tab"]:contains("macOS")',
                    '[role="tab"][aria-selected="true"]:contains("macOS")',
                );
                cy.contains("Apple Silicon").should("exist");
                cy.hydratedClick(
                    '[role="tab"]:contains("Linux")',
                    '[role="tab"][aria-selected="true"]:contains("Linux")',
                );
                cy.contains("Choose your package").should("be.visible");
                cy.contains("code", "yay -S pudu-launcher-git").should("exist");
                cy.contains("a", "View on AUR").should(
                    "have.attr",
                    "href",
                    "https://aur.archlinux.org/packages/pudu-launcher-git",
                );
            } else {
                // GitHub API unavailable: the page must still offer a way to download.
                cy.contains("fetch the latest release").should("be.visible");
                cy.contains("a", "All downloads on GitHub").should(
                    "have.attr",
                    "href",
                    "https://github.com/unitystation/PuduLauncher/releases/latest",
                );
            }
        });
    });
});

export {};
