import { expect, Page } from '@playwright/test' ;
import { CreateContact } from '../helper/generate-user-helper';

export class contactPages{
    readonly page:Page

    constructor(page : Page){
        this.page = page;
    }

    async addContact(obj : {
        firstname?: string,
        lastname?: string,
        birthday?: string,
        phone?: string, 
        email?: string,
        postalCode?: string
    }){

        const body = await CreateContact({
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
        await this.page.locator("//input[@id='email']").fill(body.email);
        await this.page.locator("//input[@id='street1']").fill(body.street1);
        await this.page.locator("//input[@id='street2']").fill(body.street2);
        await this.page.locator("//input[@id='city']").fill(body.city);
        await this.page.locator("//input[@id='stateProvince']").fill(body.stateProvince);
        await this.page.locator("//input[@id='postalCode']").fill(body.postalCode);
        await this.page.locator("//input[@id='country']").fill(body.country);

        await this.page.locator("//button[@id='submit']").click();
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
        //navigate to edit contact page 
        await this.page.locator("//button[@id='edit-contact']").click();

        //Wait until page is finish load
        await this.page.waitForEvent('requestfinished'); 
        await this.page.locator("//input[@id='firstName']").waitFor();           
        await expect.poll(async () => {
            const value = await this.page.locator("//input[@id='firstName']").inputValue();
            return value;
        }).not.toBe('');

        //fill the input if there is any data requested
        if(typeof obj.firstName != 'undefined'){
            await this.page.locator("//input[@id='firstName']").fill(obj.firstName as string);
        }
        if(typeof obj.lastName != 'undefined'){
            await this.page.locator("//input[@id='lastName']").fill(obj.lastName as string);
        }
        if(typeof obj.birthdate != 'undefined'){
            await this.page.locator("//input[@id='birthdate']").fill(obj.birthdate as string);
        }
        if(typeof obj.email != 'undefined'){
            await this.page.locator("//input[@id='email']").fill(obj.email as string);
        }
        if(typeof obj.phone != 'undefined'){
            await this.page.locator("//input[@id='phone']").fill(obj.phone as string);
        }
        if(typeof obj.street1 != 'undefined'){
            await this.page.locator("//input[@id='street1']").fill(obj.street1 as string);
        }
        if(typeof obj.street2 != 'undefined'){
            await this.page.locator("//input[@id='street2']").fill(obj.street2 as string);
        }
        if(typeof obj.city != 'undefined'){
            await this.page.locator("//input[@id='city']").fill(obj.city as string);
        }
        if(typeof obj.stateProvince != 'undefined'){
            await this.page.locator("//input[@id='stateProvince']").fill(obj.stateProvince as string);
        }
        if(typeof obj.country != 'undefined'){
            await this.page.locator("//input[@id='country']").fill(obj.country as string);
        }
        if(typeof obj.postalCode != 'undefined'){
            await this.page.locator("//input[@id='postalCode']").fill(obj.postalCode as string);
        }
        
        //Click button submit & navigate back to contact list page
        await this.page.locator("//button[@id='submit']").click();        
    }

    async countListData(){
        let countData = 0

        //after navigate into contact list page, wait for specific URL response and retrieve the data
        await this.page.goto("/contactList");
        const response = await this.page.waitForResponse('https://thinking-tester-contact-list.herokuapp.com/contacts');
        const data = await response.json();

        // Check if data is an array and get its length
        const totalDataCount = Array.isArray(data) ? data.length : 0;
        console.log("Data fetched:", totalDataCount);

        //if data from response is more than 0, start count from UI perspective 
        if(totalDataCount > 0){
            await this.page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
            countData = await this.page.locator("//tr[@class='contactTableBodyRow']").count();
        }
        
        return countData;
    }

    async getUserData(){
        
        await this.page.locator("//span[@id='firstName']").waitFor({state: 'visible'});

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