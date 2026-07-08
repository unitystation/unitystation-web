import Dropdown from "../../components/ui/Dropdown";

describe("<Dropdown />", () => {
    it("opens on click and renders link items", () => {
        cy.mount(
            <Dropdown label="Account" items={[{ label: "Login / Register", href: "/login" }]} />,
        );

        cy.contains("button", "Account").should("have.attr", "aria-expanded", "false");
        cy.get('[role="menu"]').should("have.class", "pointer-events-none");

        cy.contains("button", "Account").click();
        cy.contains("button", "Account").should("have.attr", "aria-expanded", "true");
        cy.get('[role="menu"]').should("not.have.class", "pointer-events-none");
        cy.contains('[role="menuitem"]', "Login / Register").should("have.attr", "href", "/login");
    });

    it("runs onClick items and closes the menu", () => {
        const onSelect = cy.stub().as("onSelect");
        cy.mount(<Dropdown label="Actions" items={[{ label: "Do it", onClick: onSelect }]} />);

        cy.contains("button", "Actions").click();
        cy.contains('[role="menuitem"]', "Do it").click();

        cy.get("@onSelect").should("have.been.calledOnce");
        cy.contains("button", "Actions").should("have.attr", "aria-expanded", "false");
    });

    it("closes on Escape", () => {
        cy.mount(<Dropdown label="Menu" items={[{ label: "Item", href: "#" }]} />);

        cy.contains("button", "Menu").click();
        cy.contains("button", "Menu").should("have.attr", "aria-expanded", "true");
        cy.get("body").type("{esc}");
        cy.contains("button", "Menu").should("have.attr", "aria-expanded", "false");
    });

    it("closes when clicking outside", () => {
        cy.mount(
            <div>
                <Dropdown label="Menu" items={[{ label: "Item", href: "#" }]} />
                <p>outside</p>
            </div>,
        );

        cy.contains("button", "Menu").click();
        cy.contains("p", "outside").trigger("mousedown");
        cy.contains("button", "Menu").should("have.attr", "aria-expanded", "false");
    });
});
