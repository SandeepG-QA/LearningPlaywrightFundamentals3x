import { test, expect, Locator } from '@playwright/test';

test('Verify the test case', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/webtable");
    
   // page.locator("//td[text()='Rohan.Mehta']/preceding-sibling::td/input").click(); or 

    page.locator("tr:has(td:text('Rohan.Mehta'))").locator("td").first().click();
    
    //await page.pause();
    await page.waitForTimeout(5000);
});
