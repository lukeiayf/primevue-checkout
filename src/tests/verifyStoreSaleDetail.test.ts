import { describe, expect, test, beforeEach } from "vitest";
import { useSalesDetailsStore } from "../store/saleDetailsStore";
import { setActivePinia, createPinia } from "pinia";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";

describe("store", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});
	test("storeContentOk", () => {
		const store = useSalesDetailsStore();

		const stateTest: PaymentPageResponse = {
			uuid: "90076629-34dc-4a26-a333-22fab585ff5d",
			value: 10.50,
			plan: {
				name: "Plano Pro",
				id: 1,
				maxInstallments: 1,
				accessionValue: 1,
				value: 10.50,
				description: "Descrição",
				frequency: "mensal",
				trialDays: 15
			},
			image: "https://image.io/product.jpeg",
			looseMaxInstallments: 2,
			saleDescription: "Descrição",
			paymentMethods: [
				"CREDIT_CARD",
				"PIX",
				"BANKSLIP"
			],
			installmentType: "CARD_INSTALLMENT",
			affiliate: {
				id: 1,
				name: "netflix",
				businessName: "netflix nome"
			}
		};


		store.createNewSalesDetail(stateTest);

		expect(store.saleDetailsStore).toEqual(stateTest);
	});
});
