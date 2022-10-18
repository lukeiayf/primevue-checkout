import { ICustomerState } from "@/models/customerState.model";
import { CustomerResponse } from "../models/response/customerResponse";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { CustomerServiceable, PagePayServiceable } from "../services/backend";
export class PagePayMock implements PagePayServiceable {
	getPaymentPage(companyId: number): PaymentPageResponse {
		return {
			uuid: "90076629-34dc-4a26-a333-22fab585ff5d",
			image: "https://image.io/product.jpeg",
			installmentType: "CARD_INSTALLMENT",
			description: "Descrição",
			plan: {
				id: companyId,
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

export class CustomerMock implements CustomerServiceable {
	createCustomer(customerState: ICustomerState): void {
		console.log(customerState.username);
	}
	getCustomer(): CustomerResponse {
		return {
			id: 1,
			name: "customer name",
			cpf: "1009532345",
			email: "teste@teste.com",
			birthdate: 121019914,
			phone: "23453212"
		};
	};

};