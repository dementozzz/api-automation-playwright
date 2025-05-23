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
        firstname?: boolean,
        lastname?: boolean,
        birthday?: boolean,
        phone?: boolean, 
        email?: boolean,
        postalCode?: boolean
    }){

        let body = await CreateContact({
            firstname : obj.firstname ?? true,
            lastname : obj.lastname ?? true,
            birthday : obj.birthday ?? true,
            phone : obj.phone ?? true, 
            email : obj.email ?? true,
            postalCode : obj.postalCode ?? true
        });

        await this.page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
        const countdata = await this.page.locator("//tr[@class='contactTableBodyRow']").count();

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

        await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/contactList");
        await this.page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
        const newcountdata = await this.page.locator("//tr[@class='contactTableBodyRow']").count();
        
        //make sure the updated list has more data than before
        await expect.soft(newcountdata).toBeGreaterThan(countdata)

    }

    async editContact(){
        await this.page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
        const count = await this.page.locator("//tr[@class='contactTableBodyRow']").count();

        if(count > 0){
            await this.page.locator("//tr[@class='contactTableBodyRow']").first().click();
            await this.page.locator("//button[@id='edit-contact']").click();

            const birthdate = await this.page.locator("//span[@id='birthdate']").textContent()
            const phone = await this.page.locator("//span[@id='phone']").textContent()
            const street1 = await this.page.locator("//span[@id='street1']").textContent()
            const street2 = await this.page.locator("//span[@id='street2']").textContent()

            await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/editContact")
            
            let body = await CreateContact({
                firstname : false,
                lastname : false,
                birthday : true,
                phone : true, 
                email : false,
                postalCode : false
            });

            await this.page.locator("//input[@id='birthdate']").fill(body.birthdate);
            await this.page.locator("//input[@id='phone']").fill(body.phone);

            await this.page.locator("//input[@id='street1']").fill(body.street1);
            await this.page.locator("//input[@id='street2']").fill(body.street2);

            await this.page.locator("//button[@id='submit']").click();

            await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/editContact");

            const newbirthdate = await this.page.locator("//span[@id='birthdate']").textContent()
            const newphone = await this.page.locator("//span[@id='phone']").textContent()
            const newstreet1 = await this.page.locator("//span[@id='street1']").textContent()
            const newstreet2 = await this.page.locator("//span[@id='street2']").textContent()

            await expect.soft(birthdate).not.toEqual(newbirthdate)
            await expect.soft(phone).not.toEqual(newphone)
            await expect.soft(street1).not.toEqual(newstreet1)
            await expect.soft(street2).not.toEqual(newstreet2)

        }else{
            return
        }
    }

    async removeContact(){
        this.page.on('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
        });
        
        await this.page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
        const count = await this.page.locator("//tr[@class='contactTableBodyRow']").count();

        if(count > 0){
            await this.page.locator("//tr[@class='contactTableBodyRow']").first().click();
            await this.page.locator("//button[@id='delete']").click();

            await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/contactList");
            await this.page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
            const finalDataCount = await this.page.locator("//tr[@class='contactTableBodyRow']").count();

            expect(finalDataCount).toBeLessThan(count)
        }else{
            return
        }
    }
}