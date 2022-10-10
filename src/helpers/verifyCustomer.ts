import { PagePayService } from "../services/pagepay.services";
import { useCustomerStore } from "../store/customerStore";
import { AddressRequest } from "../models/request/addressRequest";
import { CustomerRequest } from "../models/request/customerRequest";
import { setActivePinia, createPinia } from 'pinia';

const pagePayService = new PagePayService();
setActivePinia(createPinia());
export let newCustomer = new CustomerRequest();
export let newAddress = new AddressRequest();
export let customerId: number;

export async function verifyCustomer() {
    const customerStore = useCustomerStore();
    newCustomer = {
        name: customerStore.customerState.username,
        cpf: customerStore.customerState.cpf,
        email: customerStore.customerState.email,
        birthdate: customerStore.customerState.birthdate,
        phone: customerStore.customerState.phone
    }
    newAddress = {
        street: customerStore.customerState.street,
        number: customerStore.customerState.number,
        lineTwo: customerStore.customerState.lineTwo,
        state: customerStore.customerState.state,
        city: customerStore.customerState.city,
        zipCode: customerStore.customerState.zipcode
    }
    // await pagePayService.getCustomerIdByDocument(customerStore.customerState.cpf).then((result) => {
    //     if (result == '404') {
    //         pagePayService.postCustomer(newCustomer).then((data) => {
    //             //pegar a location e retorna um customerId
    //             pagePayService.postAddress(customerId, newAddress)
    //         });
    //     } else {
    //         customerId = result.customerId;
    //         pagePayService.putCustomer(customerId, newCustomer);
    //         pagePayService.putAddress(customerId, newAddress);
    //         pagePayService.postAuthCode(customerId);
    //     }
    // })

    console.log(newAddress);
    console.log(newCustomer);
}