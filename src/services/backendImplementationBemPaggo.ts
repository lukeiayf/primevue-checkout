import { AddressServiceable, BackendImplementable, CardServiceable, CustomerServiceable, PagePayServiceable, PaymentServiceable } from "./facade";
import { AddressBemPaggo, CardBemPaggo, CustomerBemPaggo, PagePayBemPaggo, PaymentBemPaggo } from "./pagepayServices";

export class BackendImplementationBemPaggo implements BackendImplementable{
    getPaymentImplementation(): PaymentServiceable {
		return new PaymentBemPaggo();
	}
	getCardImplementation(): CardServiceable {
		return new CardBemPaggo();
	}
	getAddressImplementation(): AddressServiceable {
		return new AddressBemPaggo();
	}
	getPagePayImplementation(): PagePayServiceable {
		return new PagePayBemPaggo();
	}
	getCustomerImplementation(): CustomerServiceable {
		return new CustomerBemPaggo();
	}
}