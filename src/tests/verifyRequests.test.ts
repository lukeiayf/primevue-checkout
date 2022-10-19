import { CustomerResponse } from "../models/response/customerResponse";
import { describe, expect, test } from "vitest";
import { AddressMock, CardMock, CustomerMock, PagePayMock, PaymentMock } from "../mocks/pagepayMock";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { AddressResponse } from "../models/response/addressResponse";
import { Backend } from "../services/backend";
import { CardRequest } from "../models/request/cardRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerRequest } from "@/models/request/customerRequest";

describe("backend", () => {
	test("getPagepay", async () => {
		Backend.getInstance().setImplementation(new PagePayMock());
		const pagepay: Promise<PaymentPageResponse> = Backend.getInstance().getImplementation().getPaymentPage(1);
		expect((await pagepay).uuid).toEqual("90076629-34dc-4a26-a333-22fab585ff5d");
		expect((await pagepay).image).toEqual("https://image.io/product.jpeg");
		expect((await pagepay).installmentType).toEqual("CARD_INSTALLMENT");
		expect((await pagepay).description).toEqual("Descrição");
		expect((await pagepay).plan.id).toEqual(1);
		expect((await pagepay).plan.name).toEqual("Plano Pro");
		expect((await pagepay).plan.maxInstallments).toEqual(1);
		expect((await pagepay).plan.accessionValue).toEqual(1);
		expect((await pagepay).plan.value).toEqual(10.50);
		expect((await pagepay).plan.frequency).toEqual("MONTHLY");
		expect((await pagepay).plan.trialDays).toEqual(15);
		expect((await pagepay).loose.value).toEqual(10.50);
		expect((await pagepay).loose.maxInstallments).toEqual(2);
		expect((await pagepay).paymentMethods).toEqual(["CREDIT_CARD", "PIX", "BANKSLIP"]);
		expect((await pagepay).affiliate.id).toEqual(1);
		expect((await pagepay).affiliate.name).toEqual("netflix");
		expect((await pagepay).affiliate.businessName).toEqual("netflix nome");
	});
	test("getCustomer", async () => {
		Backend.getInstance().setCustomerImplementation(new CustomerMock());
		const customer: Promise<CustomerResponse> = Backend.getInstance().getCustomerImplementation().getCustomer();
		expect((await customer).id).toEqual(1);
		expect((await customer).name).toEqual("customer name");
		expect((await customer).cpf).toEqual("1009532345");
		expect((await customer).email).toEqual("teste@teste.com");
		expect((await customer).birthdate).toEqual(121019914);
		expect((await customer).phone).toEqual("23453212");
	});
	test("createCustomer", async () => {
		const customerState: CustomerRequest = {
			name: "Nome Teste",
			email: "nome@teste.com",
			cpf: "02577973004",
			birthdate: 121019914,
			phone: "45999999999",
		};
		const customer: Promise<CustomerRequest> = Backend.getInstance().getCustomerImplementation().createCustomer(customerState);
		expect((await customer).name).toEqual("Nome Teste");
		expect((await customer).cpf).toEqual("02577973004");
		expect((await customer).birthdate).toEqual(121019914);
		expect((await customer).phone).toEqual("45999999999");
	});
	test("putCustomer", async () => {
		Backend.getInstance().setCustomerImplementation(new CustomerMock());
		const customer: CustomerResponse = await Backend.getInstance().getCustomerImplementation().getCustomer();
	
		const updatedCustomer = Backend.getInstance().getCustomerImplementation().putCustomer(customer);
		expect((await updatedCustomer).name).toEqual("new customer name");

	});
	test("getAddress", async () => {
		Backend.getInstance().setAddressImplementation(new AddressMock());
		const address: Promise<AddressResponse> = Backend.getInstance().getAddressImplementation().getAddress(1);
		expect((await address).street).toEqual("Rua 1");
		expect((await address).number).toEqual("1");
		expect((await address).lineTwo).toEqual("apto 1");
		expect((await address).zipCode).toEqual("84010010");
		expect((await address).city).toEqual("Ponta Grossa");
		expect((await address).state).toEqual("Paraná");
	});
	test("createAddress", async () => {
		const addressState: AddressResponse = {
			street: "Rua 2",
			number: "2",
			lineTwo: "apto 2",
			zipCode: "69929970",
			city: "Campinas",
			state: "Acre"
		};
		Backend.getInstance().setAddressImplementation(new AddressMock());
		const address: Promise<AddressResponse> = Backend.getInstance().getAddressImplementation().createAddress(addressState, 1);
		expect((await address).street).toEqual("Rua 2");
		expect((await address).number).toEqual("2");
		expect((await address).lineTwo).toEqual("apto 2");
		expect((await address).zipCode).toEqual("69929970");
		expect((await address).city).toEqual("Campinas");
		expect((await address).state).toEqual("Acre");
	});
	test("getCard", async () => {
		Backend.getInstance().setCardImplementation(new CardMock());
		const cardId: Promise<CardResponse> = Backend.getInstance().getCardImplementation().getCard("mockurl");
		expect((await cardId).profileId).toEqual(1);
	});
	test("createCard", async () => {
		const cardState: CardRequest = {
			cardBrand: "Mastercard",
			cardNumber: "5448280000000007",
			holderDocument: "38461175018",
			holderName: "Nome Teste",
			dueDate: 121019914,
			securityCode: 123
		};
		Backend.getInstance().setCardImplementation(new CardMock());
		const card: Promise<CardRequest> = Backend.getInstance().getCardImplementation().createCard(cardState, 1);
		expect((await card).cardBrand).toEqual("Mastercard");
		expect((await card).cardNumber).toEqual("5448280000000007");
		expect((await card).holderDocument).toEqual("38461175018");
		expect((await card).holderName).toEqual("Nome Teste");
		expect((await card).dueDate).toEqual(121019914);
		expect((await card).securityCode).toEqual(123);

	});
	test("createPayment", async () => {
		const paymentState: SaleRequest = {
			uuid:"90076629-34dc-4a26-a333-22fab585ff5d",
			customerId:1,
			paymentType: "CREDIT_CARD",
			installments:2,
			profileId:1
		};
		Backend.getInstance().setPaymentImplementation(new PaymentMock());
		const payment: Promise<SaleRequest> = Backend.getInstance().getPaymentImplementation().createPayment(paymentState);
		expect((await payment).uuid).toEqual("90076629-34dc-4a26-a333-22fab585ff5d");
		expect((await payment).customerId).toEqual(1);
		expect((await payment).paymentType).toEqual("CREDIT_CARD");
		expect((await payment).installments).toEqual(2);
		expect((await payment).profileId).toEqual(1);
	});
});