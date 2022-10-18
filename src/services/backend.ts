import { ICustomerState } from "@/models/customerState.model";
import { CardRequest } from "@/models/request/cardRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { CustomerResponse } from "../models/response/customerResponse";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
export class Backend {
	private static instance: Backend | undefined;
	private implementation: PagePayServiceable;
	private customerImplementation: CustomerServiceable;
    private addressImplementation: AddressServiceable;
    private cardImplementation: CardServiceable;
	private constructor() {
		this.implementation = new PagePayBemPaggo();
		this.customerImplementation = new CustomerBemPaggo();
        this.addressImplementation = new AddressBemPaggo();
        this.cardImplementation = new CardBemPaggo();
	}
	public getImplementation(): PagePayServiceable {
		return this.implementation;
	}
	public getCustomerImplementation(): CustomerServiceable {
		return this.customerImplementation;
	}
	public getAddressImplementation(): AddressServiceable {
		return this.addressImplementation;
	}
	public getCardImplementation(): CardServiceable {
		return this.cardImplementation;
	}
	public setImplementation(implementation: PagePayServiceable) {
		this.implementation = implementation;
	}
	public setCustomerImplementation(customerImplementation: CustomerServiceable) {
		this.customerImplementation = customerImplementation;
	}
	public setAddressImplementation(addressImplementation: AddressServiceable) {
		this.addressImplementation = addressImplementation;
	}
	public setCardImplementation(cardImplementation: CardServiceable) {
		this.cardImplementation = cardImplementation;
	}
	public static getInstance(): Backend {
		if (!this.instance) {
			this.instance = new Backend();
			return this.instance;
		} else {
			return this.instance;
		}
	}
}
export interface PagePayServiceable {
    getPaymentPage(companyId: number): PaymentPageResponse;
}
export interface CustomerServiceable {
	createCustomer(customerState: CustomerResponse): CustomerResponse;
    getCustomer(): CustomerResponse;
}
export interface AddressServiceable {
	createAddress(addressState: AddressResponse): AddressResponse;
    getAddress(): AddressResponse;
}
export interface CardServiceable {
	createCard(cardState: CardRequest): CardRequest;
    getCard(): number;
}

class PagePayBemPaggo implements PagePayServiceable {
	getPaymentPage(companyId: number): PaymentPageResponse {
		throw new Error(`${companyId}`);
	}

}
class CustomerBemPaggo implements CustomerServiceable {
	createCustomer(customerState: CustomerResponse): any {
		throw new Error(customerState.name);
	}
	getCustomer(): CustomerResponse {
		throw new Error();
	}
}

class AddressBemPaggo implements AddressServiceable {
    getAddress(): AddressResponse {
        throw new Error("Method not implemented.");
    }
    createAddress(addressState: AddressResponse): any{
        throw new Error("Method not implemented.");
    }
}
class CardBemPaggo implements CardServiceable {
    createCard(cardState: CardRequest): CardRequest {
        throw new Error("Method not implemented.");
    }
    getCard(): number {
        throw new Error("Method not implemented.");
    }
    
}

