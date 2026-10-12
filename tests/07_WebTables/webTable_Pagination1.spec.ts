import { test, Page, Locator } from '@playwright/test';
async function findRowByName(page: Page, name: string): Promise<Locator> {
    while (true) {
        const row = page.locator('#employees-tbody tr').filter({ hasText: name });
        if (await row.isVisible()) {
            return row;
        }
        const next = page.getByTestId('next-page');
        if (await next.isDisabled()) {
            throw new Error(`Row with name "${name}" not found in the table.`);
        }
        await next.click();
    }
}

    test('Verify the test case', async ({ page }) => {
        await page.goto("https://app.thetestingacademy.com/playwright/tables/webtable");
        let name: string = "Luca Greco";
        const row = await findRowByName(page, name);
        const email = await row.locator('td[data-col="email"]').innerText();
        const country = await row.locator('td[data-col="country"]').innerText();

        console.log(`Email: ${email}, Country: ${country}`);

        await page.pause();
    });
