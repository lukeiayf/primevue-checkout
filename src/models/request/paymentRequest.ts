export class SaleRequest{
	uuid: string;
	customerId: number;
	paymentType: string;
	installments: number;
	profileId?: number;
}