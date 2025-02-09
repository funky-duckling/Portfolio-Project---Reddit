describe("Navigation Tests", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173");
    });
  
    it("should navigate to post details when a post is clicked", () => {
      // Wait for posts to load
      cy.get(".card", { timeout: 8000 }).should("be.visible");
  
      // Click the first post
      cy.get(".card").first().click();
  
      // Verify URL contains /post/
      cy.url().should("include", "/post/");
  
      // Ensure post details are visible
      cy.get("h1").should("be.visible");
    });
  
    it("should update the active filter state when clicking buttons", () => {
      cy.visit("/");
    
      cy.get('[data-test="filter-new"]').should("exist");
      cy.get('[data-test="filter-top"]').should("exist");
      cy.get('[data-test="filter-hot"]').should("exist");
    
      cy.get('[data-test="filter-new"]').click();
      cy.get('[data-test="filter-new"]').should("have.class", "bg-blue-600");
    
      // ✅ Ensure previous filters lose the active class
      cy.get('[data-test="filter-top"]').should("not.have.class", "bg-blue-600");
      cy.get('[data-test="filter-hot"]').should("not.have.class", "bg-blue-600");
    });
    
    it("should fetch new posts when clicking 'New' filter", () => {
      cy.intercept("GET", "**/r/all/new.json**").as("fetchNewPosts");
    
      cy.get('[data-test="filter-new"]').click();
    
      cy.wait("@fetchNewPosts").its("request.url").should("include", "/r/all/new.json");
    
      // ✅ Verify posts update
      cy.get(".card").should("have.length.greaterThan", 0);
    });
  });
  