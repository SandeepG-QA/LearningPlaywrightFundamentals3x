import { test, expect } from '@playwright/test';

test(" TC # 01 - verify the error message in free trail", async ({ page }) => {
    await page.goto("https://wingify.com/free-trial/");
    let emailField = page.locator("[data-qa='page-su-step1-v1-email']");
    
    await emailField.fill("asdsd");
    await page.locator("#free-trial-step1-gdpr-consent-checkboxcu-marketing-consent-checkbox").click();
    await page.locator("[data-qa='free-trial-step1-gdpr-consent-checkboxgdpr-consent-checkbox']").click();
       
    let error_message = page.locator("//div[contains(@class,'invalid-reason')]").first();
    await page.locator("//button[@data-qa='page-su-submit']").first().click();
    let error_message_text = await error_message.textContent();
    expect(error_message_text).toContain("The email address you entered is incorrect.");
    await page.pause();


});