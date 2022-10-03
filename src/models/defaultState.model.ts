import { reactive } from 'vue';
import { Brand } from '../helpers/verifyCard';
import { PaymentMethod } from './paymentMethod.model';

export interface DefaultState {
    id: string,
    username: string,
    email: string,
    emailConfirmation: string,
    cpf: string,
    zipcode: string,
    street: string,
    number: string,
    state: string,
    city: string,
    paymentMethod: PaymentMethod,
    installments: number,
    cardBrand: Brand,
    cardNumber: string,
    month: any,
    securityCode: string,
    holderName: string,
    holderDocument: string,
}

export const defaultState: DefaultState = reactive({
    id: '',
    username: '',
    email: '',
    emailConfirmation: '',  
    cpf: '',
    zipcode: '',
    street: '',
    number: '',
    state: '',
    city: '',
    paymentMethod: {
        name: 'Cartão',
        value: 1,
        message: '' 
    },
    installments: 1,
    cardNumber: '',
    month: '',
    securityCode: '',
    holderName: '',
    holderDocument: '',
    cardBrand: {
        name: '',
        id: 0
    }

});
