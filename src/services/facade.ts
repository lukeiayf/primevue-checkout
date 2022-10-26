import { AddressRequest } from "@/models/request/addressRequest";
import { CardRequest } from "@/models/request/cardRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { BrandsResponse } from "@/models/response/brandsResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerResponse } from "@/models/response/customerResponse";
import { PaymentInfoResponse } from "@/models/response/paymentInfoResponse";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";

export interface PagePayServiceable {
    getPaymentPage(companyId: number): Promise<PaymentPageResponse>;
}
export interface CustomerServiceable {
	getCustomerId(arg0: string): Promise<import("../models/response/customerMinimalResponse").CustomerMinimalResponse>;
    createCustomer(customerState: CustomerRequest): Promise<CustomerResponse>;
    getCustomer(): Promise<CustomerResponse>;
    putCustomer(customer: CustomerRequest, customerId: number): Promise<CustomerResponse>;
}
export interface AddressServiceable {
    createAddress(addressState: AddressRequest, customerId: number): Promise<AddressRequest>;
    getAddress(customerId: number): Promise<AddressResponse>;
}
export interface CardServiceable {
    createCard(cardState: CardRequest, customerId: number): Promise<string>;
    getCard(url: string): Promise<CardResponse>;
    getBrands(): Promise<BrandsResponse[]>
}
export interface PaymentServiceable {
    createPayment(paymentState: SaleRequest): Promise<string>;
    getPaymentInfo(url: string): Promise<PaymentInfoResponse>;
}

export interface BackendImplementable {
    getPaymentImplementation(): PaymentServiceable;
    getCardImplementation(): CardServiceable;
    getAddressImplementation(): AddressServiceable;
    getPagePayImplementation(): PagePayServiceable;
    getCustomerImplementation(): CustomerServiceable;

}

