import{test , expect} from '@playwright/test';

test("TC #01-verify that the vwo page is loaded", async({page})=>{
await page.goto("https://app.vwo.com",{
    waitUntil:'domcontentloaded',
    timeout:3000,
    referer:"https://sdet.live"
});
//Default locators 
//id,name, className, Tag,custom locator (via CSS selector)
//CSS selectors - Browser - CSS Engine help you to find the elements
// by using the default locators
//Id => #id
//className =>.
//name =>[name='value']
//tag =>[tag]

//input
//type="email"
//class="text-inputw(100%)"
//name="username"
// vwo-html-translate-attr="placeholder" 
// vwo-html-translate-placeholder="login:enterEmailID" 
// id="login-username" 
// data-qa="hocewoqisi" 
// placeholder="Enter email ID" 
// data-gtm-form-interact-field-id="0"
let userNameField = page.locator("#login-username");
let passwordField = page.locator("#login-password");
let loginButton = page.locator("#js-login-btn");
await userNameField.fill("admin@admin.com");
await passwordField.fill("pass123");
await loginButton.click();
let error_message = page.locator("#js-notification-box-msg");
await expect(error_message).toContainText("Your email, password, IP address or location did not match");
await page.pause();
});