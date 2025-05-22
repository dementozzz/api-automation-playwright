import { test, expect } from '@playwright/test';
import { authPages } from '../../pages/auth.pages';
require('dotenv').config();

const email = process.env.EMAIL as string
const password = process.env.PASSWORD as string

test('login', async ({page}) => {

    test.step('with invalid credential', async() => {
        const authpages = new authPages(page);

        await authpages.goto();
        await authpages.login({
            email : "asdasd",
            password : "1234"
        });

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText("Incorrect username or password");
    })

    test.step('with valid credential', async () => {
        const authpages = new authPages(page);

        await authpages.goto();
        await authpages.login({
            email : email,
            password : password
        });

        await expect(page).toHaveURL("https://thinking-tester-contact-list.herokuapp.com/contactList")
    })
    
})