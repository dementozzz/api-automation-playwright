// @ts-check
import { test, expect } from '@playwright/test';
import { CreateContact } from '../helper/generate-user-helper'
import { validateJsonSchema } from '../helper/schema-helper';
require('dotenv').config();


test('add new contact', async ({ request }) => {
  
const body = await CreateContact({
    firstname : true,
    lastname : true,
    birthday : true,
    phone : true , 
    email : true,
    postalCode : true
  });

  const header = {
    'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
  }

  try {
    const res = await request.post('/contacts', 
    {
      data : body, 
      headers : header
    });
    
    expect(res.status()).toEqual(201);

    const json = await res.json();

    await validateJsonSchema("contact-add.json", json);
    console.log(json)
  } catch (error) {
    throw new Error(error)
  }
   
})

test('get contact list', async ({ request }) => {
  const header = {
    'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
  }

  try {
    const res = await request.get('/contacts', 
    {
      headers : header
    });

    expect(res.status()).toEqual(200);
    const json = await res.json();

    await validateJsonSchema("contact-get.json", json);
    console.log(json);
  } catch (error) {
    throw new Error(error)
  }
})

test('add new contact - with no authorization header', async ({ request }) => {
  
  const body = await CreateContact({
    firstname : true,
    lastname : true,
    birthday : true,
    phone : true , 
    email : true,
    postalCode : true
  });

  try {
    const res = await request.post('/contacts', 
    {
      data : body, 
    });
    const json = await res.json();
    console.log(json);

    expect(res.status()).toEqual(401);
    expect(json.error).toEqual("Please authenticate.")
    
  } catch (error) {
    throw new Error(error)
  }
   
})

test('add new contact - with no firstname', async ({ request }) => {
  
  const body = await CreateContact({
    firstname : false,
    lastname : true,
    birthday : true,
    phone : true , 
    email : true,
    postalCode : true
  });

  const header = {
    'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
  }

  try {
    const res = await request.post('/contacts', 
    {
      data : body, 
      headers : header
    });

    const json = await res.json();
    console.log(json);

    expect(res.status()).toEqual(400);
    
  } catch (error) {
    throw new Error(error)
  }
   
})

test('add new contact - with no lastname', async ({ request }) => {
  
  const body = await CreateContact({
    firstname : true,
    lastname : false,
    birthday : true,
    phone : true , 
    email : true,
    postalCode : true
  });

  const header = {
    'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
  }

  try {
    const res = await request.post('/contacts', 
    {
      data : body, 
      headers : header
    });
    
    const json = await res.json();
    console.log(json);

    expect(res.status()).toEqual(400);
    
  } catch (error) {
    throw new Error(error)
  }
   
})

test('add new contact - with no birthday', async ({ request }) => {
  
  const body = await CreateContact({
    firstname : true,
    lastname : true,
    birthday : false,
    phone : true , 
    email : true,
    postalCode : true
  });

  const header = {
    'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
  }

  try {
    const res = await request.post('/contacts', 
    {
      data : body, 
      headers : header
    });
    
    const json = await res.json();
    console.log(json);

    expect(res.status()).toEqual(400);
    
  } catch (error) {
    throw new Error(error)
  }
   
})

test('add new contact - with no phone number', async ({ request }) => {
  
  const body = await CreateContact({
    firstname : false,
    lastname : true,
    birthday : true,
    phone : false , 
    email : true,
    postalCode : true
  });

  const header = {
    'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
  }

  try {
    const res = await request.post('/contacts', 
    {
      data : body, 
      headers : header
    });
    
    const json = await res.json();
    console.log(json);

    expect(res.status()).toEqual(400);
    
  } catch (error) {
    throw new Error(error)
  }
   
})

test('add new contact - with no email', async ({ request }) => {
  
  const body = await CreateContact({
    firstname : true,
    lastname : true,
    birthday : true,
    phone : true , 
    email : false,
    postalCode : true
  });

  const header = {
    'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
  }

  try {
    const res = await request.post('/contacts', 
    {
      data : body, 
      headers : header
    });
    
    const json = await res.json();
    console.log(json);

    expect(res.status()).toEqual(400);
    
  } catch (error) {
    throw new Error(error)
  }
   
})

test('add new contact - with no postal code', async ({ request }) => {
  
  const body = await CreateContact({
    firstname : true,
    lastname : true,
    birthday : true,
    phone : true , 
    email : true,
    postalCode : false
  });

  const header = {
    'Authorization' : 'Bearer ' + process.env.ACCESS_TOKEN
  }

  try {
    const res = await request.post('/contacts', 
    {
      data : body, 
      headers : header
    });
    
    const json = await res.json();
    console.log(json);

    expect(res.status()).toEqual(400);
    
  } catch (error) {
    throw new Error(error)
  }
   
})

test('get contact list - with no authorization header', async ({ request }) => {

  try {
    const res = await request.get('/contacts');
    const json = await res.json();
    console.log(json);

    expect(res.status()).toEqual(401);
    expect(json.error).toEqual("Please authenticate.")

  } catch (error) {
    throw new Error(error)
  }
})