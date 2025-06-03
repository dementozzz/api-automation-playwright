import { test, expect } from '@playwright/test';
import { authPages } from '../../src/pages/auth.pages';
require('dotenv').config();

const email = process.env.EMAIL as string
const password = process.env.PASSWORD as string


test.describe('login', async () => {

    test('with invalid credential', async({page}) => {
        const authpages = new authPages(page);

        await page.goto('/')
        await authpages.login({
            email : "asdasd",
            password : "1234"
        });

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText("Incorrect username or password");
    })

    test('with valid credential', async ({page}) => {
        const authpages = new authPages(page);

        await page.goto('/')
        await authpages.login({
            email : email,
            password : password
        });

        await expect(page).toHaveURL("https://thinking-tester-contact-list.herokuapp.com/contactList");
        await page.context().storageState({path: "./data/auth/user-cookies.json"});
    })
    
})