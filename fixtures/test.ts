import {test as base,expect} from "@playwright/test";

const defaultUrl = 'http://localhost:8000/index.html';

export const test=base.extend({
    page:async({page},use)=>{
        await page.goto(defaultUrl)
        await use(page)
    }
})

export {expect}