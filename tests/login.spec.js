import { test, expect } from '@playwright/test';

test('title test', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  const locator = await page.locator("//h2[@class='sadsad']");
  await expect(locator).toHaveText('Connect with friends and the world around you on Facebook.'); 
});

test('Facebook login - empty username check', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  const usernameInput = page.locator('input[name="email"]');
  await expect(usernameInput).toHaveValue('');
  const loginButton = page.locator('button[name="login"]');
  await loginButton.click();
  await expect(page).toHaveText("The email or mobile number you entered isn’t connected to an account. Find your account and log in.");
});

test('Facebook login - empty password check', async ({ page }) => {
  await page.goto('https://www.facebook.com/');
  const passwordInput = page.locator('input[name="pass"]');
  await expect(passwordInput).toHaveValue('');
  const loginButton = page.locator('button[name="login"]');
  await loginButton.click();
  await expect(page).toHaveURL(/facebook\.com/);
});

