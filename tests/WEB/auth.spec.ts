import { test, expect } from '@playwright/test';
import { authPages } from '../../src/pages/auth.pages';
require('dotenv').config();

const email = process.env.EMAIL as string
const password = process.env.PASSWORD as string


test.describe('Register', async() => {
    test('Register - with empty first name', async ({page}) => {
        const authpages = new authPages(page);
        await page.goto('/')

        await authpages.register({
            firstname : ""
        });

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('User validation failed')
    })

    test('Register - with empty last name', async ({page}) => {
        const authpages = new authPages(page);
        await page.goto('/')

        await authpages.register({
            lastname : ""
        });

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('User validation failed')
    })

    test('Register - with empty email', async ({page}) => {
        const authpages = new authPages(page);
        await page.goto('/')

        await authpages.register({
            email : ""
        });

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('User validation failed')
    })

    test('Register - with invalid format email', async ({page}) => {
        const authpages = new authPages(page);
        await page.goto('/')

        await authpages.register({
            email : "asdasd"
        });

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('User validation failed')
    })

    test('Register - with empty password', async ({page}) => {
        const authpages = new authPages(page);
        await page.goto('/')

        await authpages.register({
            password : ""
        });

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText('User validation failed')
    })
})

test.describe('Login', async () => {

    test('Login - with invalid credential', async({page}) => {
        const authpages = new authPages(page);

        await page.goto('/')
        await authpages.login({
            email : "asdasd",
            password : "1234"
        });

        const errorElement = page.locator("//span[@id='error']");
        await expect(errorElement).toContainText("Incorrect username or password");
    })

    test('Login - with valid credential', async ({page}) => {
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