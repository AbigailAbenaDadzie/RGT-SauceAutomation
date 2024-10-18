import LoginPage from "../PageObject.js/loginPage";
import InventoryPage from "../PageObject.js/inventoryPage";

describe('Saucedemo Tests', () => {

    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    const validUsername = 'standard_user';
    const validPassword = 'secret_sauce';
    const invalidUsername = 'invalid_user';  // More distinctly invalid
    const invalidPassword = 'password';
    const firstName = 'Dome';
    const lastName = 'Doh';
    const postalCode = '12345';

    // This block will run before each test
    beforeEach(() => {
        loginPage.visit();  // Visit the login page before each test
    });

    it.skip('should login successfully and complete purchase', () => {
        // Perform login
        loginPage.enterUsername(validUsername);
        loginPage.enterPassword(validPassword);
        loginPage.clickLogin();
        loginPage.verifyLoginUrl();

        // Verify the Products page and add item to cart
        inventoryPage.verifyProductsPage();
        inventoryPage.addItemToCart();
        inventoryPage.verifyItemInCart();

        // Sort products and verify
        inventoryPage.sortProductsBy('az'); // Sort by Name (A to Z)
        inventoryPage.verifyFirstProductContains('Sauce');
        inventoryPage.sortProductsBy('lohi'); // Sort by Price (Low to High)
        inventoryPage.verifyFirstProductPriceVisible();

        // Proceed to checkout
        inventoryPage.clickCartLink();
        inventoryPage.clickCheckoutButton();
        inventoryPage.enterCheckoutInformation(firstName, lastName, postalCode);
        inventoryPage.verifyTotalPriceVisible();
        inventoryPage.finishOrder();
        inventoryPage.verifyOrderCompletion();

        // Logout from the application
        inventoryPage.logout();
        inventoryPage.verifyLogout();
    });

    it.skip('should show error message on invalid login', () => {
        // Perform login with invalid credentials
        loginPage.enterUsername(invalidUsername);  // Ensure username is invalid
        loginPage.enterPassword(invalidPassword);  // Ensure password is invalid
        loginPage.clickLogin();

        // Verify the error message is displayed correctly
        loginPage.verifyErrorMessage();  // Check the error message and text
    });

    it.only('should prevent checkout without adding items to the cart', () => {
        loginPage.enterUsername('standard_user');
        loginPage.enterPassword('secret_sauce');
        loginPage.clickLogin();

        inventoryPage.clickCartLink();

         // Assertion: Ensure user remains on the cart page and checkout does not proceed
         inventoryPage.verifyStillOnCartPage();

        inventoryPage.clickCheckoutButton();

         inventoryPage.verifyNoItemsInCart();
         inventoryPage.verifyCheckoutButtonNotFunctional();
    })

});
