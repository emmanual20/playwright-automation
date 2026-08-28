import {test,expect} from '../../fixtures/test'
import data from '../../Data/troyGamesProjectData/login.json'
import {LoginPage} from '../../pages/troyGamesProject/login'
import { CommonUtils } from '../../Utils/commonUtils'


test('valid Login Test',async({page})=>{
    const loginPage=new LoginPage(page)
    const common=new CommonUtils(page)

    await loginPage.loginAndRemember(data.Valid.usn,data.Valid.pwd,data.Valid.remember)
    let header=loginPage.dashboardHeader
    await common.visibleAndHighlight(header,'Dashboard Header')
    await common.containTextAndHighlight(header,data.Valid.usn,'Dashboard Header Validation')
})

test('invalid Login Test',async({page})=>{
    const loginPage=new LoginPage(page)
    const common=new CommonUtils(page)

    await loginPage.loginAndRemember(data.Invalid.usn,data.Invalid.pwd,data.Invalid.remember)
    let message=loginPage.loginErrorMessage
    await common.visibleAndHighlight(message,'Error Message')
    await common.containTextAndHighlight(message,data.Invalid.message,'Error Message Validation')
})
