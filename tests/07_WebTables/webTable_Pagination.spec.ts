import { test, expect, Locator } from '@playwright/test';

test('Verify the test case', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");
    let name: string = "Luca Greco";
    let row;
    while (true) {
        row = page.locator('#employees-tbody tr').filter({ hasText: name });
        if (await row.isVisible()) {
            break;
        }
        const next = page.getByTestId('next-page');
        if (await next.isDisabled()) {
            throw new Error(`Row with name "${name}" not found in the table.`);
        }
        await next.click();
    }
     const email = await row.locator('td[data-col="email"]').innerText();
   const country = await row.locator('td[data-col="country"]').innerText();
    
    console.log(`Email: ${email}, Country: ${country}`);

    await page.pause();
});
