import { test, expect, Locator } from '@playwright/test';

test('Verify Custom DropDowns', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/tables/dropdowns");
    await page.getByTestId("lang-trigger").click();
    await page.getByRole("option",{name : "JavaScript"}).click();

    await page.getByTestId("framework-trigger").click();
    await page.getByText("Angular").first().click();

    await page.getByTestId("experience-trigger").click();
    await page.getByText("Junior (0-3 years)").first().click();




    await page.pause();
});
