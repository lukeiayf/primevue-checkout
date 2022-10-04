import { CustomerResponse } from '../models/response/customerResponse'

export class PagePayService {

    public async getPaymentPage() {
        const url = 'https://apisandbox.bempaggo.io/api/v{version}/checkout/pagepays';

        try {
            let response = await fetch(url, {method:'GET'});
            if (response.status == 200) {
                return await response.json();
            }
        } catch (error) {
            console.log(error);
        }
    }

    public async getPaymentPageCustomer():Promise<CustomerResponse> {
        const url = 'https://apisandbox.bempaggo.io/api/v{version}/checkout/pagepays/customer';

        try {
            let response = await fetch(url, {method:'GET'});
            if (response.status == 200){
                return await response.json();
            } else {
                throw new Error ("erro no status da requisição");
            }
        } catch(error) {
            return {
                id: 0,
                name: '',
                cpf: '',
                email: '',
                birthdate: 0,
                phone: ''
            };
        }
    }

}