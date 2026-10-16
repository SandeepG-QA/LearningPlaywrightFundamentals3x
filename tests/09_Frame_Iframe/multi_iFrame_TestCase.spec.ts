import { test, expect, Locator,FrameLocator } from '@playwright/test';

test('Verify form fields in iframe', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/frames/multi-frames");
    
    let mainFrame: FrameLocator = page.frameLocator('[name ="main"]');
    const headerText = await mainFrame.locator('h2').innerText();
    console.log(headerText);
    
    const allFrames = await page.locator('//frame').all();
    console.log('Total number of frame :'+ allFrames.length);

    for (const frame of allFrames){
    console.log(await frame.getAttribute('name'),':',await frame.getAttribute('src'));
    }

    let sideFrame: FrameLocator = page.frameLocator('[name = "side"]');
    await sideFrame.getByTestId('side-link-registration').click();
    await page.pause();
});
