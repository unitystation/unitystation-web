describe("Blog feed", () => {
    beforeEach(() => {
        cy.intercept("GET", /changelog\.unitystation\.org\/posts\/\?page=1$/, {
            fixture: "blogPosts-page1.json",
        }).as("postsPage1");
        cy.intercept("GET", /changelog\.unitystation\.org\/posts\/\?page=2$/, {
            fixture: "blogPosts-page2.json",
        }).as("postsPage2");
    });

    it("renders the first page of posts as cards", () => {
        cy.visit("/blog");
        cy.wait("@postsPage1");

        cy.contains("h2", "Station reactor now explodes properly")
            .closest("a")
            .should("have.attr", "href", "/blog/reactor-explodes-properly");

        cy.contains("by TestAuthor").should("exist");
        cy.contains("The reactor finally detonates with the dignity it deserves.").should("exist");
    });

    it("maps post types to their display labels", () => {
        cy.visit("/blog");
        cy.wait("@postsPage1");

        cy.contains("Announcement").should("exist");
        cy.contains("Progress Update").should("exist");
        cy.contains("Community Highlight").should("exist");
    });

    it("loads the next page when scrolling to the bottom", () => {
        cy.visit("/blog");
        cy.wait("@postsPage1");
        cy.contains("h2", "Station reactor now explodes properly").should("be.visible");

        cy.scrollTo("bottom");
        cy.wait("@postsPage2");
        cy.contains("h2", "Archived post from page two").should("exist");
    });
});

export {};
