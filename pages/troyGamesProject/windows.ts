import {Page,Locator} from '@playwright/test'
import {CommonUtils  } from "../../Utils/commonUtils";

export class Windows{
    readonly page:Page
    readonly common:CommonUtils
    readonly windowLink:Locator
    readonly openNewTabButton:Locator
    readonly openPopupButton:Locator
    readonly openNewWindowPageButton:Locator
    readonly openModalButton:Locator
    constructor(page:Page){
        this.page=page
        this.common =new CommonUtils(this.page)
        this.windowLink=page.getByRole('link',{name:'Windows'})
        this.openNewTabButton=page.getByRole('button',{name:'Open New Tab'})
        this.openPopupButton=page.getByRole('button',{name:'Open Popup'})
        this.openNewWindowPageButton =page.getByRole('button',{name:'Open New Window Page'})
        this.openModalButton=page.getByRole('button',{name:'Open Modal'})
    }
        
    async clickOnWindowLink(value:string){
       
        await this.common.clickAndHighlight(this.windowLink,'Windows Link')
        console.log(`clicked on ${value} Successfully`);
        
    }

    async clickOnNewTabButton(value:string){
        await this.common.clickAndHighlight(this.openNewTabButton,'Open New tab')
        console.log(`clicked on ${value} Successfully`);
    }

     async clickonPopupButton(value:string){
        await this.common.clickAndHighlight(this.openPopupButton,'Open popup')
        console.log(`clicked on ${value} Successfully`);
    }

     async clickonNewWindowpageButton(value:string){
        await this.common.clickAndHighlight(this.openNewWindowPageButton,'Open New Window Page')
        console.log(`clicked on ${value} Successfully`);
    }

     async clickonModalButton(value:string){
        await this.common.clickAndHighlight(this.openModalButton,'Open Modal')
        console.log(`clicked on ${value} Successfully`);
    }
}
