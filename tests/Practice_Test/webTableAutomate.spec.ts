import { test, expect, Locator } from '@playwright/test';

test('Automate Web Table', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/webtable");
    // //tbody[@id="employee-body"]/tr[3]/td[3]
    const firstPart = "//tbody[@id='employee-body']/tr[";
    const secondPart = "]/td[";
    const thirdPart = "]";

    const rowCount = await page.locator("//tbody[@id='employee-body']/tr").count();
    const colCount = await page.locator("//tbody[@id='employee-body']/tr[2]/td").count();

    for (let i = 2; i <= rowCount; i++) {
        for (let j = 1; j <= colCount; j++) {
            const dynamicPath = `${firstPart}${i}${secondPart}${j}${thirdPart}`;
            const data = await page.locator(dynamicPath).innerText();
            if (data.includes("Rohan.Mehta")) {
                const checkboxPath = `${dynamicPath}/preceding-sibling::td/input[@type='checkbox']`;
                await page.locator(checkboxPath).check();


            }
        }
    }
        await page.pause();
    });