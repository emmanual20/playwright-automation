import { Page,Locator } from "@playwright/test";
import { CommonUtils } from "../../Utils/commonUtils";

export class Tables{
    readonly page:Page
    readonly tableLink:Locator
    readonly tableData:Locator
    constructor(page:Page){
        this.page=page
        this.tableLink=page.getByRole('link',{name:'Tables'})
        this.tableData=page.locator('//*[@id="largeTableBody"]/tr')
    }

    async clickOnTables(){
        const common=new CommonUtils(this.page)
        await common.clickAndHighlight(this.tableLink,'Click on Table')
    }

    async getTableData(value:string){
        
        const count = await this.tableData.locator('td').count()
        for (let i = 0; i < count; i++) {
            const row = this.tableData
            const text = await row.locator('td').nth(i).innerText()
            console.log(i+"<===>"+text);
            if (text.includes(value)){
                console.log(typeof row);
                console.log(row);
                return row.locator('td').nth(i)
            }
                
        }
        throw new Error(`Table row containing "${value}" was not found`)
        
    }

    async getTableDataBasedOnHeader(headerValue:string,dataValue:string){
        const count=await this.tableData.locator('th').count()
        for(let i=0;i<count;i++){
            const header=this.tableData.locator('th')
            if((await header.innerText()).includes(headerValue)){
                    const data= this.tableData.locator('td').nth(i)
                    for(let j=0;j<await data.count();j++){
                        if((await data.nth(j).innerText()).includes(dataValue)){
                            return data.nth(j)
                        }
                    }
            }
        }
        throw new Error(`Table row containing "${dataValue}" was not found`)

    }
}