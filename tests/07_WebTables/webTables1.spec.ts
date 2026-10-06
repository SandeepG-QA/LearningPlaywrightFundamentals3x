import { test, expect, Locator } from '@playwright/test';

test('Change this test title', async ({ page }) => {
    await page.goto("https://awesomeqa.com/webtable1.html");
    const rows = await page.locator('table[summary="Sample Table"] tbody tr');
    const rowsCount = await rows.count();
    for (let i = 0; i < rowsCount; i++) {
    //const colheaders = await rows.nth(i).locator('th').allInnerTexts();
    const rowData = await rows.nth(i).locator('td').allInnerTexts();
    console.log(`Row ${i + 1}:`, rowData);
    }
    await page.pause();
});