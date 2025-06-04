import { expect } from "@playwright/test";
import Ajv from "ajv";

export async function validateJsonSchema(filename : string, body : object) {
    const schema = require('../src/schema/' + filename);

    const ajv = new Ajv({ allErrors: false });
    const validate = ajv.compile(schema);
    const validRes = validate(body);

    if (!validRes) {
        console.log("SCHEMA ERRORS:", JSON.stringify(validate.errors), "\nRESPONSE BODY:", JSON.stringify(body));
	}

    expect(validRes).toBe(true);
}