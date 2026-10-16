import { test, Page, expect } from '@playwright/test';

test('QA Profile form', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/practice#page");
    await page.getByTestId('first-name').fill("aman");
    await page.getByTestId('last-name').fill("kumar");
    await page.getByTestId('gender-male').click();
    await page.getByTestId('years-experience').click();
    await page.selectOption('#years-experience', '2');
    await page.getByRole('textbox', { name: 'date' }).fill("2026-10-16");
    await page.getByTestId('profession-automation').first().click();
    await page.getByRole('checkbox', { name: 'Selenium Webdriver' }).click();
    await page.getByTestId('continent-asia').first().click();
    await page.getByTestId('tab-navigation').click();

    await page.getByRole("button", { name: 'Save profile' }).click();

    await expect(page.locator('div #submission-output')).toBeVisible();
    const Output: string = await page.locator('#submission-output').textContent();
    expect(Output).toContain(`"firstName": "aman"`);

    console.log(`saved profile data:`, Output);
    await page.pause();
});