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

  it("should allow searching and update the URL", () => {
    // Wait for posts to load before typing
    cy.get(".card", { timeout: 8000 }).should("be.visible"); 

    cy.get("input[placeholder='Search...']")
      .should("be.visible") 
      .type("React");

    cy.url().should("include", "?q=React"); // Ensure query is in URL

    // Ensure posts have updated
    cy.get(".card")
      .children()
      .should("have.length.greaterThan", 0) // At least one post appears
      .and("contain.text", "React"); // One post should contain "React"
  });

  it("should show 'No posts found' for a search with no results", () => {
    cy.get(".card", { timeout: 8000 }).should("be.visible"); // Wait for posts

    const randomQuery = `asjdhaksdljasd${Date.now()}`; // A random nonsense query

    cy.get("input[placeholder='Search...']")
      .should("be.visible") // Ensure search bar is visible
      .type(randomQuery);

    cy.url().should("include", randomQuery);

    cy.wait(500);

    cy.get(".card").should("not.exist"); // Ensure no results are displayed
    cy.contains("p", "No posts found.").should("be.visible"); // Confirm message
});
  });