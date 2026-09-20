import {test, expect} from '@playwright/test';

test.skip('checkout with paypal', async({page})=>{
//never execute.
});
test.only("login as a aman", async({page})=>{
//only this test will run and ignore other test in this file.
});
test.fail('cart total wrong', async({page})=>{
expect(90).toBe(100); // actually return 90
});

test.fixme('upload 2GB file', async({page})=>{
//skipped, but flagged as 'needs fixing'.
});

test('full regressin report',async({page})=>{
    test.slow();// Mark as a slow, Slow test will be given triple the default timeout.
    console.log(test.info().timeout); //9000 instead 3000.
});
test('mobile layout', async({page, browserName})=>{
    test.fixme(browserName === 'webkit','safari renders menu wrong');
});