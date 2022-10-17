import { describe,expect, test } from "vitest";
import { verifyCard } from "../helpers/verifyCard";

describe("cardBrand",()=>{
	test("cardBrandValidationOk", () => {
		const cardNumber = "5103 7961 5951 6408"; //bandeira: Mastercard
        
		expect(verifyCard(cardNumber)).toBe(true);
	});
    
	test("cardBrandValidationFail", () => {
		const cardNumber = "5059 7880 1234 8420"; //bandeira: Aura
        
		expect(verifyCard(cardNumber)).toBe(false);
	});
});

