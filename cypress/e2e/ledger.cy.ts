describe("Funding ledger", () => {
    beforeEach(() => {
        cy.intercept("GET", /ledger\.unitystation\.org\/movements\/$/, {
            fixture: "ledger-page1.json",
        }).as("ledgerPage1");
        cy.intercept("GET", /ledger\.unitystation\.org\/movements\/\?page=2$/, {
            fixture: "ledger-page2.json",
        }).as("ledgerPage2");
        cy.visit("/ledger");
        cy.wait("@ledgerPage1");
    });

    it("shows the current balance from the latest movement", () => {
        // The balance counts up from $0.00; wait for the final formatted figure.
        cy.contains("$1,234.56").should("be.visible");
    });

    it("renders movements with formatted date and signed amount", () => {
        cy.contains("td", "15 June 2026").should("exist");
        cy.contains("Patreon payout June").should("exist");
        cy.contains("+$500.00").should("exist");
        cy.contains("Server hosting").should("exist");
        cy.contains("−$120.00").should("exist");
        cy.contains("a", "View").should("have.attr", "href", "https://example.com/receipt/4");
    });

    it("paginates forward and back", () => {
        cy.get('nav[aria-label="Pagination"]').within(() => {
            cy.contains("button", "Prev").should("be.disabled");
            cy.contains("button", "Next").should("be.enabled").click();
        });

        cy.wait("@ledgerPage2");
        cy.contains("PayPal donation").should("exist");
        cy.contains("Domain renewal").should("exist");

        cy.get('nav[aria-label="Pagination"]').within(() => {
            cy.contains("button", "Next").should("be.disabled");
            cy.contains("button", "Prev").should("be.enabled").click();
        });

        cy.contains("Patreon payout June").should("exist");
    });

    it("keeps the balance pinned to the initial load while paginating", () => {
        cy.get('nav[aria-label="Pagination"]').contains("button", "Next").click();
        cy.wait("@ledgerPage2");
        cy.contains("$1,234.56").should("be.visible");
    });
});

export {};
