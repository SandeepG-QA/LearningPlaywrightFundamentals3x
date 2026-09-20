import { test, expect } from '@playwright/test';

test.describe('Login Page', () => { //group the following test cases & run together.

    test('Valid Credentials', async ({ page }) => {
        await page.goto('https://playwright.dev/');
    });
    test('Invalid Password', async ({ page }) => {
        await page.goto("https://app.vwo.com/#login");
        test.slow();
    });
});
// npx playwright test -g "Login Page" -- command to run the above test case.g stand for group
