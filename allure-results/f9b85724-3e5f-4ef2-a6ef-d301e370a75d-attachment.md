# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: troyGamesProject\tablesLab.test.ts >> readTableTwoLoop
- Location: tests\troyGamesProject\tablesLab.test.ts:26:6

# Error details

```
Error: Table row containing "Pavan 5" was not found
```

# Page snapshot

```yaml
- generic [active] [ref=f2e1]:
  - banner [ref=f2e2]:
    - generic [ref=f2e3]: 🎮 Troy Games
    - navigation [ref=f2e4]:
      - link "🏠 Dashboard" [ref=f2e5] [cursor=pointer]:
        - /url: dashboard.html
      - link "👥 Users" [ref=f2e6] [cursor=pointer]:
        - /url: users.html
      - link "🎮 Games" [ref=f2e7] [cursor=pointer]:
        - /url: games.html
      - link "🧾 Orders" [ref=f2e8] [cursor=pointer]:
        - /url: orders.html
      - link "🛍 Products" [ref=f2e9] [cursor=pointer]:
        - /url: products.html
      - link "📝 Forms" [ref=f2e10] [cursor=pointer]:
        - /url: forms.html
      - link "📊 Tables" [ref=f2e11] [cursor=pointer]:
        - /url: tables.html
      - link "⬆ Uploads" [ref=f2e12] [cursor=pointer]:
        - /url: uploads.html
      - link "🔔 Alerts" [ref=f2e13] [cursor=pointer]:
        - /url: alerts.html
      - link "🪟 Windows" [ref=f2e14] [cursor=pointer]:
        - /url: windows.html
      - link "🔌 API Demo" [ref=f2e15] [cursor=pointer]:
        - /url: api.html
    - button "Logout" [ref=f2e16] [cursor=pointer]
  - main [ref=f2e17]:
    - generic [ref=f2e18]:
      - heading "📊 Tables Lab" [level=1] [ref=f2e19]
      - paragraph [ref=f2e20]: Search, sort, select, delete and add rows.
    - generic [ref=f2e21]:
      - textbox "Search records" [ref=f2e22]
      - button "Add Row" [ref=f2e23] [cursor=pointer]
      - button "Delete Selected" [ref=f2e24] [cursor=pointer]
    - table [ref=f2e26]:
      - rowgroup [ref=f2e27]:
        - row [ref=f2e28]:
          - columnheader [ref=f2e29] [cursor=pointer]:
            - checkbox [ref=f2e30]
          - columnheader "ID ↕" [ref=f2e31] [cursor=pointer]
          - columnheader "Name ↕" [ref=f2e32] [cursor=pointer]
          - columnheader "Role ↕" [ref=f2e33] [cursor=pointer]
          - columnheader "Status ↕" [ref=f2e34] [cursor=pointer]
      - rowgroup [ref=f2e35]:
        - row [ref=f2e36]:
          - cell [ref=f2e37]:
            - checkbox [ref=f2e38]
          - cell "100" [ref=f2e39]
          - cell "Arun 1" [ref=f2e40]
          - cell "QA" [ref=f2e41]
          - cell "Inactive" [ref=f2e42]
        - row [ref=f2e43]:
          - cell [ref=f2e44]:
            - checkbox [ref=f2e45]
          - cell "101" [ref=f2e46]
          - cell "Priya 2" [ref=f2e47]
          - cell "Developer" [ref=f2e48]
          - cell "Active" [ref=f2e49]
        - row [ref=f2e50]:
          - cell [ref=f2e51]:
            - checkbox [ref=f2e52]
          - cell "102" [ref=f2e53]
          - cell "Rahul 3" [ref=f2e54]
          - cell "Player" [ref=f2e55]
          - cell "Active" [ref=f2e56]
        - row [ref=f2e57]:
          - cell [ref=f2e58]:
            - checkbox [ref=f2e59]
          - cell "103" [ref=f2e60]
          - cell "Neha 4" [ref=f2e61]
          - cell "Admin" [ref=f2e62]
          - cell "Inactive" [ref=f2e63]
        - row [ref=f2e64]:
          - cell [ref=f2e65]:
            - checkbox [ref=f2e66]
          - cell "104" [ref=f2e67]
          - cell "Pavan 5" [ref=f2e68]
          - cell "QA" [ref=f2e69]
          - cell "Active" [ref=f2e70]
        - row [ref=f2e71]:
          - cell [ref=f2e72]:
            - checkbox [ref=f2e73]
          - cell "105" [ref=f2e74]
          - cell "Arun 6" [ref=f2e75]
          - cell "Developer" [ref=f2e76]
          - cell "Active" [ref=f2e77]
        - row [ref=f2e78]:
          - cell [ref=f2e79]:
            - checkbox [ref=f2e80]
          - cell "106" [ref=f2e81]
          - cell "Priya 7" [ref=f2e82]
          - cell "Player" [ref=f2e83]
          - cell "Inactive" [ref=f2e84]
        - row [ref=f2e85]:
          - cell [ref=f2e86]:
            - checkbox [ref=f2e87]
          - cell "107" [ref=f2e88]
          - cell "Rahul 8" [ref=f2e89]
          - cell "Admin" [ref=f2e90]
          - cell "Active" [ref=f2e91]
    - generic [ref=f2e92]:
      - button "Previous" [ref=f2e93] [cursor=pointer]
      - generic [ref=f2e94]: "1"
      - button "Next" [ref=f2e95] [cursor=pointer]
```

# Test source

```ts
  1  | import { Page,Locator } from "@playwright/test";
  2  | import { CommonUtils } from "../../Utils/commonUtils";
  3  | 
  4  | export class Tables{
  5  |     readonly page:Page
  6  |     readonly tableLink:Locator
  7  |     readonly tableData:Locator
  8  |     constructor(page:Page){
  9  |         this.page=page
  10 |         this.tableLink=page.getByRole('link',{name:'Tables'})
  11 |         this.tableData=page.locator('//*[@id="largeTableBody"]/tr')
  12 |     }
  13 | 
  14 |     async clickOnTables(){
  15 |         const common=new CommonUtils(this.page)
  16 |         await common.clickAndHighlight(this.tableLink,'Click on Table')
  17 |     }
  18 | 
  19 |     async getTableData(value:string){
  20 |         
  21 |         const count = await this.tableData.locator('td').count()
  22 |         for (let i = 0; i < count; i++) {
  23 |             const row = this.tableData
  24 |             const text = await row.locator('td').nth(i).innerText()
  25 |             console.log(i+"<===>"+text);
  26 |             if (text.includes(value)){
  27 |                 console.log(typeof row);
  28 |                 console.log(row);
  29 |                 return row.locator('td').nth(i)
  30 |             }
  31 |                 
  32 |         }
  33 |         throw new Error(`Table row containing "${value}" was not found`)
  34 |         
  35 |     }
  36 | 
  37 |     async getTableDataBasedOnHeader(headerValue:string,dataValue:string){
  38 |         const count=await this.tableData.locator('th').count()
  39 |         for(let i=0;i<count;i++){
  40 |             const header=this.tableData.locator('th')
  41 |             if((await header.innerText()).includes(headerValue)){
  42 |                     const data= this.tableData.locator('td').nth(i)
  43 |                     for(let j=0;j<await data.count();j++){
  44 |                         if((await data.nth(j).innerText()).includes(dataValue)){
  45 |                             return data.nth(j)
  46 |                         }
  47 |                     }
  48 |             }
  49 |         }
> 50 |         throw new Error(`Table row containing "${dataValue}" was not found`)
     |               ^ Error: Table row containing "Pavan 5" was not found
  51 | 
  52 |     }
  53 | }
```