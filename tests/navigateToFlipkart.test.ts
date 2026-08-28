import { test, expect } from '@playwright/test';

test('url launch', async ({page})=>{
await page.goto('https://www.flipkart.com/')
})