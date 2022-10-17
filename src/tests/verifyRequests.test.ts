import { AddressRequest } from '@/models/request/addressRequest'
import { CustomerRequest } from '@/models/request/customerRequest'
import { PaymentRequest } from '@/models/request/paymentRequest'
import { describe, expect, test } from 'vitest'
import { makeServer } from "../server"
import  fetch from 'node-fetch';
import { PagePayService } from '../services/pagepay.services';

let server;
const pagePayService = new PagePayService();


describe('requests',()=>{
    beforeEach(() => {
        server = makeServer({ environment: "test" });
    })
    
    afterEach(() => {
        server.shutdown();
    })

    test('getPagepay', async () => {
        let pagePay = [];
        let serverError = null;

        server.create("pagePay",{ok:"ok"});
        const url = "http://localhost:8080/api/v2/checkout/companies/1/pagepays"

        let response = await fetch(url, { method: 'GET' });
        if (response.ok) {
            await response.json();
            expect(response).toHaveProperty('ok');
        } else {
            throw new Error("erro no status da requisição");
        }
        // pagePayService.getPaymentPage(1).then((res) => expect(res).toHaveProperty('false'));
    });
    // test('getAddress', () => {
    //     let address = [];
    //     let serverError = null;

    //     fetch("api/v2/customer/1/bestAddress")
    //         .then((res) => res.json())
    //         .then((json) => {
    //             if (json.error) {
    //                 serverError = json.error;
    //             } else {
    //                 address = json.pagePay;
    //             }
    //             expect(address).toBeTruthy;
    //             expect(serverError).toBeFalsy;
    //         })
    // });
    // test('getCustomer', () => {
    //     let customer = [];
    //     let serverError = null;

    //     fetch("api/v2/checkout/pagepays/customer")
    //         .then((res) => res.json())
    //         .then((json) => {
    //             if (json.error) {
    //                 serverError = json.error;
    //             } else {
    //                 customer = json.pagePay;
    //             }
    //             expect(customer).toBeTruthy;
    //             expect(serverError).toBeFalsy;
    //         })
    // });
    // test('getCustomerId', () => {
    //     let customerId = [];
    //     let serverError = null;

    //     fetch("api/v2/checkout/pagepays/document/88328309068")
    //         .then((res) => res.json())
    //         .then((json) => {
    //             if (json.error) {
    //                 serverError = json.error;
    //             } else {
    //                 customerId = json.pagePay;
    //             }
    //             expect(customerId).toBeTruthy;
    //             expect(serverError).toBeFalsy;
    //         })
    // });
    // test('getCard', () => {
    //     let card = [];
    //     let serverError = null;

    //     fetch("api/v2/checkout/pagepays/customer/20/card/2")
    //         .then((res) => res.json())
    //         .then((json) => {
    //             if (json.error) {
    //                 serverError = json.error;
    //             } else {
    //                 card = json.pagePay;
    //             }
    //             expect(card).toBeTruthy;
    //             expect(serverError).toBeFalsy;
    //         })
    // });
    // test('getPaymentInfo', () => {
    //     let paymentInfo = [];
    //     let serverError = null;

    //     fetch("api/v2/checkout/pagepays/paymentmethod/BANKSLIP")
    //         .then((res) => res.json())
    //         .then((json) => {
    //             if (json.error) {
    //                 serverError = json.error;
    //             } else {
    //                 paymentInfo = json.pagePay;
    //             }
    //             expect(paymentInfo).toBeTruthy;
    //             expect(serverError).toBeFalsy;
    //         })
    // });
    // test('postPagePay', () => {
    //     let data;
    //     let serverError = null;
    //     let paymentInfo: PaymentRequest = {
    //         "uuid": "900000000-34dc-4a26-a333-22fab585ff5d",
    //         "customerId": 2,
    //         "paymentType": "CREDIT_CARD",
    //         "installments": 3,
    //         "profileId": 3
    //     };

    //     fetch("api/v2/checkout/pagepays" , { method: 'POST', body: JSON.stringify({paymentInfo}) })
    //         .then((res) => res.json())
    //         .then((json) => {
    //             if (json.error) {
    //                 serverError = json.error;
    //             } else {
    //                 data = json.pagePay;
    //             }
    //             expect(data).toBeTruthy;
    //             expect(serverError).toBeFalsy;
    //         })
    // });
    // test('postCustomer', () => {
    //     let data;
    //     let serverError = null;
    //     let customer: CustomerRequest = {
    //         "name": "Yasmin",
    //         "cpf": "07451131920",
    //         "email": "yasmin.tullio@bempaggo.com.br",
    //         "birthdate": 1665511815,
    //         "phone": "4545454554"
    //     };

    //     fetch("api/v2/checkout/pagepays/customer/new" , { method: 'POST', body: JSON.stringify({customer}) })
    //         .then((res) => res.json())
    //         .then((json) => {
    //             if (json.error) {
    //                 serverError = json.error;
    //             } else {
    //                 data = json.pagePay;
    //             }
    //             expect(data).toBeTruthy;
    //             expect(serverError).toBeFalsy;
    //         })
    // });
    // test('postAddress', () => {
    //     let data;
    //     let serverError = null;
    //     let address: AddressRequest = {
    //         "street": "Rua 1",
    //         "number": "1",
    //         "lineTwo": "Apto 2",
    //         "zipCode": "84010010",
    //         "city": "Ponta Grossa",
    //         "state": "PR"
    //     };

    //     fetch("apiv2/customer/1/address/new" , { method: 'POST', body: JSON.stringify({address}) })
    //         .then((res) => res.json())
    //         .then((json) => {
    //             if (json.error) {
    //                 serverError = json.error;
    //             } else {
    //                 data = json.pagePay;
    //             }
    //             expect(data).toBeTruthy;
    //             expect(serverError).toBeFalsy;
    //         })
    // });
})
