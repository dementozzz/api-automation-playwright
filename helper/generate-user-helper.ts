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
        firstname: boolean, 
        lastname: boolean, 
        birthday: boolean, 
        phone : boolean, 
        email : boolean, 
        postalCode : boolean
    }){

    let firstName = obj.firstname ? faker.person.firstName() : "";
    let lastname = obj.lastname? faker.person.lastName() : "";

    let birthDate = obj.birthday? await GenerateBirthdate() : "";
    let email = obj.email? await GenerateEmail(firstName, lastname) : "";
    let phoneNumber = obj.phone? faker.phone.number({style : 'international'}) : ""
    let postalCode = obj.postalCode? faker.location.zipCode() : ""

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

export async function test(){
    // fs.readFile('data.ndjson', 'utf8', (err, data) => {
    //     if (err) {
    //       console.error('Error reading file:', err);
    //       return;
    //     }
      
    //     // Split by newlines to separate each JSON object
    //     const lines = data.split('\n').filter(line => line.trim() !== '');
      
    //     // Parse each line as a separate JSON object
    //     const parsedData = lines.map(line => {
    //       try {
    //         return JSON.parse(line);
    //       } catch (err) {
    //         console.error('Error parsing line:', line, err);
    //         return null;
    //       }
    //     }).filter(Boolean); // Remove any failed parses
      
    //     // Log the results
    //     console.log(parsedData); // Array of objects
    //     parsedData.forEach(person => {
    //       console.log(`${person.firstName} ${person.lastName}`);
    //     });
    // });
}