describe("Account pages", () => {
    describe("login", () => {
        beforeEach(() => {
            cy.visit("/login");
        });

        it("renders the login form", () => {
            cy.contains("h1", "Login").should("be.visible");
            cy.contains("label", "Your email").should("be.visible");
            cy.contains("label", "Your password").should("be.visible");
            cy.contains("button", "Log in").should("be.visible");
        });

        it("links to register, reset password and resend confirmation", () => {
            cy.contains("a", "Don't have an account?").should("have.attr", "href", "/register");
            cy.contains("a", "Forgot your password?").should(
                "have.attr",
                "href",
                "/reset-password",
            );
            cy.contains("a", "Haven't received confirmation email yet?").should(
                "have.attr",
                "href",
                "/resend-confirm-email",
            );
        });

        it("validates the email client-side before calling the server", () => {
            // "test@localhost" passes native input validation but fails zod's email rule,
            // so the error must come from the client-side schema, not the API.
            cy.get('input[type="email"]').type("test@localhost");
            cy.get("#password").type("longenoughpassword");
            cy.contains("button", "Log in").click();

            cy.contains("Invalid email").should("be.visible");
        });

        it("validates the password length client-side", () => {
            cy.get('input[type="email"]').type("valid@example.com");
            cy.get("#password").type("123");
            cy.contains("button", "Log in").click();

            cy.contains("String must contain at least 6 character(s)").should("be.visible");
        });
    });

    describe("register", () => {
        it("renders every registration field", () => {
            cy.visit("/register");
            cy.contains("h1", "Create a new account").should("be.visible");

            cy.get("input#email").should("have.attr", "required");
            cy.get("input#unique_identifier").should("have.attr", "required");
            cy.get("input#username").should("have.attr", "required");
            cy.get("input#password").should("have.attr", "required");
            cy.get("input#password2").should("have.attr", "required");

            cy.contains("This identifier is permanent and cannot be changed later").should("exist");
            cy.contains("button", "Register").should("be.visible");
            cy.contains("a", "Already have an account?").should("have.attr", "href", "/login");
        });
    });

    describe("reset password", () => {
        it("renders the reset request form", () => {
            cy.visit("/reset-password");
            cy.contains("h1", "Reset password").should("be.visible");
            cy.get("input#email").should("have.attr", "required");
            cy.contains("button", "Submit").should("be.visible");
            cy.contains("a", "Back to login").should("have.attr", "href", "/login");
        });
    });
});

export {};
