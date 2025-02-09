describe("Search Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173");
    });
  
    it("should load more search results when clicking 'Load More'", () => {
      cy.get(".card", { timeout: 8000 }).should("be.visible");
  
      // Perform a search query
      cy.get("input[placeholder='Search...']").type("React");
  
      cy.url().should("include", "?q=React");
  
      // Wait for search results to load
      cy.get(".card").should("be.visible");
  
      cy.wait(2000);
  
      // Capture initial post count using `.then()`
      cy.get(".card").its("length").then((initialCount) => {
        // Ensure "Load More" button is present & visible
        cy.contains("button", "Load More").should("exist").and("be.visible");
  
        // Click the button
        cy.contains("button", "Load More").click();
  
        // Wait for new results
        cy.wait(2000);
  
        // Ensure new posts are actually added
        cy.get(".card", { timeout: 8000 }).its("length").then((newCount) => {
          expect(newCount).to.be.greaterThan(initialCount);
        });
      });
    });
  });