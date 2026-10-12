import { test, expect, Locator } from '@playwright/test';

test('OrangeHRM Test', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    // Admin login
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('button', { name: 'Add' }).click();
    // add a new employee
    await page.locator('input[name="firstName"]').fill('Manan1');
    await page.locator('input[name="lastName"]').fill('Gupta1');
    await page.locator('//label[text()="Employee Id"]/following::input').first().fill('1740');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Successfully Saved')).toBeVisible();
    await page.waitForTimeout(5000);
    // search for the employee
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.locator('//label[text()="Employee Id"]/following::input').first().fill('1740');
    await page.getByRole('button', { name: 'Search' }).click();
    await page.waitForTimeout(5000);
    //delete the employee
    await page.locator("//i[@class='oxd-icon bi-check oxd-checkbox-input-icon']").nth(1).click();
    await page.getByRole('button', { name: 'Delete Selected' }).click();
    await page.getByRole('button', { name: 'Yes, Delete' }).click();
    await expect(page.getByText('Successfully Deleted')).toBeVisible();
    await page.pause();
});
