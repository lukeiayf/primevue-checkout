import { AddressRequest } from "../models/request/addressRequest";
import { CardRequest } from "../models/request/cardRequest";
import { CustomerRequest } from "../models/request/customerRequest";
import { PaymentRequest } from "../models/request/paymentRequest";
import { PagePayService } from "../services/pagepay.services";


let pagePayService = new PagePayService();

export function requestsMirage() {
    pagePayService.getPaymentPage(1);
    pagePayService.getPaymentPageAddress(1);
    pagePayService.getPaymentPageCustomer();
    pagePayService.getCustomerIdByDocument('88328309068');
    pagePayService.getCardByUri(2, 2);
    pagePayService.getPaymentInfo('BANKSLIP');
    let postPaymentInfo: PaymentRequest = {
        "uuid": "900000000-34dc-4a26-a333-22fab585ff5d",
        "customerId": 2,
        "paymentType": "CREDIT_CARD",
        "installments": 3,
        "profileId": 3
    };
    pagePayService.postPaymentInfo(postPaymentInfo);
    let customer: CustomerRequest = {
        "name": "Yasmin",
        "cpf": "07451131920",
        "email": "yasmin.tullio@bempaggo.com.br",
        "birthdate": 1665511815,
        "phone": "4545454554"
    };
    pagePayService.postCustomer(customer);
    let address: AddressRequest = {
        "street": "Rua 1",
        "number": "1",
        "lineTwo": "Apto 2",
        "zipCode": "84010010",
        "city": "Ponta Grossa",
        "state": "PR"
    };
    pagePayService.postAddress(1, address);
    let cardRequest: CardRequest = {
        "cardBrand": "Mastercard",
        "cardNumber": "5448280000000007",
        "holderDocument": "69183691057",
        "holderName": "Yasmin",
        "dueDate": 1670782215,
        "securityCode": 123
    }
    pagePayService.postCard(1, cardRequest);
    let customerUpdate: CustomerRequest = {
        "name": "Joana",
        "cpf": "07451131920",
        "email": "yasmin.tullio@bempaggo.com.br",
        "birthdate": 1665511815,
        "phone": "4545454554"
    };
    pagePayService.putCustomer(20, customerUpdate)
}
