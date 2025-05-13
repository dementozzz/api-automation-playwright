import { test, expect } from '@playwright/test';
require('dotenv').config();

test( 'login', async ({ request }) => {
    
    const body = {
        email : process.env.EMAIL,
        password : process.env.PASSWORD
    } 

    try {
        const res = await request.post('/users/login', {data : body});
              
        //*if response status is not 200, it will throw error and exit
        expect(res.status()).toEqual(200);

        //*save email, password, & updated token to .env file, replace existing file
        const json = await res.json();

        process.env.ACCESS_TOKEN = json.token
        console.log("MY TOKEN" + process.env.ACCESS_TOKEN)
                              
    } catch (error) {
        throw new Error(error);
    }   
})
