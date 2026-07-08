describe("Changelog", () => {
    beforeEach(() => {
        cy.intercept("GET", /changelog\.unitystation\.org\/all-changes/, {
            fixture: "changelog-page1.json",
        }).as("changelog");
        cy.visit("/changelog");
        cy.wait("@changelog");
    });

    it("renders a panel per build with its changes", () => {
        cy.contains("Build 9999").should("be.visible");
        cy.contains("Added a bikehorn that honks in stereo").should("be.visible");
        cy.contains("Fixed atmos leaking through solid walls").should("be.visible");
    });

    it("credits the author and links the pull request", () => {
        cy.contains("a", "coder1").should("have.attr", "href", "https://github.com/coder1");
        cy.contains("a", "PR #4321").should(
            "have.attr",
            "href",
            "https://github.com/unitystation/unitystation/pull/4321",
        );
    });

    it("shows an empty message for builds without changes", () => {
        cy.contains("Build 9998").should("exist");
        cy.contains("This build has no registered changes").should("exist");
    });

    it("offers build downloads per platform from the CDN", () => {
        // The first panel footer belongs to build 9999; the navbar Account
        // dropdown also has a [role="menu"], so scope to the opened one.
        cy.hydratedClick(
            'footer button[aria-haspopup="menu"]',
            'footer button[aria-haspopup="menu"][aria-expanded="true"]',
        );
        cy.get('footer button[aria-haspopup="menu"][aria-expanded="true"]')
            .parent()
            .find('[role="menu"]')
            .within(() => {
                cy.contains('[role="menuitem"]', "Windows").should(
                    "have.attr",
                    "href",
                    "https://cdn.unitystation.org/UnityStationDevelop/StandaloneWindows64/9999.zip",
                );
                cy.contains('[role="menuitem"]', "macOS").should(
                    "have.attr",
                    "href",
                    "https://cdn.unitystation.org/UnityStationDevelop/StandaloneOSX/9999.zip",
                );
                cy.contains('[role="menuitem"]', "Linux server").should(
                    "have.attr",
                    "href",
                    "https://cdn.unitystation.org/UnityStationDevelop/linuxserver/9999.zip",
                );
            });
    });
});

export {};
