import {test,expect} from '../../fixtures/test'
import { LoginPage } from '../../pages/troyGamesProject/login'
import data from "../../Data/troyGamesProjectData/login.json";
import { CommonUtils } from "../../Utils/commonUtils";
import { Windows } from '../../pages/troyGamesProject/windows';
import windowsData from '../../Data/troyGamesProjectData/windows.json'

test('Open New Tab',async({page})=>{
    const loginPage=new LoginPage(page)
    const common=new CommonUtils(page)
    const windows=new Windows(page)
    const newTabData=windowsData['Open New Tab']

    await loginPage.loginAndRemember(data.Valid.usn,data.Valid.pwd,data.Valid.remember)
    await common.visibleAndHighlight(loginPage.dashboardHeader,'Dashboard Header')
    await windows.clickOnWindowLink('windows')
    const header=loginPage.dashboardHeader
    await common.containTextAndHighlight(header,newTabData.header,'Tables Header')
    let [page2]=await Promise.all([
    page.waitForEvent('popup'),
    await windows.clickOnNewTabButton('open New Tab')
    ])
    await common.fillAndHighlight(page2.getByTestId('window-input'),'Open new Window','Open new Window')
    await common.clickAndHighlight(page2.getByRole('button',{name:'Click Action'}),'Click action')
    await common.containTextAndHighlight(page2.getByText('New window action completed!'),'New window action completed!','Success Message')
    
})