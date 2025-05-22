import { test, expect, Page } from '@playwright/test' ;
import { CreateContact } from '../helper/generate-user-helper'

export class contactPages{
    readonly page:Page

    constructor(page : Page){
        this.page = page;
    }

    async goto(){
        await this.page.goto('/');
    }

    async addContact(obj : {
        firstname : boolean,
        lastname : boolean,
        birthday : boolean,
        phone : boolean , 
        email : boolean,
        postalCode : boolean
    }){

        let body = await CreateContact({
            firstname : obj.firstname,
            lastname : obj.lastname,
            birthday : obj.birthday,
            phone : obj.phone, 
            email : obj.email,
            postalCode : obj.postalCode
        });

        await this.page.locator("//button[@id='add-contact']").click();
        await this.page.locator("//input[@id='firstName']").fill(body.firstName);
        await this.page.locator("//input[@id='lastName']").fill(body.lastName);
        await this.page.locator("//input[@id='birthdate']").fill(body.birthdate);
        await this.page.locator("//input[@id='phone']").fill(body.phone);
        await this.page.locator("//input[@id='street1']").fill(body.street1);
        await this.page.locator("//input[@id='street2']").fill(body.street2);
        await this.page.locator("//input[@id='city']").fill(body.city);
        await this.page.locator("//input[@id='stateProvince']").fill(body.stateProvince);
        await this.page.locator("//input[@id='postalCode']").fill(body.postalCode);
        await this.page.locator("//input[@id='country']").fill(body.country);

        await this.page.locator("//button[@id='submit']").click();
    }

    async editContact(){

    }

    async removeContact(){
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
        });

        const count = await this.page.locator("//tr[@class='contactTableBodyRow']").count();

        if(count > 0){
            await this.page.locator("//tr[@class='contactTableBodyRow']").first().click();
            await this.page.locator("//button[@id='delete']").click();

            await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/contactList")
            const finalDataCount = await this.page.locator("//tr[@class='contactTableBodyRow']").count();

            expect(finalDataCount).toBeLessThan(count)
        }else{
            return
        }
    }
}