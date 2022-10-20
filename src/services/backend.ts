import { BackendImplementationMock } from "../mocks/pagepayMock";
import { BackendImplementationBemPaggo } from "./BackendImplementationBemPaggo";
import { AddressServiceable, BackendImplementable, CardServiceable, CustomerServiceable, PagePayServiceable, PaymentServiceable } from "./facade";
export class Backend {
	private static instance: Backend | undefined;
	private implementation: BackendImplementable;
	private constructor(implementation: BackendImplementable) {
		this.implementation = implementation;
	}
	public getPagePayImplementation(): PagePayServiceable {
		return this.implementation.getPagePayImplementation();
	}
	public getCustomerImplementation(): CustomerServiceable {
		return this.implementation.getCustomerImplementation();
	}
	public getAddressImplementation(): AddressServiceable {
		return this.implementation.getAddressImplementation();
	}
	public getCardImplementation(): CardServiceable {
		return this.implementation.getCardImplementation();
	}
	public getPaymentImplementation(): PaymentServiceable {
		return this.implementation.getPaymentImplementation();
	}
	public static getInstance(): Backend {
		if (!this.instance) {
			this.instance = new Backend(new BackendImplementationMock());
			return this.instance;
		} else {
			return this.instance;
		}
	}
}
