/* eslint-disable @typescript-eslint/no-unused-vars */

import { AddressRequest } from "@/models/request/addressRequest";
import { CardRequest } from "@/models/request/cardRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerMinimalResponse } from "@/models/response/customerMinimalResponse";
import { PaymentInfoResponse } from "@/models/response/paymentInfoResponse";
import { CustomerResponse } from "../models/response/customerResponse";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { AddressServiceable, BackendImplementable, CardServiceable, CustomerServiceable, PagePayServiceable, PaymentServiceable } from "../services/facade";
export class PagePayMock implements PagePayServiceable {
	getPaymentPage(companyId: number): Promise<PaymentPageResponse> {
		const obj = {
			uuid: "90076629-34dc-4a26-a333-22fab585ff5d",
			image: "https://www.cupcom.com.br/wp-content/uploads/2020/10/IMAGENS-SITEuv-vuejs.jpg",
			installmentType: "CARD_INSTALLMENT",
			description: "Descrição",
			plan: {
				id: companyId,
				name: "Plano Pro",
				maxInstallments: 4,
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
	createCustomer(companyId:number, customerState: CustomerRequest): Promise<CustomerResponse> {
		const customerResponse: CustomerResponse = {
			...customerState,
			id: 2
		};
		return new Promise((resolve) => resolve(customerResponse));
	}
	getCustomer(companyId: number, uuid: string): Promise<CustomerResponse> {
		const customer = {
			id: 1,
			name: "customer name",
			cpf: "10095323678",
			email: "teste@teste.com",
			birthdate: 121019914,
			phone: "23453212"
		};
		return new Promise((resolve) => resolve(customer));
	}
	putCustomer(customer: CustomerRequest, companyId:number, customerId: number): Promise<CustomerResponse>{
		const updatedCustomer = {
			...customer,
			id: customerId,
			name: "new customer name"
		};
		return new Promise((resolve)=>resolve(updatedCustomer));
	}
	getCustomerId(companyId:number, customerDocument: string): Promise<CustomerMinimalResponse>{
		const customer = {
			customerId: 1,
		};
		return new Promise((resolve) => resolve(customer));
	}
}

export class AddressMock implements AddressServiceable {
	getAddress(companyId:number, customerId:number): Promise<AddressResponse> {
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
	createAddress(addressState: AddressRequest, companyId:number, customerId:number): Promise<AddressResponse> {
		return new Promise((resolve) => resolve(addressState));
	}

}
export class CardMock implements CardServiceable {
	createCard(cardState: CardRequest, companyId: number, customerId: number): Promise<string> {
		return new Promise((resolve)=>resolve("urlMock"));
	}
	getCard(url:string): Promise<CardResponse> {
		return new Promise((resolve) => resolve({
			profileId: 1
		}));
	}

}

export class PaymentMock implements PaymentServiceable {
	createPayment(paymentState: SaleRequest, companyId: number, uuid: string): Promise<string> {
		return new Promise((resolve)=>resolve("urlMock"));
	}
	getPaymentInfo(url: string): Promise<PaymentInfoResponse> {
		const paymentInfo: PaymentInfoResponse = {
			code: "1235465421646545121",
			date: 1665168260
		};
		return new Promise((resolve) => resolve(paymentInfo));
	}

}
export class BackendImplementationMock implements BackendImplementable {
	getPaymentImplementation(): PaymentServiceable {
		return new PaymentMock();
	}
	getCardImplementation(): CardServiceable {
		return new CardMock();
	}
	getAddressImplementation(): AddressServiceable {
		return new AddressMock();
	}
	getPagePayImplementation(): PagePayServiceable {
		return new PagePayMock();
	}
	getCustomerImplementation(): CustomerServiceable {
		return new CustomerMock();
	}

}