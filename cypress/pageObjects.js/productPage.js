class ProductPage {
    
    getProductName() {
      return cy.get('.inventory_item_name'); 
    }
  
    getProductPrice() {
      return cy.get('.inventory_details_price'); 
    }
  
    getAddToCartButton() {
      return cy.get('#add-to-cart-sauce-labs-backpack'); 
    }
  
    getProductDescription() {
      return cy.get('.inventory_item_desc'); 
    }
  
    
    verifyProductName(expectedName) {
      this.getProductName().should('have.text', expectedTitle);
    }
  
    verifyProductPrice(expectedPrice) {
      this.getProductPrice().should('have.text', expectedPrice);
    }
  
    clickAddToCart() {
      this.getAddToCartButton().click();
    }
  
    verifyProductDescription(expectedDescription) {
      this.getProductDescription().should('contain.text', expectedDescription);
    }
  }
  
  export default ProductPage;
  