describe("sanity", () => {
  const devServerURL = "http://127.0.0.1:3000";

  before(() => {
    cy.visit(devServerURL);
  });

  it("should fail", () => {
    cy.findByRole("textbox").should("have.value", "I'm a textbox!");
  });
});
