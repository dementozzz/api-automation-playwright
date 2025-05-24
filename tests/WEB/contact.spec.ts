import { test, expect } from '@playwright/test';
import { authPages } from '../../pages/auth.pages';
import { contactPages } from '../../pages/contact.pages';

test.use({ storageState: './data/auth/user-cookies.json' });

test.skip('Add contact list', async ({page}) => {

    await test.step('with valid input value', async () => {
        const contactpages = new contactPages(page);

        await page.goto("/contactList");
        await contactpages.addContact({});
    })

})

test.skip('Edit contact list', async ({page}) => {
    const contactpages = new contactPages(page);

    await page.goto("/contactList");
    await contactpages.editContact();
})

test('remove contact list', async ({page}) => {
    const contactpages = new contactPages(page);

    await page.goto("/contactList");
    await contactpages.removeContact();
})