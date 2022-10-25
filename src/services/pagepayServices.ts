import { AddressRequest } from "@/models/request/addressRequest";
import { CardRequest } from "@/models/request/cardRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerMinimalResponse } from "@/models/response/customerMinimalResponse";
import { CustomerResponse } from "@/models/response/customerResponse";
import { PaymentInfoResponse } from "@/models/response/paymentInfoResponse";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";
import { AddressServiceable, CardServiceable, CustomerServiceable, PagePayServiceable, PaymentServiceable } from "./facade";

export class PagePayBemPaggo implements PagePayServiceable {
	async getPaymentPage(companyId: number, uuid: string): Promise<PaymentPageResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/${uuid}`;         
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
	async getCustomerId(companyId:number, customerDocument: string): Promise<CustomerMinimalResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/document/${customerDocument}`;
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
	async createCustomer(companyId:number, customerState: CustomerRequest): Promise<CustomerResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/customer/new`;         
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
	async getCustomer(companyId: number, uuid: string): Promise<CustomerResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/${uuid}/customer`;
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
	
	public async putCustomer(customer: CustomerRequest, companyId:number, customerId: number):Promise<CustomerResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/customer/${customerId}`;
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
	async getAddress(companyId:number, customerId:number): Promise<AddressResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/customers/${customerId}/bestAddress`;        
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
	async createAddress(addressState: AddressRequest, companyId:number, customerId:number): Promise<AddressRequest>{
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/customers/${customerId}/address/new`;        
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
	async createCard(cardState: CardRequest,companyId:number, customerId: number): Promise<string> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/customers/${customerId}/card`;        
		try {
			const data = await fetch(url, { method: "POST", body: JSON.stringify({ cardState }) });
			if (data.ok) {
				const location = data.headers.get("Location");
				return location;
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
	async getPaymentInfo(url: string): Promise<PaymentInfoResponse> {
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
	async createPayment(paymentState: SaleRequest, companyId:number, uuid:string): Promise<string> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/${uuid}`;        
		try {
			const data = await fetch(url, { method: "POST", body: JSON.stringify({ paymentState }) });
			if (data.ok) {
				return await data.headers.get("Location");
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch(error) {
			throw new Error("erro na requisição");
		}
	}
    
}