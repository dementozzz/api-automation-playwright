import { Page } from '@playwright/test' ;
import { CreateContact } from '../helper/generate-user-helper';

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

    async register( obj : {
        firstname? : string,
        lastname? : string,
        email? : string,
        password? : string,
    }){
        //Generate data for create contact list
        const body = await CreateContact({
            firstname : obj.firstname,
            lastname : obj.lastname,  
            email : obj.email,
            password : obj.password
        });

        await this.page.locator("//button[@id='signup']").click();

        await this.page.locator("//input[@id='firstName']").fill(body.firstName);
        await this.page.locator("//input[@id='lastName']").fill(body.lastName);
        await this.page.locator("//input[@id='email']").fill(body.email);
        await this.page.locator("//input[@id='password']").fill(body.password);

        await this.page.locator("//button[@id='submit']").click();
    }
}