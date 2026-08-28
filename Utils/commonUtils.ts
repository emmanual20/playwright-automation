import {Page,Locator,expect} from '@playwright/test'

export class CommonUtils{
    readonly page:Page
    constructor(page:Page){
        this.page=page
    }

    async clickAndHighlight(element:Locator,elementName:string){
        console.log(`Clicking element : ${elementName}`)
        await element.scrollIntoViewIfNeeded()
         // Highlight element in red
        await element.evaluate((el) => {
            (el as HTMLElement).style.border = '3px solid red';
            
        });
        await element.click()
        console.log(`Clicked element : ${elementName}`)
    }

    async fillAndHighlight(element:Locator,value:string,elementName:string){
        console.log(`Filling ${value} in Element ${elementName}`);
        await element.scrollIntoViewIfNeeded()
          // Highlight element in red
         await element.evaluate((el) => {
            const e = el as HTMLElement;
            e.style.border = '3px solid green';
            e.style.backgroundColor = 'rgba(9, 227, 56, 0.15)';
            e.style.boxShadow = '0 0 10px green';
        });
        await element.fill(value)
         console.log(`Filled ${value} in Element ${elementName}`);
    }

    async checkboxCheckAndHighlight(element:Locator){
        console.log(`Check checkbox`);
        await element.scrollIntoViewIfNeeded()
        await element.evaluate((el) => {
            const e = el as HTMLElement;
            e.style.border = '3px solid orange';
            e.style.backgroundColor = 'rgba(70, 8, 243, 0.15)';
            e.style.boxShadow = '0 0 10px orange';
        });
        if(await element.isChecked()){
            console.log(`Checkbox already checked`);
        }else{
            await element.check()
            console.log(`Checkbox checked`);
            
        }
        
    }

    async visibleAndHighlight(element:Locator,elementName:string){
        console.log(`${elementName} checking Visibility`);
        await element.scrollIntoViewIfNeeded()
        await element.evaluate((el) => {
            (el as HTMLElement).style.border = '6px solid red';
        });
        await expect(element).toBeVisible({timeout:40000})
        console.log(`${elementName} is Present and Visible`);
    }

    async containTextAndHighlight(element:Locator,value:string,elementName:string){
        console.log(`Verify ${elementName} contain ${value}`);
        await element.scrollIntoViewIfNeeded()
        await element.evaluate((el) => {
            (el as HTMLElement).style.border = '3px solid red';
        });
        await expect(element).toContainText(value)
        console.log(`${elementName} contains ${value}`);
    
    }
}