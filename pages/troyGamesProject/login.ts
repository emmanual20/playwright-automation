import {Page,Locator} from '@playwright/test'
import { CommonUtils } from '../../Utils/commonUtils'

export class LoginPage{
    readonly page:Page
    readonly username:Locator
    readonly password:Locator
    readonly rememberMeCheckbox:Locator
    readonly loginButton:Locator
    readonly dashboardHeader:Locator
    readonly loginErrorMessage
constructor(page:Page){
    this.page=page
    this.username=page.getByTestId('username-input')
    this.password= page.getByTestId('password-input')
    this.rememberMeCheckbox= page.getByTestId('remember-me')
    this.loginButton= page.getByRole('button',{name:'login'})
    this.dashboardHeader=page.locator('[class="hero"]')
    this.loginErrorMessage=page.getByTestId('error-message')

}

async loginAndRemember(username:string,password:string,remember:string){
    const common=new CommonUtils(this.page)
    await common.fillAndHighlight(this.username,username,'Username')
    await common.fillAndHighlight(this.password,password,'Password')
    if(remember=='yes')
    await common.checkboxCheckAndHighlight(this.rememberMeCheckbox)
    await common.clickAndHighlight(this.loginButton,'Login Button')
}
}
