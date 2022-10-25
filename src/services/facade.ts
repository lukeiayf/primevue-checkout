import { AddressRequest } from "@/models/request/addressRequest";
import { CardRequest } from "@/models/request/cardRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerResponse } from "@/models/response/customerResponse";
import { PaymentInfoResponse } from "@/models/response/paymentInfoResponse";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";
import { CustomerMinimalResponse } from "@/models/response/customerMinimalResponse";

export interface PagePayServiceable {
    getPaymentPage(companyId: number, uuid: string): Promise<PaymentPageResponse>;
}
export interface CustomerServiceable {
	getCustomerId(companyId: number, customerDocument: string): Promise<CustomerMinimalResponse>;
    createCustomer(companyId: number, customerState: CustomerRequest): Promise<CustomerResponse>;
    getCustomer(companyId: number, uuid: string): Promise<CustomerResponse>;
    putCustomer(customer: CustomerRequest, companyId:number, customerId: number): Promise<CustomerResponse>;
}
export interface AddressServiceable {
    createAddress(addressState: AddressRequest, companyId:number, customerId: number): Promise<AddressRequest>;
    getAddress(companyId:number, customerId: number): Promise<AddressResponse>;
}
export interface CardServiceable {
    createCard(cardState: CardRequest, companyId:number, customerId: number): Promise<string>;
    getCard(url: string): Promise<CardResponse>;
}
export interface PaymentServiceable {
    createPayment(paymentState: SaleRequest, companyId: number, uuid: string): Promise<string>;
    getPaymentInfo(url: string): Promise<PaymentInfoResponse>;
}

export interface BackendImplementable {
    getPaymentImplementation(): PaymentServiceable;
    getCardImplementation(): CardServiceable;
    getAddressImplementation(): AddressServiceable;
    getPagePayImplementation(): PagePayServiceable;
    getCustomerImplementation(): CustomerServiceable;

}

