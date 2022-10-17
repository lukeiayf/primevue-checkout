import { describe, expect, test } from "vitest";
import { PagePayMock } from "../mocks/pagepayMock";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { Backend } from "../services/backend";

describe("backend", () => {
	test("getPagepay", () => {
		Backend.getInstance().setImplementation(new PagePayMock());
		const pagepay: PaymentPageResponse = Backend.getInstance().getImplementation().getPaymentPage(1);
		expect(pagepay).toHaveProperty("uuid");
		expect(pagepay).toHaveProperty("image");
		expect(pagepay).toHaveProperty("installmentType");
		expect(pagepay).toHaveProperty("description");
		expect(pagepay).toHaveProperty("plan");
		expect(pagepay).toHaveProperty("loose");
		expect(pagepay).toHaveProperty("paymentMethods");
		expect(pagepay).toHaveProperty("affiliate");
	});
});