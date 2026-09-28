import { test, expect} from '@playwright/test';

test ("verify the error message on wingify free trail", async ({page})=>{
    
    await page.goto("https://app.wingify.com/#/login");
    let userName = page.getByRole("textbox",{name:"email"});
    let passWord = page.getByRole("textbox",{name:"password"});
    await userName.fill('admin@vwo.com');
    await passWord.fill('1234');
    

   await page.pause();


});