import { Page } from '@playwright/test' ;

export class authPages {
    readonly page:Page

    constructor(page : Page){
        this.page = page;
    }

    async login(obj : {
        email : string,
        password : string
    }){
        await this.page.locator("//input[@id='email']").fill(obj.email);
        await this.page.locator("//input[@id='password']").fill(obj.password);
        await this.page.locator("//button[@id='submit']").click();
    }
}