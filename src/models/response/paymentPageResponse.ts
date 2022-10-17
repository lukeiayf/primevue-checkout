import { AffiliateMinimalResponse } from "./affiliateMinimalResponse";
import { PlanResponse } from "./planResponse";
export class PaymentPageResponse {
	uuid: string;
	plan?: PlanResponse;
	image?: string;
	description?: string;
	paymentMethods: string[];
	installmentType?: string;
	affiliate: AffiliateMinimalResponse;
	loose?: LooseResponse;
}
export class LooseResponse {
	value: number;
	maxInstallments: number;
}