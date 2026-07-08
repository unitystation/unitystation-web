/// <reference types="cypress" />

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Click the first element matching `selector`, retrying until
             * `expectSelector` appears in the DOM. Next.js pages hydrate after
             * first paint, so an immediate click can land before React has
             * attached event handlers and silently do nothing.
             */
            hydratedClick(selector: string, expectSelector: string): void;
        }
    }
}

const hydratedClick = (selector: string, expectSelector: string, attempts = 5) => {
    cy.get(selector).first().click();
    cy.get("body").then(($body) => {
        if ($body.find(expectSelector).length === 0 && attempts > 0) {
            cy.wait(200);
            hydratedClick(selector, expectSelector, attempts - 1);
        }
    });
    cy.get(expectSelector).should("exist");
};

Cypress.Commands.add("hydratedClick", (selector: string, expectSelector: string) =>
    hydratedClick(selector, expectSelector),
);

export {};
