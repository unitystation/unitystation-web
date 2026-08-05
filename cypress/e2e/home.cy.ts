describe("Home page", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("renders the hero with title and tagline", () => {
        cy.contains("h1", "Welcome to").should("be.visible");
        cy.contains("h1", "Unitystation!").should("be.visible");
        cy.contains("Free and open-source remake of the cult classic Space Station 13").should(
            "be.visible",
        );
    });

    it("has a download CTA pointing at /download", () => {
        cy.contains("h1", "Unitystation!")
            .closest("section")
            .find('a[href="/download"]')
            .should("be.visible")
            .and("contain.text", "Download");
    });

    it("links to the community platforms", () => {
        cy.get('[role="group"][aria-label="Community links"]').within(() => {
            cy.contains("a", "GitHub")
                .should("have.attr", "href", "https://github.com/unitystation/unitystation")
                .and("have.attr", "target", "_blank");
            cy.contains("a", "Discord").should(
                "have.attr",
                "href",
                "https://discord.com/invite/tFcTpBp",
            );
            cy.contains("a", "Patreon").should(
                "have.attr",
                "href",
                "https://www.patreon.com/unitystation",
            );
        });
    });

    it("lets the user pick a hero screenshot", () => {
        cy.contains("p", "01 / 10").should("exist");
        cy.hydratedClick(
            'button[aria-label="Show screenshot 3"]',
            'button[aria-label="Show screenshot 3"][aria-current="true"]',
        );
        cy.contains("p", "03 / 10").should("exist");
    });

    it("renders the about and community sections", () => {
        cy.contains("What is Space Station 13?").should("exist");
        cy.contains("Pick a job and keep the station running.").should("exist");
        cy.contains("h2", "Join the community playtest!").scrollIntoView().should("be.visible");
        cy.contains("a", "Join the Discord").should(
            "have.attr",
            "href",
            "https://discord.com/invite/tFcTpBp",
        );
        cy.contains("a", "Get the game").should("have.attr", "href", "/download");
    });
});

export {};
