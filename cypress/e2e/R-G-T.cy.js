// import 'cypress-file-upload';
describe('saucedemo', () =>{

    it('login', () =>{

        cy.visit("https://www.saucedemo.com/"),

        cy.url().should("include","saucedemo.com"),
      //cy.url().should("not.eq","https://www.saucedemo.com/"),

      cy.get("#user-name").type("standard_user"),
      cy.get("#password").type("secret_sauce"),
      cy.get("#login-button").click();

      cy.url().should('include', '/inventory.html');
    cy.get('.title').should('have.text', 'Products')

    cy.get('.inventory_item:first .btn_inventory').click();

    cy.get('.shopping_cart_badge').should('have.text', '1'); 

    cy.get('.product_sort_container').select('az'); // Sort by Name (A to Z)
    cy.get('.inventory_item:first .inventory_item_name')
    .should('be.visible')
    .and('contain.text', 'Sauce');

    cy.get('.product_sort_container').select('lohi'); // Sort by Price (Low to High)
    cy.get('.inventory_item:first .inventory_item_price').should('be.visible'); 
    
    cy.get('.shopping_cart_link').click(); // Click on the Cart icon
    cy.get("#checkout").click();

    cy.get("#first-name").type('Dome'); // First name
    cy.get("#last-name").type('Doh'); // Last name
    cy.get("#postal-code").type('12345'); // Postal code
    cy.get("#continue").click(); // Click Continue

    cy.get('.summary_total_label').should('be.visible'); // Verify total price is visible
    cy.get("#finish").click();

    cy.get('.complete-header').should('have.text', 'Thank you for your order!');

    cy.get('#react-burger-menu-btn').click(); // Open the side menu
    cy.get('#logout_sidebar_link').click();

    cy.url().should('include', '/');
    cy.get("#login-button").should('be.visible');


    //Negative Test
    it("login with invalid credentials", () =>{
        cy.visit('https://www.saucedemo.com/'); // Visit the site again

    cy.get("#user-name").type('Stand_user'); // Invalid username
    cy.get("#password").type('password'); // Invalid password
    cy.get("#login-button").click();

    cy.get('.error-message-container.error').should('be.visible');
    cy.get('.error-message-container.error').should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    })
})
})