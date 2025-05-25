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
        await this.page.locator("//input[@id='email']").fill(body.email);
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

    async editContact(obj : {
        firstName? : string,
        lastName? : string,
        birthdate? : string,
        email? : string,
        phone? : string,
        street1? : string,
        street2? : string,
        city? : string,
        stateProvince? : string,
        postalCode? : string,
        country? : string
    }){        
        await this.page.locator("//button[@id='edit-contact']").click();
        await this.page.locator("//input[@id='firstName']").waitFor();           
        await expect.poll(async () => {
            const value = await this.page.locator("//input[@id='firstName']").inputValue();
            return value;
        }).not.toBe('');

        if(obj.firstName != "" && typeof obj.firstName == 'string'){
            await this.page.locator("//input[@id='firstName']").fill(obj.firstName as string);
        }
        if(obj.lastName != "" && typeof obj.lastName == 'string'){
            await this.page.locator("//input[@id='lastName']").fill(obj.lastName as string);
        }
        if(obj.birthdate != "" && typeof obj.birthdate == 'string'){
            await this.page.locator("//input[@id='birthdate']").fill(obj.birthdate as string);
        }
        if(obj.email != "" && typeof obj.email == 'string'){
            await this.page.locator("//input[@id='email']").fill(obj.email as string);
        }
        if(obj.phone != "" && typeof obj.phone == 'string'){
            await this.page.locator("//input[@id='phone']").fill(obj.phone as string);
        }
        if(obj.street1 != "" && typeof obj.street1 == 'string'){
            await this.page.locator("//input[@id='street1']").fill(obj.street1 as string);
        }
        if(obj.street2 != "" && typeof obj.street2 == 'string'){
            await this.page.locator("//input[@id='street2']").fill(obj.street2 as string);
        }
        if(obj.city != "" && typeof obj.city == 'string'){
            await this.page.locator("//input[@id='city']").fill(obj.city as string);
        }
        if(obj.stateProvince != "" && typeof obj.stateProvince == 'string'){
            await this.page.locator("//input[@id='stateProvince']").fill(obj.stateProvince as string);
        }
        if(obj.country != "" && typeof obj.country == 'string'){
            await this.page.locator("//input[@id='country']").fill(obj.country as string);
        }
        if(obj.postalCode != "" && typeof obj.postalCode == 'string'){
            await this.page.locator("//input[@id='postalCode']").fill(obj.postalCode as string);
        }
        
        await this.page.locator("//button[@id='submit']").click();        
    }

    async getUserData(){
        await this.page.locator("//span[@id='birthdate']").waitFor();

        const firstname = await this.page.locator("//span[@id='firstName']").textContent();
        const lastname = await this.page.locator("//span[@id='lastName']").textContent();
        const birthdate = await this.page.locator("//span[@id='birthdate']").textContent();
        const phone = await this.page.locator("//span[@id='phone']").textContent();
        const email = await this.page.locator("//span[@id='email']").textContent();
        const street1 = await this.page.locator("//span[@id='street1']").textContent();
        const street2 = await this.page.locator("//span[@id='street2']").textContent();
        const city = await this.page.locator("//span[@id='city']").textContent();
        const stateProvince = await this.page.locator("//span[@id='stateProvince']").textContent();
        const postalCode = await this.page.locator("//span[@id='postalCode']").textContent();
        const country = await this.page.locator("//span[@id='country']").textContent();

        return {
            firstname : firstname,
            lastname : lastname,
            birthdate : birthdate,
            email : email,
            phone : phone,
            street1 : street1,
            street2 : street2,
            city : city,
            stateProvince : stateProvince,
            postalCode : postalCode,
            country : country
        }
    }

    async removeContact(){
        this.page.on('dialog', async dialog => {
            await dialog.accept();
        });
        
        await this.page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
        const count = await this.page.locator("//tr[@class='contactTableBodyRow']").count();
        console.log("CURRENT DATA COUNT: " + count);

        if(count > 0){
            await this.page.locator("//tr[@class='contactTableBodyRow']").first().click();
            await this.page.locator("//button[@id='delete']").click();

            await this.page.waitForURL("https://thinking-tester-contact-list.herokuapp.com/contactList");

            await this.page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
            const finalDataCount = await this.page.locator("//tr[@class='contactTableBodyRow']").count();

            console.log("UPDATED DATA COUNT: " + finalDataCount);
            expect(finalDataCount).toBeLessThan(count);
            
        }else{
            return;
        }
    }
}