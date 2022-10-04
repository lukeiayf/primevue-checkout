
import { AffiliateMinimalResponse } from "./affiliateMinimalResponse";
import { PlanResponse } from "./planResponse";

export class PaymentPageResponse{
    uuid: string;
    value: number;
    plan?: PlanResponse;
    image?: string;
    looseMaxInstallments?: number;
    saleDescription?: string;
    paymentMethods: string[];
    installmentType: string;
    affiliate: AffiliateMinimalResponse;
}