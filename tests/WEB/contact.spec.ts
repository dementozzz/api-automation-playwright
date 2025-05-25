import { test, expect } from '@playwright/test';
import { authPages } from '../../pages/auth.pages';
import { GenerateBirthdate } from '../../helper/generate-user-helper';
import { contactPages } from '../../pages/contact.pages';
import { error } from 'console';

test.use({ storageState: './data/auth/user-cookies.json' });

test.skip('Add contact list', async ({page}) => {

    await test.step.skip('Without first name', async () => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            firstname : false
        });
    })

    await test.step.skip('Without last name', async () => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            lastname : false
        });
    })

    await test.step.skip('Without birthday', async () => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            birthday: false
        });
    })

    await test.step.skip('Without phone number', async () => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            phone: false
        });
    })

    await test.step.skip('Without email', async () => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            email: false
        });
    })

    await test.step.skip('Without postal code', async () => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({
            postalCode: false
        });
    })

    await test.step('with valid input value', async () => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({});
    })
})

test('Edit contact list', async ({page}) => {
    const contactpages = new contactPages(page);

    await page.goto("/contactList");

    try {
        await page.locator("//tr[@class='contactTableBodyRow']").first().waitFor();
        await page.locator("//tr[@class='contactTableBodyRow']").first().click();
        const currentData = await contactpages.getUserData();

        const birthday = await GenerateBirthdate();

        await contactpages.editContact({
            birthdate : birthday
        });
        const latestData = await contactpages.getUserData();

        expect.soft(currentData.birthdate).not.toEqual(latestData.birthdate);
        console.log("expect birthdate (" + currentData.birthdate + ") to equal (" + latestData.birthdate + ")") 
    } catch (error) {
        throw (error);
    } 
})

test.skip('remove contact list', async ({page}) => {
    const contactpages = new contactPages(page);

    await page.goto("/contactList");
    await contactpages.removeContact();   
})