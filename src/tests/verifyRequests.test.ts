import { AddressRequest } from "@/models/request/addressRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { SaleRequest } from "@/models/request/paymentRequest";
import { BrandsResponse } from "@/models/response/brandsResponse";
import { CardResponse } from "@/models/response/cardResponse";
import { CustomerMinimalResponse } from "@/models/response/customerMinimalResponse";
import { PaymentInfoResponse } from "@/models/response/paymentInfoResponse";
import { describe, expect, test } from "vitest";
import { CardRequest } from "../models/request/cardRequest";
import { AddressResponse } from "../models/response/addressResponse";
import { CustomerResponse } from "../models/response/customerResponse";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { Backend } from "../services/backend";

describe("backend", () => {
	test("getPagepay", async () => {
		const pagepay: PaymentPageResponse = await Backend.getInstance().getPagePayImplementation().getPaymentPage(1, "90076629-34dc-4a26-a333-22fab585ff5d");
		expect(pagepay.uuid).toEqual("90076629-34dc-4a26-a333-22fab585ff5d");
		expect(pagepay.image).toEqual("https://www.cupcom.com.br/wp-content/uploads/2020/10/IMAGENS-SITEuv-vuejs.jpg");
		expect(pagepay.installmentType).toEqual("CARD_INSTALLMENT");
		expect(pagepay.description).toEqual("Descrição");
		expect(pagepay.plan.id).toEqual(1);
		expect(pagepay.plan.name).toEqual("Plano Pro");
		expect(pagepay.plan.maxInstallments).toEqual(4);
		expect(pagepay.plan.accessionValue).toEqual(1);
		expect(pagepay.plan.value).toEqual(10.50);
		expect(pagepay.plan.frequency).toEqual("MONTHLY");
		expect(pagepay.plan.trialDays).toEqual(15);
		expect(pagepay.loose.value).toEqual(10.50);
		expect(pagepay.loose.maxInstallments).toEqual(2);
		expect(pagepay.methods).toEqual(["CREDIT_CARD", "PIX", "BANK_SLIP"]);
		expect(pagepay.affiliate.id).toEqual(1);
		expect(pagepay.affiliate.name).toEqual("netflix");
		expect(pagepay.affiliate.businessName).toEqual("netflix nome");


		//.MODE: "development", "test", "production"
	});
	test("getCustomer", async () => {
		const customer: Promise<CustomerResponse> = Backend.getInstance().getCustomerImplementation().getCustomer(1, "90076629-34dc-4a26-a333-22fab585ff5d");
		expect((await customer).id).toEqual(1);
		expect((await customer).name).toEqual("customer name");
		expect((await customer).cpf).toEqual("10095323678");
		expect((await customer).email).toEqual("teste@teste.com");
		expect((await customer).birthdate).toEqual(121019914);
		expect((await customer).phone).toEqual("23453212");
	});
	test("createCustomer", async () => {
		const customerState: CustomerRequest = {
			name: "Nome Teste",
			email: "nome@teste.com",
			document: "02577973004",
			birthdate: 121019914,
			phone: "45999999999",
		};
		const customer: Promise<CustomerResponse> = Backend.getInstance().getCustomerImplementation().createCustomer(1, customerState);
		expect((await customer).name).toEqual("Nome Teste");
		expect((await customer).cpf).toEqual("02577973004");
		expect((await customer).birthdate).toEqual(121019914);
		expect((await customer).phone).toEqual("45999999999");
	});
	test("putCustomer", async () => {
		const customer: CustomerResponse = await Backend.getInstance().getCustomerImplementation().getCustomer(1, "90076629-34dc-4a26-a333-22fab585ff5d");
		const customerRequest: CustomerRequest = new CustomerRequest();
		customerRequest.document = customer.cpf;
		customerRequest.email = customer.email;
		customerRequest.name = customer.name;
		customerRequest.phone = customer.phone;
		const updatedCustomer = Backend.getInstance().getCustomerImplementation().putCustomer(customerRequest,1, 123);
		expect((await updatedCustomer).name).toEqual("new customer name");

	});
	test("getAddress", async () => {
		const address: Promise<AddressResponse> = Backend.getInstance().getAddressImplementation().getAddress(1, 123);
		expect((await address).street).toEqual("Rua 1");
		expect((await address).number).toEqual("1");
		expect((await address).lineTwo).toEqual("apto 1");
		expect((await address).zipCode).toEqual("84010010");
		expect((await address).city).toEqual("Ponta Grossa");
		expect((await address).state).toEqual("Paraná");
	});
	test("createAddress", async () => {
		const addressState: AddressRequest = {
			street: "Rua 2",
			streetNumber: "2",
			addressLineTwo: "apto 2",
			zipCode: "69929970",
			city: "Campinas",
			state: "Acre"
		};
		const address: Promise<AddressResponse> = Backend.getInstance().getAddressImplementation().createAddress(addressState, 1, 123);
		expect((await address).street).toEqual("Rua 2");
		expect((await address).number).toEqual("2");
		expect((await address).lineTwo).toEqual("apto 2");
		expect((await address).zipCode).toEqual("69929970");
		expect((await address).city).toEqual("Campinas");
		expect((await address).state).toEqual("Acre");
	});
	test("getCard", async () => {
		const cardId: Promise<CardResponse> = Backend.getInstance().getCardImplementation().getCard("mockurl");
		expect((await cardId).id).toEqual(1);
	});
	test("getCustomerId", async () => {
		const customerId: Promise<CustomerMinimalResponse> = Backend.getInstance().getCustomerImplementation().getCustomerId(1, "02577973004");
		expect((await customerId).id).toEqual(1);
	});
	test("createCard", async () => {
		const cardState: CardRequest = {
			cardBrand: "Mastercard",
			cardNumber: "5448280000000007",
			holderDocument: "38461175018",
			holderName: "Nome Teste",
			expirationDate: 121019914,
			securityCode: "123"
		};
		const url: string = await Backend.getInstance().getCardImplementation().createCard(cardState, 1, 123);
		expect((url)).toEqual("urlMock");

	});
	test("createPaymentCreditCard", async () => {
		const paymentState: SaleRequest = {
			customerId:1,
			installments:2,
			profileId:1
		};
		const payment: string = await Backend.getInstance().getPaymentImplementation().createPaymentCreditCard(paymentState, 1, "90076629-34dc-4a26-a333-22fab585ff5d");
		expect( payment).toEqual("urlMock");
	});
	test("createPaymentPix", async () => {
		const paymentState: SaleRequest = {
			customerId:1,
			installments:2
		};
		const payment: string = await Backend.getInstance().getPaymentImplementation().createPaymentPix(paymentState, 1, "90076629-34dc-4a26-a333-22fab585ff5d");
		expect( payment).toEqual("urlMock");
	});
	test("createPaymentBankslip", async () => {
		const paymentState: SaleRequest = {
			customerId:1,
			installments:2
		};
		const payment: string = await Backend.getInstance().getPaymentImplementation().createPaymentBankSlip(paymentState, 1, "90076629-34dc-4a26-a333-22fab585ff5d");
		expect( payment).toEqual("urlMock");
	});
	test("getPayment", async () => {
		const paymentInfo: PaymentInfoResponse = await Backend.getInstance().getPaymentImplementation().getPaymentInfo("urlMock");
		expect(paymentInfo.code).toEqual("1235465421646545121");
		expect(paymentInfo.date).toEqual(1665168260);
	});
	test("getBrands", async () => {
		const brands: BrandsResponse[] = await Backend.getInstance().getCardImplementation().getBrands(1, "90076629-34dc-4a26-a333-22fab585ff5d");
		expect(brands[0].id).toEqual(1);
		expect(brands[0].name).toEqual("Visa");
		expect(brands[1].id).toEqual(2);
		expect(brands[1].name).toEqual("Mastercard");
	});
});