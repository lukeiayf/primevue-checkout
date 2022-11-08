export class CardRequest{
	cardBrand: string;
	cardNumber: string;
	holderDocument: string;
	holderName: string;
	expirationDate: number;
	securityCode?: number;
}