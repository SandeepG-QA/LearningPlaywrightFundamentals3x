import {test, expect } from "@playwright/test";

test("TC # 01 - Student login on app testing academy", async({page})=>{
    // navigate to url
await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");

// fill email id & password
let emailField = page.locator("//input[@id='email']");
await emailField.fill("abc@gmail.com");
let pwdField = page.locator("//input[@id='password']");
await pwdField.fill("abc123");

// click on checkbox and login button
await page.locator("//input[@type='checkbox']").click();
await page.locator("//button[@class='login-btn']").click();

//verify the url after login
await expect(page).toHaveURL(
  "https://app.thetestingacademy.com/playwright/multiple_element_filter?email=abc%40gmail.com&password=abc123&remember=yes#login-success"
);


});

