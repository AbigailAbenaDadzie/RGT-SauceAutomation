class InventoryPage {
    constructor() {
        this.productTitle = '.title';
        this.firstAddToCartButton = '.inventory_item:first .btn_inventory';
        this.cartBadge = '.shopping_cart_badge';
        this.sortDropdown = '.product_sort_container';
        this.firstProductName = '.inventory_item:first .inventory_item_name';
        this.firstProductPrice = '.inventory_item:first .inventory_item_price';
        this.cartLink = '.shopping_cart_link';
        this.checkoutButton = '#checkout';
        this.firstNameField = '#first-name';
        this.lastNameField = '#last-name';
        this.postalCodeField = '#postal-code';
        this.continueButton = '#continue';
        this.totalPriceLabel = '.summary_total_label';
        this.finishButton = '#finish';
        this.thankYouMessage = '.complete-header';
        this.menuButton = '#react-burger-menu-btn';
        this.logoutLink = '#logout_sidebar_link';
    }

    verifyProductsPage() {
        cy.get(this.productTitle).should('have.text', 'Products');
    }

    addItemToCart() {
        cy.get(this.firstAddToCartButton).click();
    }

    verifyItemInCart() {
        cy.get(this.cartBadge).should('have.text', '1');
    }

    sortProductsBy(option) {
        cy.get(this.sortDropdown).select(option);
    }

    verifyFirstProductContains(text) {
        cy.get(this.firstProductName).should('be.visible').and('contain.text', text);
    }

    verifyFirstProductPriceVisible() {
        cy.get(this.firstProductPrice).should('be.visible');
    }

    clickCartLink() {
        cy.get(this.cartLink).click();
    }

    verifyStillOnCartPage() {
        cy.url().should('eq', 'https://www.saucedemo.com/cart.html');  // Ensure we are on the cart page
    }

    verifyNoItemsInCart() {
        cy.get('.cart_item').should('not.exist');  // Check that no items are in the cart
    }

    verifyCheckoutButtonNotFunctional() {
        cy.get('.checkout_info').should('not.exist');  // Ensure checkout form is not accessible
    }


    clickCheckoutButton() {
        cy.get(this.checkoutButton).click();
    }

    enterCheckoutInformation(firstName, lastName, postalCode) {
        cy.get(this.firstNameField).type(firstName);
        cy.get(this.lastNameField).type(lastName);
        cy.get(this.postalCodeField).type(postalCode);
        cy.get(this.continueButton).click();
    }

    verifyTotalPriceVisible() {
        cy.get(this.totalPriceLabel).should('be.visible');
    }

    finishOrder() {
        cy.get(this.finishButton).click();
    }

    verifyOrderCompletion() {
        cy.get(this.thankYouMessage).should('have.text', 'Thank you for your order!');
    }

    logout() {
        cy.get(this.menuButton).click();
        cy.get(this.logoutLink).click();
    }

    verifyLogout() {
        cy.url().should('include', '/');
        cy.get('#login-button').should('be.visible');
    }
}

export default InventoryPage;
