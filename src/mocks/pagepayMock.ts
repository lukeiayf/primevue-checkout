
import { CardRequest } from "@/models/request/cardRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerResponse } from "../models/response/customerResponse";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { AddressServiceable, CardServiceable, CustomerServiceable, PagePayServiceable, PaymentServiceable } from "../services/backend";
export class PagePayMock implements PagePayServiceable {
	getPaymentPage(companyId: number): Promise<PaymentPageResponse> {
		const obj = {
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
		return new Promise((resolve) => resolve(obj));	
	}
}

export class CustomerMock implements CustomerServiceable {
	createCustomer(customerState: CustomerRequest): Promise<CustomerRequest> {
		return new Promise((resolve) => resolve(customerState));
	}
	getCustomer(): Promise<CustomerResponse> {
		const customer = {
			id: 1,
			name: "customer name",
			cpf: "1009532345",
			email: "teste@teste.com",
			birthdate: 121019914,
			phone: "23453212"
		};
		return new Promise((resolve) => resolve(customer));
	}
	putCustomer(customer: CustomerResponse): Promise<CustomerResponse>{
		const updatedCustomer = {
			...customer,
			name: "new customer name"
		};
		return new Promise((resolve)=>resolve(updatedCustomer));
	}
}

export class AddressMock implements AddressServiceable {
	getAddress(customerId:number): Promise<AddressResponse> {
		console.log(customerId);
		const address = {
			street: "Rua 1",
			number: "1",
			lineTwo: "apto 1",
			zipCode: "84010010",
			city: "Ponta Grossa",
			state: "Paraná"
		};
		return new Promise((resolve) => resolve(address));
	}
	createAddress(addressState: AddressResponse, customerId:number): Promise<AddressResponse> {
		console.log(customerId);
		return new Promise((resolve) => resolve(addressState));
	}

}
export class CardMock implements CardServiceable {
	createCard(cardState: CardRequest, customerId:number): Promise<CardRequest> {
		console.log(customerId);
		return new Promise((resolve)=>resolve(cardState));
	}
	getCard(url:string): Promise<CardResponse> {
		console.log(url);
		return new Promise((resolve) => resolve({
			profileId: 1
		}));
	}

}
export class PaymentMock implements PaymentServiceable {
	createPayment(paymentState: SaleRequest): Promise<SaleRequest> {
		return new Promise((resolve)=>resolve(paymentState));
	}

}