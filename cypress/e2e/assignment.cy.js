import LoginPage from "../pageObjects.js/loginPage";
import ProductPage from "../pageObjects.js/productPage"
describe("Sauce Demo Login Test", () => {
  it("should successfully log in to the Sauce Demo app", () => {
    
    cy.visit("https://www.saucedemo.com/");
    
    // Additional assertion (optional) to verify page title
    cy.title().should("contain", "Swag Labs");


    const login = new LoginPage();
    login.enterUsername("standard_user");
    login.enterPassword("secret_sauce");
    login.clickLogin();

    // Assertion to verify successful login by checking the URL
    cy.url().should("include", "/inventory");

    const product = new ProductPage();
    product.verifyProductName("Sauce Labs Backpack")
    product.verifyProductPrice("$29.99")
    product.verifyProductDescription("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection")
    product.clickAddToCart();
});
});
