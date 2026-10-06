import {test, expect} from "@playwright/test";

test.use(
    {
        storageState:'./user-session.json',
        screenshot:'only-on-failure'
    });

    test('go directly to Dashboard - Test1', async({ page })=>{
        await page.goto("https://app.wingify.com/#/dashboard?accountId=1284557");
        await expect(page).toHaveURL(/dashboard/);
        console.log("Dashboard loaded - no login needed");
        await page.waitForTimeout(3000);
    });
     test('go directly to Dashboard - Test 2', async({ page })=>{
        await page.goto("https://app.wingify.com/#/dashboard?accountId=1284557");
        await expect(page).toHaveURL(/dashboard/);
        console.log("Dashboard loaded - no login needed");
        await page.waitForTimeout(3000);
    });

     test('go directly to Dashboard - Test 3', async({ page })=>{
        await page.goto("https://app.wingify.com/#/dashboard?accountId=1284557");
        await expect(page).toHaveURL(/dashboard/);
        console.log("Dashboard loaded - no login needed");
        await page.waitForTimeout(3000);
    })