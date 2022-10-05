import { CustomerResponse } from '../models/response/customerResponse';
import { CustomerRequest } from '../models/request/customerRequest';
import { AddressRequest } from '../models/request/addressRequest';
import { CardRequest } from '../models/request/cardRequest';


export class PagePayService {

    public async getPaymentPage() {
        const url = 'https://apisandbox.bempaggo.io/api/v2/checkout/pagepays';

        try {
            let response = await fetch(url, {method:'GET'});
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("erro no status da requisição");
            }
        } catch (error) {
            return Error(error);
        }
    }

    public async getPaymentPageCustomer() {
        const url = 'https://apisandbox.bempaggo.io/api/v2/checkout/pagepays/customer';

        try {
            let response = await fetch(url, {method:'GET'});
            if (response.ok){
                return await response.json();
            } else {
                throw new Error("erro no status da requisição");
            }
        } catch(error) {
            return Error(error);
        }
    }

    public async getCardByUri(customerId: number, profileId: number){
        const url = `https://apisandbox.bempaggo.io/api/v2/checkout/pagepays/customer/${customerId}/card/${profileId}`

        try {
            let response = await fetch(url, { method: 'GET' });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error("erro no status da requisição");
            }
        } catch (error) {
            return Error(error);
        }

    }

    public async getCustomerIdByDocument(customerDocument:string){
        const url = `https://apisandbox.bempaggo.io/api/v2/checkout/pagepays/document/${customerDocument}`;

        try {
            let response = await fetch(url, { method: 'GET' });
            if (response.ok) {
                return await response.json();
            } else {
                throw new Error();
            }
        } catch(error) {
            return '404';        
        }
    }

    public async postCustomer(customer:CustomerRequest){
        const url = `https://apisandbox.bempaggo.io/api/v2/checkout/pagepays/customer/new`;

        try {
            let data = await fetch(url, { method: 'POST', body: JSON.stringify({customer}) });
            if (data.ok) {
                return await data.json();
            } else {
                throw new Error("erro no status da requisição");
            }
        } catch (error) {
            return Error(error);
        }
    }

    public async postAddress(customerId: number,address: AddressRequest){
        const url = `https://apisandbox.bempaggo.io/api/v2/customer/${customerId}/address/new`

        try {
            let data = await fetch(url, { method: 'POST', body: JSON.stringify({ address }) });
            if (data.ok) {
                return await data.json();
            } else {
                throw new Error("erro no status da requisição");
            }
        } catch (error) {
            return Error(error);
        } 
    }

    public async postCard(customerId: number, card: CardRequest){
        const url = `https://apisandbox.bempaggo.io/api/v2/checkout/pagepays/customer/${customerId}/card`

        try {
            let data = await fetch(url, { method: 'PUT', body: JSON.stringify({ card }) });
            if (data.ok) {
                return await data.json();
            } else {
                throw new Error("erro no status da requisição");
            }
        } catch (error) {
            return Error(error);
        }
    }

    public async putCustomer(customerId: number, customer: CustomerRequest){
        const url = `https://apisandbox.bempaggo.io/api/v2/checkout/pagepays/customer/${customerId}`;

        try {
            let data = await fetch(url, { method: 'PUT', body: JSON.stringify({customer}) });
            if (data.ok) {
                return await data.json();
            } else {
                throw new Error("erro no status da requisição");
            }
        } catch (error) {
            return Error(error);
        }
    }

    public async putAddress(customerId:number, adress:AddressRequest){
        const url = `https://apisandbox.bempaggo.io/api/v2/customer/${customerId}/address/update`;

        try {
            let data = await fetch(url, { method: 'PUT', body: JSON.stringify({ adress }) });
            if (data.ok) {
                return await data.json();
            } else {
                throw new Error("erro no status da requisição");
            }
        } catch (error) {
            return Error(error);
        }
    }



}