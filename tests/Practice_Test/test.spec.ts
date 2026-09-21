import {test, expect} from '@playwright/test';

test("tc # 01 - verify the label 'Make Appointment'", async({page})=>{

    await page.goto("https://katalon-demo-cura.herokuapp.com/");
    let makeAppointmentButton = page.locator("#btn-make-appointment");
    await makeAppointmentButton.click();
    let userNameField = page.locator("#txt-username");
    let passwordField = page.locator("#txt-password");
    let loginButton = page.locator("#btn-login");
    await userNameField.fill("John Doe");
    await passwordField.fill("ThisIsNotAPassword");
    await loginButton.click();
    let verifyMessage = page.locator("h2");
    await expect(verifyMessage).toHaveText("Make Appointment");
    await page.waitForTimeout(3000);

});