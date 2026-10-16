import { test, expect, Locator } from '@playwright/test';

test('Verify Advance Custom DropDowns', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/select-boxes");

    //1. - single searchable
    //await page.getByTestId("rs-single-input").click();
    await page.locator("#rs-single").click();
    await page.getByText("Cypress", { exact: true }).click();

    // 2. - Multi searchable
    await page.locator("#rs-multi").click();
    await page.getByText("Pytest", { exact: true }).click();
    await page.getByText("JUnit", { exact: true }).click();
    await page.keyboard.press("Escape");

    //③ Creatable multi - type and enter
    await page.locator("#rs-creatable").click();
    await page.getByText("api-testing", { exact: true }).click();
    await page.getByText("performance", { exact: true }).click();
    await page.keyboard.press("Escape");

    // ⑤ Async — fetched on type
    await page.locator("#rs-async").click();
    await page.getByTestId("rs-async-input").fill("de");
    await expect(page.getByTestId('rs-async-menu')).toContainText('Delhi');
    await page.getByRole('option', { name: 'Delhi', exact: true }).click();
    await page.pause();
});
