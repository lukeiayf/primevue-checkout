import { CustomerRequest } from '../models/request/customerRequest';
import { AddressRequest } from '../models/request/addressRequest';
import { CardRequest } from '../models/request/cardRequest';



export class PagePayService {

    public async getPaymentPage(companyId: number) {
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays`;
        console.log(url)

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
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer`;

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
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customerId}/card/${profileId}`

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
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/document/${customerDocument}`;

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
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/new`;

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
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/customer/${customerId}/address/new`

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
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customerId}/card`

        try {
            let data = await fetch(url, { method: 'POST', body: JSON.stringify({ card }) });
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
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customerId}`;

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
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/customer/${customerId}/address/update`;

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

    public async postAuthCode(customerId:number){
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepay/sendcode`;

        try {
            let data = await fetch(url, { method: 'POST', body: JSON.stringify({ customerId }) });
            if (data.ok) {
                return await data.json();
            } else {
                throw new Error("erro no status da requisição");
            }
        } catch (error) {
            return Error(error);
        }

    }

    public async postVerifyAuthCode(customerId: number, code: string){
        const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepay/verifycode`;

        try {
            let data = await fetch(url, { method: 'POST', body: JSON.stringify({ customerId, code }) });
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