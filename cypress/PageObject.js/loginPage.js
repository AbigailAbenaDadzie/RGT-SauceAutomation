class LoginPage {
    constructor() {
        this.usernameField = '#user-name';
        this.passwordField = '#password';
        this.loginButton = '#login-button';
    }

    visit() {
        cy.visit('https://www.saucedemo.com/');
    }

    enterUsername(username) {
        cy.get(this.usernameField).type(username);
    }

    enterPassword(password) {
        cy.get(this.passwordField).type(password);
    }

    clickLogin() {
        cy.get(this.loginButton).click();
    }

    verifyLoginUrl() {
        cy.url().should('include', '/inventory.html');
    }

    verifyErrorMessage() {
        cy.get('.error-message-container.error').should('be.visible');
        cy.get('.error-message-container.error')
          .should('contain.text', 'Epic sadface: Username and password do not match any user in this service');
    }
}

export default LoginPage;
