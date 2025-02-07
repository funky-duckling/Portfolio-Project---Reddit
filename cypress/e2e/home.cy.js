describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // Visits your Vite app
  });

  it("should load the homepage", () => {
    cy.contains("Reddit Clone").should("exist"); // Check for a text element
  });

  it("should have navigation buttons", () => {
    cy.contains("New").should("exist");
    cy.contains("Top").should("exist");
    cy.contains("Hot").should("exist");
  });

  it("should allow searching", () => {
    cy.get("input[placeholder='Search...']").type("React"); // ✅ Type in search
    cy.wait(1000); // Wait for Redux debounce (adjust if needed)
    //Ensure at least one filtered result appears (adjust selector as needed)
    cy.get(".post-list").should("contain.text", "React");
  });
});
