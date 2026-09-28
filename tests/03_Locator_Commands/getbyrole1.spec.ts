import { test, expect } from '@playwright/test';

test("tc # 01 - verify 'Make Appointment'", async ({ page }) => {

    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    let mainButton = page.getByRole("link", { name: "Make Appointment", exact: true });
    await mainButton.click();
    await page.pause();

});