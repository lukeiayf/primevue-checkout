import { ICustomerState } from "@/models/customerState.model";
import { CustomerResponse } from "../models/response/customerResponse";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
export class Backend {
	private static instance: Backend | undefined;
	private implementation: PagePayServiceable;
	private customerImplementation: CustomerServiceable;
	private constructor() {
		this.implementation = new PagePayBemPaggo();
		this.customerImplementation = new CustomerBemPaggo();
	}
	public getImplementation(): PagePayServiceable {
		return this.implementation;
	}
	public getCustomerImplementation(): CustomerServiceable {
		return this.customerImplementation;
	}
	public setImplementation(implementation: PagePayServiceable) {
		this.implementation = implementation;
	}
	public setCustomerImplementation(customerImplementation: CustomerServiceable) {
		this.customerImplementation = customerImplementation;
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
	createCustomer(customerState: ICustomerState): void;
    getCustomer(): CustomerResponse;
}

class PagePayBemPaggo implements PagePayServiceable {
	getPaymentPage(companyId: number): PaymentPageResponse {
		throw new Error(`${companyId}`);
	}

}
class CustomerBemPaggo implements CustomerServiceable {
	createCustomer(customerState: ICustomerState): void {
		throw new Error(customerState.username);
	}
	getCustomer(): CustomerResponse {
		throw new Error();
	}
}

