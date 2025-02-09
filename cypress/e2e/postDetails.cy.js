describe("Post Details Page", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173"); // Visits the homepage
    });
  
    it("should navigate to a post's details page and verify correct content", () => {
      cy.get(".card", { timeout: 8000 }).should("be.visible"); // ✅ Ensure posts load
    
      cy.get(".card").first().as("firstPost"); // ✅ Store first post reference
    
      // ✅ Extract post title, author, and subreddit
      cy.get("@firstPost")
        .find("h2")
        .should("be.visible")
        .invoke("text")
        .then((titleText) => {
          cy.wrap(titleText.trim()).as("postTitle");
        });
    
      cy.get("@firstPost")
        .find("p.text-gray-400")
        .first()
        .should("exist")
        .invoke("text")
        .then((subredditText) => {
          cy.wrap(subredditText.trim()).as("postSubreddit");
        });
    
      cy.get("@firstPost")
        .find("p.text-gray-400")
        .eq(1) // ✅ Get the second paragraph (which should be the author)
        .should("exist")
        .invoke("text")
        .then((authorText) => {
          cy.wrap(authorText.trim()).as("postAuthor");
        });
    
      cy.get("@firstPost").click(); // ✅ Click to open post details
    
      cy.url().should("include", "/post/");
    
      // ✅ Match the extracted title, subreddit, and author
      cy.get("@postTitle").then((storedTitle) => {
        cy.get('[data-test="post-title"]').should("have.text", storedTitle);
      });
    
      cy.get("@postSubreddit").then((storedSubreddit) => {
        cy.get('[data-test="post-subreddit"]').should("have.text", storedSubreddit);
      });
    
      cy.get("@postAuthor").then((storedAuthor) => {
        cy.get('[data-test="post-author"]').should("contain.text", storedAuthor);
      });
    });
    
  
    it("should display comments", () => {
      cy.get(".card", { timeout: 8000 }).first().click(); // Click first post
  
      // Wait for comments to load
      cy.get(".bg-gray-700 p", { timeout: 8000 }).should("be.visible");
  
      // Ensure at least one comment is visible
      cy.get(".bg-gray-700 p").should("have.length.greaterThan", 0);
    });
  
    it("should return to the homepage when Back button is clicked", () => {
      cy.get(".card", { timeout: 8000 }).first().click(); // Click first post
  
      cy.get("button").contains("Back").should("be.visible").click(); // Click Back button
  
      cy.url().should("eq", "http://localhost:5173/"); // Verify we are back at home
    });
  });
  