import { test, expect, Locator,FrameLocator } from '@playwright/test';

test('Verify form fields in iframe', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/frames/");
    
    let vechileFrame: FrameLocator = page.frameLocator('#frame-one');

    await vechileFrame.locator('#RESULT_TextField-1').fill('Indica Vista');
    await vechileFrame.locator('#RESULT_TextField-2').fill('Aman Gupta');
    await vechileFrame.locator('#RESULT_TextField-3').fill('2009');
    await vechileFrame.locator('#RESULT_RadioButton-1').selectOption('Sedan');

    await vechileFrame.locator('#RESULT_TextField-4').fill('2010');
    await vechileFrame.locator('#RESULT_TextArea-1').fill('Amazing car for amazing people');
    await vechileFrame.getByText('Submit registration', {exact: true}).click();

    let output = await vechileFrame.locator('#vehicle-output').innerText();
    console.log(output);
    
    await page.pause();
});
