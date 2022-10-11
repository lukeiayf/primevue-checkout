import { CustomerRequest } from '../models/request/customerRequest';
import { AddressRequest } from '../models/request/addressRequest';
import { CardRequest } from '../models/request/cardRequest';
import { PaymentRequest } from '../models/request/paymentRequest';



export class PagePayService {

    public async getPaymentPage(companyId: number) {
        const url = "/api/v2/checkout/companies/1/pagepays"
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/${companyId}/pagepays`;
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
        const url = `api/v2/checkout/pagepays/customer`;
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer`;

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
    public async getPaymentPageAddress(customerId: number) {
        const url = "api/v2/customer/1/bestAddress"
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/customer/${customerId}/bestAddress`;

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

    public async getPaymentInfo(paymentMethod: string) {
        const url = "api/v2/checkout/pagepays/paymentmethod/BANKSLIP"
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/paymentmethod/${paymentMethod}`;

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
        const url = 'api/v2/checkout/pagepays/customer/20/card/2'
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customerId}/card/${profileId}`

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
        const url =  `api/v2/checkout/pagepays/document/88328309068`
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/document/${customerDocument}`;

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
    public async getPagePayPaymentInfo(){
        const url =  `api/v2/checkout/pagepays`
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/document/${customerDocument}`;

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
        const url = 'api/v2/checkout/pagepays/customer/new'
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/new`;

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

    public async postPaymentInfo(paymentInfo:PaymentRequest){
        const url = 'api/v2/checkout/pagepays'
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays`;

        try {
            let data = await fetch(url, { method: 'POST', body: JSON.stringify({paymentInfo}) });
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
        const url = 'api/v2/customer/1/address/new'
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/customer/${customerId}/address/new`

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
        const url = "api/v2/checkout/pagepays/customer/1/card"
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customerId}/card`

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
        const url = 'api/v2/checkout/pagepays/customer/20'
        //const url = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/pagepays/customer/${customerId}`;
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

    public async getUsers(){
        let users = [];
        let serverError = null;

        fetch("/api/pagepay")
            .then((res) => res.json())
            .then((json) => {
                
                if (json.error) {
                    serverError = json.error;
                } else {
                    users = json.users;
                }
            })
    }
}