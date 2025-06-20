import { test, expect } from '@playwright/test';
import { CreateContact } from '../../src/helper/generate-user-helper';
import { contactPages } from '../../src/pages/contact.pages';

test.use({ storageState: './data/auth/user-cookies.json' });

test.describe('Add contact list', async () => {

    test('Add - Without first name', async ({page}) => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            firstname : ""
        });

        await page.waitForEvent('requestfinished');
        await page.locator("//span[@id='error']").waitFor({state : 'visible'});

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('Contact validation failed');
        
    })

    test('Add - Without last name', async ({page}) => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            lastname : ""
        });

        await page.waitForEvent('requestfinished');
        await page.locator("//span[@id='error']").waitFor({state : 'visible'});

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('Contact validation failed');
        
    })

    test('Add - With invalid format of birthdate', async ({page}) => {
        const contactpages = new contactPages(page);
        
        await page.goto("/contactList");
        await contactpages.addContact({
            birthday: "000--1762asd"
        });

        await page.waitForEvent('requestfinished');
        await page.locator("//span[@id='error']").waitFor({state : 'visible'});

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('Contact validation failed');
        
    })

    test('Add - With invalid format of phone number', async ({page}) => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            phone: "01291qweqwe"
        });

        await page.waitForEvent('requestfinished');
        await page.locator("//span[@id='error']").waitFor({state : 'visible'});

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('Contact validation failed');
        
    })

    test('Add - With invalid format of email', async ({page}) => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            email: "emaildotcom"
        });

        await page.waitForEvent('requestfinished');
        await page.locator("//span[@id='error']").waitFor({state : 'visible'});

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('Contact validation failed');
        
    })

    test('Add - with valid input value', async ({page}) => {
        const contactpages = new contactPages(page);

        const currentdata = await contactpages.countListData();
        await contactpages.addContact({});
        const latestData = await contactpages.countListData();

        //make sure the updated list has more data than before
        expect.soft(latestData).toBeGreaterThan(currentdata)
    })
})

test('Edit contact list', async ({page}) => {
    const contactpages = new contactPages(page);

    await page.goto("/contactList");

    try {
        await page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
        await page.locator("//tr[@class='contactTableBodyRow']").first().click();
        const currentData = await contactpages.getUserData();
        
        const contact = await CreateContact({})

        await contactpages.editContact({
            birthdate : contact.birthdate,
            street1 : contact.street1,
            phone : contact.phone
        });

        page.waitForEvent('requestfinished');
        const latestData = await contactpages.getUserData();

        expect.soft(currentData.birthdate).not.toEqual(latestData.birthdate);
        console.log("expect birthdate (" + currentData.birthdate + ") to NOT equal (" + latestData.birthdate + ")") 

        expect.soft(currentData.street1).not.toEqual(latestData.street1);
        console.log("expect birthdate (" + currentData.street1 + ") to NOT equal (" + latestData.street1 + ")") 

        expect.soft(currentData.phone).not.toEqual(latestData.phone);
        console.log("expect birthdate (" + currentData.phone + ") to NOT equal (" + latestData.phone + ")") 

    } catch (error) {
        throw (error);
    } 
})

test('remove contact list', async ({page}) => {
    const contactpages = new contactPages(page);

    await page.goto("/contactList");
    await contactpages.removeContact();   
})