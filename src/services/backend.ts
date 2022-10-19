import { AddressRequest } from "@/models/request/addressRequest";
import { CardRequest } from "@/models/request/cardRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerResponse } from "../models/response/customerResponse";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
export class Backend {
	private static instance: Backend | undefined;
	private implementation: PagePayServiceable;
	private customerImplementation: CustomerServiceable;
	private addressImplementation: AddressServiceable;
	private cardImplementation: CardServiceable;
	private paymentImplementation: PaymentServiceable;
	private constructor() {
		this.implementation = new PagePayBemPaggo();
		this.customerImplementation = new CustomerBemPaggo();
		this.addressImplementation = new AddressBemPaggo();
		this.cardImplementation = new CardBemPaggo();
		this.paymentImplementation = new PaymentBemPaggo();
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
	public getPaymentImplementation(): PaymentServiceable {
		return this.paymentImplementation;
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
	public setPaymentImplementation(paymentImplementation: PaymentServiceable) {
		this.paymentImplementation = paymentImplementation;
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
    getPaymentPage(companyId: number): Promise<PaymentPageResponse>;
}
export interface CustomerServiceable {
	createCustomer(customerState: CustomerRequest): Promise<CustomerRequest>;
    getCustomer(): Promise<CustomerResponse>;
	putCustomer(customer: CustomerResponse ): Promise<CustomerResponse>;
}
export interface AddressServiceable {
	createAddress(addressState: AddressResponse, customerId:number): Promise<AddressResponse>;
    getAddress(customerId:number): Promise<AddressResponse>;
}
export interface CardServiceable {
	createCard(cardState: CardRequest, customerId:number): Promise<CardRequest>;
    getCard(url:string): Promise<CardResponse>;
}
export interface PaymentServiceable {
	createPayment(paymentState: SaleRequest): Promise<SaleRequest>;
}

class PagePayBemPaggo implements PagePayServiceable {
	async getPaymentPage(companyId: number): Promise<PaymentPageResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays`;         
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				const paymentPage = await response.json();
				return paymentPage;
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch(error) {
			throw new Error("erro na requisição");
		} 
	}
}
class CustomerBemPaggo implements CustomerServiceable {
	async createCustomer(customerState: CustomerRequest): Promise<CustomerRequest> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/new`;         
		try {
			const data = await fetch(url, { method: "POST", body: JSON.stringify({ customerState }) });
			if (data.ok) {
				return await data.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch(error) {
			throw new Error("erro na requisição");
		}}
	async getCustomer(): Promise<CustomerResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer`;
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch(error) {
			throw new Error("erro na requisição");
		}
	}
	public async putCustomer(customer: CustomerResponse):Promise<CustomerResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customer.id}`;
		try {
			const data = await fetch(url, { method: "PUT", body: JSON.stringify({ customer }) });
			if (data.ok) {
				return await data.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
}

class AddressBemPaggo implements AddressServiceable {
	async getAddress(customerId:number): Promise<AddressResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/customer/${customerId}/bestAddress`;        
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch(error) {
			throw new Error("erro na requisição");
		}
	}
	async createAddress(addressState: AddressResponse, customerId:number): Promise<AddressResponse>{
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/customer/${customerId}/address/new`;        
		try {
			const data = await fetch(url, { method: "POST", body: JSON.stringify({ addressState }) });
			if (data.ok) {
				return await data.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch(error) {
			throw new Error("erro na requisição");
		} 
	}
	public async putAddress(customerId: number, address: AddressRequest) {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/customer/${customerId}/address/update`;
		try {
			const data = await fetch(url, { method: "PUT", body: JSON.stringify({ address }) });
			if (data.ok) {
				return await data.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			return Error(error);
		}
	}
}
class CardBemPaggo implements CardServiceable {
	async createCard(cardState: CardRequest, customerId: number): Promise<CardRequest> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customerId}/card`;        
		try {
			const data = await fetch(url, { method: "POST", body: JSON.stringify({ cardState }) });
			if (data.ok) {
				return await data.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch(error) {
			throw new Error("erro na requisição");
		}
	}
	async getCard(url:string): Promise<CardResponse> {
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch(error) {
			throw new Error("erro na requisição");
		}
	}
    
}

class PaymentBemPaggo implements PaymentServiceable {
	async createPayment(paymentState: SaleRequest): Promise<SaleRequest> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays`;        
		try {
			const data = await fetch(url, { method: "POST", body: JSON.stringify({ paymentState }) });
			if (data.ok) {
				return await data.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch(error) {
			throw new Error("erro na requisição");
		}
	}
    
}

