export interface PaymentMethod {
    name: string,
    value: string,
    message?: string,
}



export const paymentMethods: PaymentMethod[] = [
	{
		name: "Cartão de crédito",
		value: "CREDIT_CARD"
	},
	{
		name: "Boleto",
		value: "BANK_SLIP"
	},
	{
		name: "Pix",
		value: "PIX"
	}
];