const {expect} = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '//input[@placeholder = "Enter Username"]';
    this.passwordInput = '//input[@placeholder = "Enter Password"]';
    this.loginButton = '//html/body/div/div/div[4]/button';
    this.rememberMe = '//input[@name="remember"]';
    this.usernameError = '//div[text() = "Username does not exists"]';
    this.passwordError = '//div[text() = "Incorrect Password"]';
    this.registerURL = '//*[text() = "Sign up"]'
    // this.alertMessage = '//span[@id="error"'; //change
  }

  async login(username, password){
    await this.page.locator(this.usernameInput).fill(username);
    await this.page.locator(this.passwordInput).fill(password);
    await this.page.locator(this.loginButton).click();
  }
 
  async verifyValidLogin() {
    await this.page.waitForTimeout(2000);
    await expect(this.page).toHaveURL("/message");
  }

  async verifyInvalidUsername() {
    const InvalidUsername = await this.page.locator(this.usernameError);
    const InvalidPassword = await this.page.locator(this.passwordError);
    await expect(InvalidUsername).toBeVisible();
    await expect(InvalidPassword).toBeHidden();
  }

  async verifyInvalidPassword() {
    const InvalidUsername = await this.page.locator(this.usernameError);
    const InvalidPassword = await this.page.locator(this.passwordError);
    await expect(InvalidPassword).toBeVisible();
    await expect(InvalidUsername).toBeHidden();
  }

  async verifyRegisterRedirect() {
    await this.page.locator(this.registerURL).click();
    await this.page.waitForTimeout(2000);
    await expect(this.page).toHaveURL("/register");
  }
}

