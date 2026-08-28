import {test,expect} from '@playwright/test'

test('login',async({page})=>{
    await page.goto('http://localhost:8081/')
    await page.getByPlaceholder('Enter your username').fill('sample')
    await page.getByPlaceholder('Enter your password').fill('sample')
    await page.getByRole('button',{name:'Submit'}).click()
    await page.locator('div#message').waitFor()
    await expect(page.locator('div#message')).toHaveText('🎉 Login Successful! Welcome to Troy Games!')
})