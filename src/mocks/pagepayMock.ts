import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { PagePayServiceable } from "../services/backend";
export class PagePayMock implements PagePayServiceable {
	getPaymentPage(companyId: number): PaymentPageResponse {
		console.log(companyId);
		return {
			uuid: "90076629-34dc-4a26-a333-22fab585ff5d",
			image: "https://image.io/product.jpeg",
			installmentType: "CARD_INSTALLMENT",
			description: "Descrição",
			plan: {
				id: 1,
				name: "Plano Pro",
				maxInstallments: 1,
				accessionValue: 1,
				value: 10.50,
				frequency: "MONTHLY",
				trialDays: 15
			},
			loose: {
				value: 10.50,
				maxInstallments: 2
			},
			paymentMethods: [
				"CREDIT_CARD",
				"PIX",
				"BANKSLIP"
			],
			affiliate: {
				id: 1,
				name: "netflix",
				businessName: "netflix nome"
			}
		};
	}
}