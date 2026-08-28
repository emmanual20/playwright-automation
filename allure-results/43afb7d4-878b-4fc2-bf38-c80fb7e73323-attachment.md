# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: troyGamesProject\login.test.ts >> login test
- Location: tests\troyGamesProject\login.test.ts:8:5

# Error details

```
TypeError: Cannot read properties of undefined (reading 'url')
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | import {data} from '../../Data/troyGamesProjectData/login.json'
  3  | 
  4  | test.beforeEach(async({page})=>{
> 5  | await page.goto(data.url)
     |                      ^ TypeError: Cannot read properties of undefined (reading 'url')
  6  | })
  7  | 
  8  | test('login test',async({page})=>{
  9  |     await page.getByTestId('username-input').fill(data.usn)
  10 |     await page.getByTestId('password-input').fill(data.pwd)
  11 |     await page.getByTestId('remember-me').check()
  12 |     await page.getByRole('button',{name:'login'}).click()
  13 |     let hero=await page.locator('[class="hero"]')
  14 |     await expect(hero).toBeVisible()
  15 |     await expect(page.locator('[class="hero"]')).toContainText(data.usn)
  16 | })
```