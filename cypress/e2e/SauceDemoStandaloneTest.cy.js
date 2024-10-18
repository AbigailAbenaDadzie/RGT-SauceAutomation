
describe('saucedemo', () =>{

    // Variables for input data
    const url = "https://www.saucedemo.com/";
    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    const invalidUsername = 'Stand_user';
    const invalidPassword = 'password';
    const firstName = 'Dome';
    const lastName = 'Doh';
    const postalCode = '12345';

    it.skip('Verify successful login', () =>{

        cy.visit(url);

        cy.url().should("include", "saucedemo.com");

        // Perform login
        cy.get("#user-name").type(validUsername);
        cy.get("#password").type(validPassword);
        cy.get("#login-button").click();

        // Verify successful login by checking if URL contains '/inventory.html'
        cy.url().should('include', '/inventory.html');

        // Add products to cart
        cy.get('.title').should('have.text', 'Products');
        cy.get('.inventory_item:first .btn_inventory').click();
        cy.get('.shopping_cart_badge').should('have.text', '1');

        // Sorting and verifying the first item
        cy.get('.product_sort_container').select('az'); // Sort by Name (A to Z)
        cy.get('.inventory_item:first .inventory_item_name').should('be.visible').and('contain.text', 'Sauce');

        cy.get('.product_sort_container').select('lohi'); // Sort by Price (Low to High)
        cy.get('.inventory_item:first .inventory_item_price').should('be.visible');

        // Proceed to checkout
        cy.get('.shopping_cart_link').click(); // Click on the Cart icon
        cy.get("#checkout").click();

        // Fill out checkout information
        cy.get("#first-name").type(firstName);
        cy.get("#last-name").type(lastName);
        cy.get("#postal-code").type(postalCode);
        cy.get("#continue").click();

        // Verify the total price and finish order
        cy.get('.summary_total_label').should('be.visible');
        cy.get("#finish").click();

        // Verify the thank you message
        cy.get('.complete-header').should('have.text', 'Thank you for your order!');

        // Logout from the application
        cy.get('#react-burger-menu-btn').click();
        cy.get('#logout_sidebar_link').click();

        // Verify logout by checking if login button is visible again
        cy.url().should('include', '/');
        cy.get("#login-button").should('be.visible');
    })

    //Negative Test
    it.skip("login with invalid credentials", () =>{
      
      cy.visit(url); 

      // Perform login with invalid credentials
      cy.get("#user-name").type(invalidUsername); 
      cy.get("#password").type(invalidPassword); 
      cy.get("#login-button").click();

      // Check for error message
      cy.get('.error-message-container.error').should('be.visible');
      cy.get('.error-message-container.error')
        .should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    })



    //Negative Test
    it("Checkout without adding item(s) to cart", () =>{

        cy.visit(url)

        cy.url().should("include", "saucedemo.com");

        // Perform login
        cy.get("#user-name").type(validUsername);
        cy.get("#password").type(validPassword);
        cy.get("#login-button").click();

        cy.get('.shopping_cart_link').click(); // Click on the Cart icon
        cy.get("#checkout").click();

        //Perform checkout without items in the cart
        cy.get('.error-message-container').should('not.exist'); 
        cy.get('.cart_item').should('not.exist');

        cy.get('.checkout_info').should('not.exist');
    })
})


    