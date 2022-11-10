import { AddressRequest } from "@/models/request/addressRequest";
import { CardRequest } from "@/models/request/cardRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { BrandsResponse } from "@/models/response/brandsResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerMinimalResponse } from "@/models/response/customerMinimalResponse";
import { CustomerResponse } from "@/models/response/customerResponse";
import { PaymentInfoResponse } from "@/models/response/paymentInfoResponse";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";
import { TransactionResponse } from "@/models/response/transactionResponse";
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
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
}
export class CustomerBemPaggo implements CustomerServiceable {
	async getCustomerId(companyId: number, customerDocument: string): Promise<any> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/customers/document/${customerDocument.replace(/[^\d]+/g, "")}`;
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				return "";
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
	async createCustomer(companyId: number, customerState: CustomerRequest): Promise<any> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/customers`;
		try {
			const data = await fetch(url, { method: "POST", headers: {
				"Content-Type": "application/json"
			}, body: JSON.stringify(customerState) });
			if (data.ok) {
				return await data;
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
	async getCustomer(companyId: number, uuid: string): Promise<CustomerResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/${uuid}/customer`;
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}

	public async putCustomer(customer: CustomerRequest, companyId: number, customerId: number): Promise<any> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/customers/${customerId}`;

		const data = await fetch(url, {
			method: "PUT", headers: {
				"Content-Type": "application/json"
			}, body: JSON.stringify(customer)
		});
		if (data.status == 200) {
			console.log("if");
			return await data;
		} else {
			console.log("else");
			throw new Error("erro no status da requisição");
		}
	}
}

export class AddressBemPaggo implements AddressServiceable {
	async getAddress(companyId: number, customerId: number): Promise<AddressResponse> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/customers/${customerId}/bestAddress`;
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
	async createAddress(addressState: AddressRequest, companyId: number, customerId: number): Promise<any> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/customers/${customerId}/address`;
		try {
			const data = await fetch(url, { method: "POST", headers: {
				"Content-Type": "application/json"
			}, body: JSON.stringify(addressState) });
			if (data.ok) {
				return data;
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
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
	async getBrands(companyId: number, uuid: string): Promise<BrandsResponse[]> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/${uuid}/brands`;
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
	async createCard(cardState: CardRequest, companyId: number, customerId: number): Promise<string> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/customers/${customerId}/credit/card`;
		try {
			const data = await fetch(url, { method: "POST", headers: {
				"Content-Type": "application/json"
			}, body: JSON.stringify(cardState)});
			if (data.ok) {
				const location = data.headers.get("Location");
				return location;
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
	async getCard(url: string): Promise<CardResponse> {
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}

}

export class PaymentBemPaggo implements PaymentServiceable {
	async getTransaction(location: string): Promise<TransactionResponse> {
		try {
			const response = await fetch(location, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
	async getPaymentInfo(url: string): Promise<PaymentInfoResponse> {
		try {
			const response = await fetch(url, { method: "GET" });
			if (response.ok) {
				return await response.json();
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
	async createPaymentPix(paymentState: SaleRequest, companyId: number, uuid: string): Promise<string> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/${uuid}/pix`;
		try {
			const data = await fetch(url, { method: "POST", headers: {
				"Content-Type": "application/json"
			}, body: JSON.stringify(paymentState) });
			if (data.ok) {
				return await data.headers.get("Location");
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
	async createPaymentCreditCard(paymentState: SaleRequest, companyId: number, uuid: string): Promise<string> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/${uuid}/credit/card`;
		try {
			const data = await fetch(url, { method: "POST", headers: {
				"Content-Type": "application/json"
			}, body: JSON.stringify(paymentState) });
			if (data.ok) {
				return await data.headers.get("Location");
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}
	async createPaymentBankSlip(paymentState: SaleRequest, companyId: number, uuid: string): Promise<string> {
		const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays/${uuid}/bank/slip`;
		try {
			const data = await fetch(url, { method: "POST",headers: {
				"Content-Type": "application/json"
			}, body: JSON.stringify(paymentState) });
			if (data.ok) {
				return await data.headers.get("Location");
			} else {
				throw new Error("erro no status da requisição");
			}
		} catch (error) {
			throw new Error("erro na requisição");
		}
	}

}