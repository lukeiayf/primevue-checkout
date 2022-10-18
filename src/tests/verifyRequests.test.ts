import { CustomerResponse } from "../models/response/customerResponse";
import { describe, expect, test } from "vitest";
import { AddressMock, CardMock, CustomerMock, PagePayMock, PaymentMock } from "../mocks/pagepayMock";
import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { AddressResponse } from "../models/response/addressResponse";
import { Backend } from "../services/backend";
import { CardRequest } from "../models/request/cardRequest";
import { SaleRequest } from "@/models/request/paymentRequest";

describe("backend", () => {
    test("getPagepay", () => {
        Backend.getInstance().setImplementation(new PagePayMock());
        const pagepay: PaymentPageResponse = Backend.getInstance().getImplementation().getPaymentPage(1);
        expect(pagepay.uuid).toEqual("90076629-34dc-4a26-a333-22fab585ff5d");
        expect(pagepay.image).toEqual("https://image.io/product.jpeg");
        expect(pagepay.installmentType).toEqual("CARD_INSTALLMENT");
        expect(pagepay.description).toEqual("Descrição");
        expect(pagepay.plan.id).toEqual(1);
        expect(pagepay.plan.name).toEqual("Plano Pro");
        expect(pagepay.plan.maxInstallments).toEqual(1);
        expect(pagepay.plan.accessionValue).toEqual(1);
        expect(pagepay.plan.value).toEqual(10.50);
        expect(pagepay.plan.frequency).toEqual("MONTHLY");
        expect(pagepay.plan.trialDays).toEqual(15);
        expect(pagepay.loose.value).toEqual(10.50);
        expect(pagepay.loose.maxInstallments).toEqual(2);
        expect(pagepay.paymentMethods).toEqual(["CREDIT_CARD", "PIX", "BANKSLIP"]);
        expect(pagepay.affiliate.id).toEqual(1);
        expect(pagepay.affiliate.name).toEqual("netflix");
        expect(pagepay.affiliate.businessName).toEqual("netflix nome");
    });
    test("getCustomer", () => {
        Backend.getInstance().setCustomerImplementation(new CustomerMock());
        const customer: CustomerResponse = Backend.getInstance().getCustomerImplementation().getCustomer();
        expect(customer.id).toEqual(1);
        expect(customer.name).toEqual("customer name");
        expect(customer.cpf).toEqual("1009532345");
        expect(customer.email).toEqual("teste@teste.com");
        expect(customer.birthdate).toEqual(121019914);
        expect(customer.phone).toEqual("23453212");
    });
    test("createCustomer", () => {
        const customerState: CustomerResponse = {
            id: 1,
            name: "Nome Teste",
            email: "nome@teste.com",
            cpf: "02577973004",
            birthdate: 121019914,
            phone: "45999999999",
        };
        const customer: CustomerResponse = Backend.getInstance().getCustomerImplementation().createCustomer(customerState);
        expect(customer.id).toEqual(1);
        expect(customer.name).toEqual("Nome Teste");
        expect(customer.cpf).toEqual("02577973004");
        expect(customer.birthdate).toEqual(121019914);
        expect(customer.phone).toEqual("45999999999");
    });
    test("getAddress", () => {
        Backend.getInstance().setAddressImplementation(new AddressMock());
        const address: AddressResponse = Backend.getInstance().getAddressImplementation().getAddress();
        expect(address.street).toEqual("Rua 1");
        expect(address.number).toEqual("1");
        expect(address.lineTwo).toEqual("apto 1");
        expect(address.zipCode).toEqual("84010010");
        expect(address.city).toEqual("Ponta Grossa");
        expect(address.state).toEqual("Paraná");
    })
    test("createAddress", () => {
        const addressState: AddressResponse = {
            street: "Rua 2",
            number: "2",
            lineTwo: "apto 2",
            zipCode: "69929970",
            city: "Campinas",
            state: "Acre"
        };
        Backend.getInstance().setAddressImplementation(new AddressMock());
        const address: AddressResponse = Backend.getInstance().getAddressImplementation().createAddress(addressState);
        expect(address.street).toEqual("Rua 2");
        expect(address.number).toEqual("2");
        expect(address.lineTwo).toEqual("apto 2");
        expect(address.zipCode).toEqual("69929970");
        expect(address.city).toEqual("Campinas");
        expect(address.state).toEqual("Acre");
    })
    test("getCard", () => {
        Backend.getInstance().setCardImplementation(new CardMock());
        const cardId: number = Backend.getInstance().getCardImplementation().getCard();
        expect(cardId).toEqual(1);
    })
    test("createCard", () => {
        const cardState: CardRequest = {
            cardBrand: "Mastercard",
            cardNumber: "5448280000000007",
            holderDocument: "38461175018",
            holderName: "Nome Teste",
            dueDate: 121019914,
            securityCode: 123
        };
        Backend.getInstance().setCardImplementation(new CardMock());
        const card: CardRequest = Backend.getInstance().getCardImplementation().createCard(cardState);
        expect(card.cardBrand).toEqual("Mastercard");
        expect(card.cardNumber).toEqual("5448280000000007");
        expect(card.holderDocument).toEqual("38461175018");
        expect(card.holderName).toEqual("Nome Teste");
        expect(card.dueDate).toEqual(121019914);
        expect(card.securityCode).toEqual(123);

    })
    test("createPayment", () => {
        const paymentState: SaleRequest = {
            uuid:"90076629-34dc-4a26-a333-22fab585ff5d",
            customerId:1,
            paymentType: "CREDIT_CARD",
            installments:2,
            profileId:1
        };
        Backend.getInstance().setPaymentImplementation(new PaymentMock());
        const payment: SaleRequest = Backend.getInstance().getPaymentImplementation().createPayment(paymentState);
        expect(payment.uuid).toEqual("90076629-34dc-4a26-a333-22fab585ff5d");
        expect(payment.customerId).toEqual(1);
        expect(payment.paymentType).toEqual("CREDIT_CARD");
        expect(payment.installments).toEqual(2);
        expect(payment.profileId).toEqual(1);
    })
});