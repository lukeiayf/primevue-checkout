import { AddressRequest } from "@/models/request/addressRequest";
import { CardRequest } from "@/models/request/cardRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerMinimalResponse } from "@/models/response/customerMinimalResponse";
import { CustomerResponse } from "@/models/response/customerResponse";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";
import { AddressServiceable, CardServiceable, CustomerServiceable, PagePayServiceable, PaymentServiceable } from "./facade";

export class PagePayBemPaggo implements PagePayServiceable {
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
export class CustomerBemPaggo implements CustomerServiceable {
	async getCustomerId(document: string): Promise<CustomerMinimalResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/document/${document}`;
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
	async createCustomer(customerState: CustomerRequest): Promise<CustomerResponse> {
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
	
	public async putCustomer(customer: CustomerRequest, customerId: number):Promise<CustomerResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customerId}`;
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

export class AddressBemPaggo implements AddressServiceable {
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
	async createAddress(addressState: AddressRequest, customerId:number): Promise<AddressRequest>{
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
export class CardBemPaggo implements CardServiceable {
	async createCard(cardState: CardRequest, customerId: number): Promise<CardRequest> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customerId}/card`;        
		try {
			const data = await fetch(url, { method: "POST", body: JSON.stringify({ cardState }) });
			if (data.ok) {
				data.headers.get("Location");
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

export class PaymentBemPaggo implements PaymentServiceable {
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