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
			const implementation = this.getImplementation();
			this.instance = new Backend(implementation);
			return this.instance;
		} else {
			return this.instance;
		}
	}
	public static getImplementation(): BackendImplementable {
		if (import.meta.env.VITE_APP_BACK_END_CLASS == "BackendImplementationMock") {
			return new BackendImplementationMock();
		} else {
			return new BackendImplementationBemPaggo();
		}
	}

}
