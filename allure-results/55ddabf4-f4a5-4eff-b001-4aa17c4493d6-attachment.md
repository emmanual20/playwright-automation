# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: troyGamesProject\login.test.ts >> login test
- Location: tests\troyGamesProject\login.test.ts:3:5

# Error details

```
Error: page.waitForSelector: selector: expected string, got object
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: 🎮
  - heading "Troy Games Automation Portal" [level=1] [ref=e5]
  - paragraph [ref=e6]: Playwright & JavaScript UI Automation Lab
  - generic [ref=e7]:
    - generic [ref=e8]: Username
    - textbox "Username" [ref=e9]: Payramid
    - generic [ref=e10]: Password
    - generic [ref=e11]:
      - textbox "Password" [ref=e12]: Pass@123
      - button "Show" [ref=e13] [cursor=pointer]
    - generic [ref=e14]:
      - checkbox "Remember Me" [checked] [active] [ref=e15]
      - text: Remember Me
    - button "Login" [ref=e16] [cursor=pointer]
    - button "Clear" [ref=e17] [cursor=pointer]
    - link "Forgot Password?" [ref=e19] [cursor=pointer]:
      - /url: "#"
    - paragraph
    - paragraph
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | 
  3  | test('login test',async({page})=>{
  4  |     await page.goto('http://localhost:8000/index.html')
  5  |     await page.getByTestId('username-input').fill('Payramid')
  6  |     await page.getByTestId('password-input').fill('Pass@123')
  7  |     await page.getByTestId('remember-me').check()
  8  |     await page.getByRole('button',{name:'login'})
> 9  |     await page.waitForSelector(page.locator('[class="hero"]'))
     |                ^ Error: page.waitForSelector: selector: expected string, got object
  10 |     await expect(page.locator('[class="hero"]')).toHaveText('Payramid')
  11 | })
```