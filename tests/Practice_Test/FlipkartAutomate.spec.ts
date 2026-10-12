import { test, expect, Page, Locator } from "@playwright/test";

test("Automate Flipkart", async ({ page }) => {

    await page.goto("https://www.flipkart.com/");
    await page.getByRole('button', { name: '✕' }).click();

    const searchBox: Locator = page.locator("input[name='q']").nth(0);

    await searchBox.fill("DSLR Camera");
    await searchBox.press("Enter");
    await expect(page).toHaveURL("https://www.flipkart.com/search?q=DSLR%20Camera&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=off&as=off");

    const nextButton = page.getByRole('link', { name: 'Next' });
    while (await nextButton.isEnabled()) {

        const products = page.locator("div.RG5Slk");
        const prices = page.locator("div.hZ3P6w.DeU9vF");

        console.log("Number of products:", await products.count());

        for (let i = 0; i < await products.count(); i++) {

            const name = await products.nth(i).innerText();
            const price = await prices.nth(i).innerText();

            console.log(name, price);
        }
        if (await nextButton.isVisible()) {
            await nextButton.click();
        }
        else break;
    }

    await page.pause();
});