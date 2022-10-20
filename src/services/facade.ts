import { CardRequest } from "@/models/request/cardRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerResponse } from "@/models/response/customerResponse";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";
import { AddressBemPaggo, CardBemPaggo, CustomerBemPaggo, PagePayBemPaggo, PaymentBemPaggo } from "./pagepayServices";

export interface PagePayServiceable {
    getPaymentPage(companyId: number): Promise<PaymentPageResponse>;
}
export interface CustomerServiceable {
	getCustomerId(arg0: string): Promise<import("../models/response/customerMinimalResponse").CustomerMinimalResponse>;
    createCustomer(customerState: CustomerRequest): Promise<CustomerResponse>;
    getCustomer(): Promise<CustomerResponse>;
    putCustomer(customer: CustomerResponse): Promise<CustomerResponse>;
}
export interface AddressServiceable {
    createAddress(addressState: AddressResponse, customerId: number): Promise<AddressResponse>;
    getAddress(customerId: number): Promise<AddressResponse>;
}
export interface CardServiceable {
    createCard(cardState: CardRequest, customerId: number): Promise<CardRequest>;
    getCard(url: string): Promise<CardResponse>;
}
export interface PaymentServiceable {
    createPayment(paymentState: SaleRequest): Promise<SaleRequest>;
}

export interface BackendImplementable {
    getPaymentImplementation(): PaymentServiceable;
    getCardImplementation(): CardServiceable;
    getAddressImplementation(): AddressServiceable;
    getPagePayImplementation(): PagePayServiceable;
    getCustomerImplementation(): CustomerServiceable;

}

