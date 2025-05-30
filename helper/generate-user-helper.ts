import { faker } from '@faker-js/faker';

export async function GenerateBirthdate(){
    let start = new Date(1980, 12, 10);
    let end = new Date(2010, 12, 10);
    var d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
    let month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
    let finalDate = year + '-'+ month +'-'+ day ;
    return finalDate;
}

export async function GenerateEmail(firstname : string, lastname : string){
    let email = firstname + lastname + "@gmail.com"
    return email
}

export async function CreateContact(
    obj : {
        firstname?: string, 
        lastname?: string, 
        birthday?: string, 
        phone?: string, 
        email?: string, 
        postalCode?: string
    }){

    let firstName = 
        typeof obj.firstname != "undefined" ? obj.firstname == "<generate>" ? faker.person.firstName() 
        : obj.firstname
        : faker.person.firstName();

    let lastname = 
        typeof obj.lastname != "undefined" ? obj.lastname == "<generate>" ? faker.person.lastName() 
        : obj.lastname
        : faker.person.lastName();

    let birthDate = 
        typeof obj.birthday != "undefined" ? obj.birthday == "<generate>" ? await GenerateBirthdate() 
        : obj.birthday
        : await GenerateBirthdate() ;

    let email = 
        typeof obj.email != "undefined" ? obj.email == "<generate>" ? await GenerateEmail(firstName, lastname) 
        : obj.email
        : await GenerateEmail(firstName, lastname);

    let phoneNumber = 
        typeof obj.phone != "undefined" ? obj.phone == "<generate>" ? faker.phone.number({style : 'international'}) 
        : obj.phone
        : faker.phone.number({style : 'international'});

    let postalCode = 
        typeof obj.postalCode != "undefined" ? obj.postalCode == "<generate>" ? faker.location.zipCode()  
        : obj.postalCode
        : faker.location.zipCode() ;

    return{
        firstName : firstName,
        lastName : lastname,
        birthdate : birthDate,
        email : email,
        phone : phoneNumber,
        street1 : faker.location.streetAddress(false),
        street2 : faker.location.streetAddress(false),
        city : faker.location.city(),
        stateProvince : faker.location.state(),
        postalCode : postalCode,
        country : faker.location.country()
    }
}