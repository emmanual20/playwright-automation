import {test,expect} from '../../fixtures/test'
import { LoginPage } from "../../pages/troyGamesProject/login";
import { CommonUtils } from '../../Utils/commonUtils';
import data from "../../Data/troyGamesProjectData/login.json"
import {Tables} from "../../pages/troyGamesProject/tables"
import tablesData from "../../Data/troyGamesProjectData/tables.json"

test('readTable',async({page})=>{
    const loginPage=new LoginPage(page)
    const common=new CommonUtils(page)
    const tables=new Tables(page)
    const td=tablesData.readTable

    await loginPage.loginAndRemember(data.Valid.usn,data.Valid.pwd,data.Valid.remember)
    await common.visibleAndHighlight(loginPage.dashboardHeader,'Dashboard Header')
    await tables.clickOnTables();
    const header=loginPage.dashboardHeader
    await common.containTextAndHighlight(header,td.header,'Tables Header')
    const role1=await tables.getTableData(td.role)
    console.log(typeof role1);
    await common.containTextAndHighlight(role1,td.role,'Role Data in table')
    await page.waitForTimeout(4000)

})

test.skip('readTableTwoLoop',async({page})=>{
     const loginPage=new LoginPage(page)
    const common=new CommonUtils(page)
    const tables=new Tables(page)
    const td=tablesData.readTableTwoLoop

    await loginPage.loginAndRemember(data.Valid.usn,data.Valid.pwd,data.Valid.remember)
    await common.visibleAndHighlight(loginPage.dashboardHeader,'Dashboard Header')
    await tables.clickOnTables();
    const header=loginPage.dashboardHeader
    await common.containTextAndHighlight(header,td.header,'Tables Header')
    const locator=await tables.getTableDataBasedOnHeader(td.tableHeader,td.data)
    console.log(locator.innerText);
    await common.containTextAndHighlight(locator,td.data,'Role Data in table')

})