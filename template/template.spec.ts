import { test, expect, Locator } from '@playwright/test';

test('Change this test title', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/template");
    // Start writing your test code here
    await page.pause();
});
