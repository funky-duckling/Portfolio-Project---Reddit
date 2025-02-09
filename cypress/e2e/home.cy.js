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
    cy.get(".card", { timeout: 8000 }).should("be.visible");
  
    cy.get("input[placeholder='Search...']")
      .should("be.visible") 
      .type("React");
  
    cy.url().should("include", "?q=React");
  
    // ✅ Wait for search results with "React" in the text
    cy.get(".card", { timeout: 8000 })
      .should("have.length.greaterThan", 0)
      .should("contain.text", "React"); // ✅ Look for "React" in any post, not just `.first()`
  });
  
  it("should show 'No posts found' for a search with no results", () => {
    cy.get(".card", { timeout: 8000 }).should("be.visible"); // Wait for posts
  
    const randomQuery = `noresults${Date.now()}`;
  
    cy.get("input[placeholder='Search...']")
      .should("be.visible") 
      .type(randomQuery);
  
    cy.url().should("include", `q=${randomQuery}`);
  
    cy.wait(1000); // Increase wait time to ensure UI updates
  
    cy.get(".card").should("not.exist");
    cy.contains("p", "No posts found.").should("be.visible");
  });
  });