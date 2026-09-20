import { test, expect } from '@playwright/test';
//useful to test single role.
test("Navigating to the TTA website", async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/");
});
// useful to test multiple roles
test("BCP - in app.vwo.com two roles", async ({ browser }) => {
    let adminContext = await browser.newContext();
    let userContext = await browser.newContext();
    let guestContext = await browser.newContext();

    let adminPage = await adminContext.newPage();
    await adminPage.goto("https://app.thetestingacademy.com/playwright/");

    let userPage = await userContext.newPage();
    await userPage.goto("https://sdet.live/");

    let guestpage = await guestContext.newPage();
    await guestpage.goto("https://scrolltest.com");

    await adminPage.close();
    await userPage.close();
    await guestpage.close();
});
