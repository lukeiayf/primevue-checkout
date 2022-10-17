export class PaymentRequest{
	uuid: string;
	customerId: number;
	paymentType: string;
	installments: number;
	profileId?: number;
}