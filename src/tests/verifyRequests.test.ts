import { ICustomerState } from "@/models/customerState.model";
import { CustomerResponse } from "@/models/response/customerResponse";
import { describe, expect, test } from "vitest";
import { CustomerMock, PagePayMock } from "../mocks/pagepayMock";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { Backend } from "../services/backend";

describe("backend", () => {
	test("getPagepay", () => {
		Backend.getInstance().setImplementation(new PagePayMock());
		const pagepay: PaymentPageResponse = Backend.getInstance().getImplementation().getPaymentPage(1);
		expect(pagepay.uuid).toEqual("90076629-34dc-4a26-a333-22fab585ff5d");
		expect(pagepay).toHaveProperty("image");
		expect(pagepay).toHaveProperty("installmentType");
		expect(pagepay).toHaveProperty("description");
		expect(pagepay).toHaveProperty("plan");
		expect(pagepay).toHaveProperty("loose");
		expect(pagepay).toHaveProperty("paymentMethods");
		expect(pagepay).toHaveProperty("affiliate");
	});
	test("getCustomer", () => {
		Backend.getInstance().setCustomerImplementation(new CustomerMock());
		const customer: CustomerResponse = Backend.getInstance().getCustomerImplementation().getCustomer();
		expect(customer.id).toEqual(1);
	});
	test("createCustomer", () => {
		const customerState: ICustomerState = {
			username: "a",
			email: "a",
			emailConfirmation: "a",
			cpf: "a",
			birthdate: new Date(),
			phone: "a",
			zipcode: "a",
			street: "a",
			number: "a",
			lineTwo: "a",
			state: "a",
			city: "a"
		};
		Backend.getInstance().getCustomerImplementation().createCustomer(customerState);
		const customer: CustomerResponse = Backend.getInstance().getCustomerImplementation().getCustomer();
		expect(customer.name).toEqual("a");
	});
});