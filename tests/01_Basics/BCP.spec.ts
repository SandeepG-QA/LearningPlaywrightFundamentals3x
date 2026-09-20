import { chromium, Browser,BrowserContext, Page } from "@playwright/test";

async function run() {
    // Level 1 - launching browser
let browser = await chromium.launch({headless:false});
    console.log("Browser launch", browser);
    // Level 2 - create context - fresh session, isolated cookies.
    let context: BrowserContext = await browser.newContext();
    console.log("Context Created",context);
     // Level 3 - Open Page -  a tab inside a context.
    let page: Page = await context.newPage();
    console.log("Page Created",page);

    //clean up - reverse order
    await page.close();
    await context.close();
    await browser.close();

}
run();