import Pagination from "../../components/ui/Pagination";

describe("<Pagination />", () => {
    it("disables buttons at the edges", () => {
        cy.mount(
            <Pagination
                hasPrevious={false}
                hasNext={false}
                onPrevious={cy.stub()}
                onNext={cy.stub()}
            />,
        );

        cy.contains("button", "Prev").should("be.disabled");
        cy.contains("button", "Next").should("be.disabled");
    });

    it("fires callbacks when pages are available", () => {
        const onPrevious = cy.stub().as("onPrevious");
        const onNext = cy.stub().as("onNext");
        cy.mount(
            <Pagination
                hasPrevious
                hasNext
                onPrevious={onPrevious}
                onNext={onNext}
                label="Page 2"
            />,
        );

        cy.contains("Page 2").should("be.visible");
        cy.contains("button", "Prev").click();
        cy.contains("button", "Next").click();
        cy.get("@onPrevious").should("have.been.calledOnce");
        cy.get("@onNext").should("have.been.calledOnce");
    });
});
