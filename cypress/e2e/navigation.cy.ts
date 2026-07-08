describe("Site navigation", () => {
    describe("desktop", () => {
        beforeEach(() => {
            cy.viewport("macbook-15");
            cy.visit("/");
        });

        it("shows all main nav links", () => {
            cy.get('nav[aria-label="Main"]').within(() => {
                cy.contains("a", "Home").should("have.attr", "href", "/");
                cy.contains("a", "Download").should("have.attr", "href", "/download");
                cy.contains("a", "Blog").should("have.attr", "href", "/blog");
                cy.contains("a", "Changelog").should("have.attr", "href", "/changelog");
                cy.contains("a", "Ledger").should("have.attr", "href", "/ledger");
            });
        });

        it("links to the external wikis in a new tab", () => {
            cy.get('nav[aria-label="Main"]').within(() => {
                cy.contains("a", "Player's wiki")
                    .should("have.attr", "href", "https://wiki.unitystation.org")
                    .and("have.attr", "target", "_blank");
                cy.contains("a", "Dev's wiki")
                    .should("have.attr", "href", "https://unitystation.github.io/unitystation/")
                    .and("have.attr", "target", "_blank");
            });
        });

        it("navigates to the download page", () => {
            cy.get('nav[aria-label="Main"]').contains("a", "Download").click();
            cy.location("pathname").should("eq", "/download");
            cy.contains("Download Pudu Launcher").should("be.visible");
        });

        it("offers login and password reset in the account menu when logged out", () => {
            cy.contains("button", "Account").click();
            cy.get('[role="menu"]').within(() => {
                cy.contains('[role="menuitem"]', "Login / Register").should(
                    "have.attr",
                    "href",
                    "/login",
                );
                cy.contains('[role="menuitem"]', "Reset password").should(
                    "have.attr",
                    "href",
                    "/reset-password",
                );
            });
        });
    });

    describe("mobile", () => {
        beforeEach(() => {
            cy.viewport("iphone-x");
            cy.visit("/");
        });

        it("toggles the mobile menu and navigates", () => {
            cy.get('nav[aria-label="Main mobile"]').should("not.exist");

            cy.hydratedClick('button[aria-label="Open menu"]', 'nav[aria-label="Main mobile"]');
            cy.get('nav[aria-label="Main mobile"]').should("be.visible");

            cy.get('nav[aria-label="Main mobile"]').contains("a", "Changelog").click();
            cy.location("pathname").should("eq", "/changelog");
            cy.get('nav[aria-label="Main mobile"]').should("not.exist");
        });

        it("closes the mobile menu with the close button", () => {
            cy.hydratedClick('button[aria-label="Open menu"]', 'button[aria-label="Close menu"]');
            cy.get('button[aria-label="Close menu"]').should("have.attr", "aria-expanded", "true");
            cy.get('button[aria-label="Close menu"]').click();
            cy.get('nav[aria-label="Main mobile"]').should("not.exist");
        });
    });

    describe("not found", () => {
        it("shows the 404 page for unknown routes", () => {
            cy.visit("/this-page-does-not-exist", { failOnStatusCode: false });
            cy.contains("h1", "404").should("be.visible");
            cy.contains("Page not found").should("be.visible");
            cy.contains("a", "Back to home").should("have.attr", "href", "/").click();
            cy.location("pathname").should("eq", "/");
        });
    });
});

export {};
