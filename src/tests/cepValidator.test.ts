import { describe, expect, test } from "vitest";
import { validateCep, cepReturn } from "../helpers/cepValidator";

describe("cep", () => {
	test("cepValidationOK", async () => {
		const cep = "31570120";
        
		await validateCep(cep).then((data) => expect({...data}).toHaveProperty("state"));
		await validateCep(cep).then((data) => expect({...data}).toHaveProperty("cep"));
		await validateCep(cep).then((data) => expect({...data}).toHaveProperty("city"));
		await validateCep(cep).then((data) => expect({...data}).toHaveProperty("neighborhood"));
		await validateCep(cep).then((data) => expect({...data}).toHaveProperty("street"));
		await validateCep(cep).then((data) => expect({...data}).toHaveProperty("service"));
	});  
});
