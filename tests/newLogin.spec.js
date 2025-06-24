import { test, expect} from '@playwright/test';
import { LoginPage } from '../objects/login.po';
const testData = require('../fixtures/loginFixture.json')

test.beforeEach(async ({page}) => {
  await page.goto('/login');
})

test.describe ('Valid login tests', () => {
  test('Login using valid username and password', async ({page}) => {
    const login = new LoginPage (page);
    await login.login(testData.validUser.userName, testData.validUser.password);
    await login.verifyValidLogin();
  });
})

test.describe ('Invalid login tests', () => {
  test('Login using invalid username and valid password', async ({page}) => {
    const login = new LoginPage (page);
    await login.login(testData.invalidUser.userName, testData.validUser.password);
    await login.verifyInvalidUsername();
  });

  test('Login using valid username and invalid password', async ({page}) => {
    const login = new LoginPage (page);
    await login.login(testData.validUser.userName, testData.invalidUser.password);
    await login.verifyInvalidPassword();
  });
})

test.describe ('Redirect tests', () => {
  test('Go to register page', async ({page}) => {
    const login = new LoginPage (page);
    await login.verifyRegisterRedirect();
  });
})