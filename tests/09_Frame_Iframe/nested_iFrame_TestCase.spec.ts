import { test, expect,FrameLocator } from '@playwright/test';

test('Verify form fields in iframe', async ({ page }) => {
    await page.goto("https://selectorshub.com/iframe-scenario");
    console.log(await page.locator('#pact1').count());
   let frame1 : FrameLocator = page.frameLocator('#pact1').first();
   let frame2 : FrameLocator = frame1.frameLocator('#pact2');
   let frame3 : FrameLocator = frame2.frameLocator('#pact3');

    await frame1.locator('#inp_val').first().fill('Aishwarya Rai');
    await frame2.locator('#jex').fill('Wife');
    await frame3.locator('#glaf').fill('Playwright');

    await page.pause();
});
