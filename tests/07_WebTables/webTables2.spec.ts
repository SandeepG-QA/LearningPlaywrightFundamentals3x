import { test, expect, Locator } from '@playwright/test';

test('verify the test case', async ({ page }) => {
    await page.goto("https://app.thetestingacademy.com/playwright/multiple_element_filter");
    const forgottenPasswordLink = page.locator('a.list-group-item').filter
        ({ hasText: 'Forgotten Password' });
    await forgottenPasswordLink.click();

    const privacyLink = page.locator('footer a').filter
        ({ hasText: 'Privacy' });
    await expect(privacyLink).toHaveAttribute('href', '#privacy-policy');
    await page.pause();
});
