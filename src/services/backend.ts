import { CustomerResponse } from "@/models/response/customerResponse";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";
export class Backend {
	private static instance: Backend | undefined;
	private implementation: PagePayServiceable;
	private constructor() {
		this.implementation = new PagePayBemPaggo();
	}
	public getImplementation(): PagePayServiceable {
		return this.implementation;
	}
	public setImplementation(implementation: PagePayServiceable) {
		this.implementation = implementation;
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
    getCustomer(): CustomerResponse;
}


class PagePayBemPaggo implements PagePayServiceable {
	getPaymentPage(companyId: number): PaymentPageResponse {
		console.log(companyId);
		throw new Error("Method not implemented.");
	}
}
class CustomerBemPaggo implements CustomerServiceable {
	getCustomer(): CustomerResponse {
		throw new Error("Method not implemented.");
	}
}