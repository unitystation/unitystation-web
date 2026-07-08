import CopyCommand from "../../components/ui/CopyCommand";

describe("<CopyCommand />", () => {
    it("shows the command and copies it to the clipboard", () => {
        cy.mount(<CopyCommand command="yay -S pudu-launcher-git" />);

        cy.contains("code", "yay -S pudu-launcher-git").should("be.visible");

        cy.window().then((win) => {
            cy.stub(win.navigator.clipboard, "writeText").as("writeText").resolves();
        });

        cy.get('button[aria-label="Copy install command"]').click();
        cy.get("@writeText").should("have.been.calledOnceWith", "yay -S pudu-launcher-git");
        cy.get('button[aria-label="Command copied"]').should("exist");
    });
});
