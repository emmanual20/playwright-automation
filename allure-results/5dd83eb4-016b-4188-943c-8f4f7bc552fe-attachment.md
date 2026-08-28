# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: troyGamesProject\login.test.ts >> login test
- Location: tests\troyGamesProject\login.test.ts:10:5

# Error details

```
Error: page.goto: url: expected string, got undefined
```

# Test source

```ts
  1  | import {test,expect} from '@playwright/test'
  2  | import data from '../../Data/troyGamesProjectData/login.json'
  3  | import {LoginPage} from '../../pages/troyGamesProject/login'
  4  | import { CommonUtils } from '../../commonUtils'
  5  | 
  6  | test.beforeEach(async({page})=>{
> 7  | await page.goto(data.url)
     |            ^ Error: page.goto: url: expected string, got undefined
  8  | })
  9  | 
  10 | test('login test',async({page})=>{
  11 |     const loginPage=new LoginPage(page)
  12 |     const common=new CommonUtils(page)
  13 | 
  14 |     await loginPage.loginAndRemember(data.usn,data.pwd,data.remember)
  15 |     let header=loginPage.dashboardHeader
  16 |     await common.visibleAndHighlight(header,'Dashboard Header')
  17 |     await common.containTextAndHighlight(header,data.usn,'Dashboard Header Validation')
  18 | })
```