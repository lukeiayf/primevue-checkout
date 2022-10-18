import { defineStore } from "pinia";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";

export type RootState = {
    saleDetailsStore: PaymentPageResponse;
};

// const paymentPage: PaymentPageResponse = new PaymentPageResponse;

export const useSalesDetailsStore = defineStore({
	id: "saleDetailsStore",
	state: () =>
		({
			saleDetailsStore: {},
		} as RootState),

	actions: {
		createNewSalesDetail(paymentPage :PaymentPageResponse) {
			if (!paymentPage) return;

			this.saleDetailsStore = paymentPage;
		},
	},
});
