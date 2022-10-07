import { describe, expect, test, beforeEach } from 'vitest';
import { DefaultState } from '../models/defaultState.model';
import { useMainStore } from '../store/index';
import { setActivePinia, createPinia } from 'pinia';

describe('store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
      })
    test('storeContentOk', () => {
        const store = useMainStore();

        const stateTest: DefaultState = {
            id: '1',
            username: 'Teste Name',
            email: 'teste@email.com',
            emailConfirmation: 'teste@email.com',
            cpf: '08245496006',
            birthdate: 801100800,
            phone: '42999448643',
            zipcode: '84010010',
            street: 'Rua Dr Colares',
            number: '2',
            lineTwo: 'Apto 3',
            state: 'PR',
            city: 'Ponta Grossa',
            paymentMethod: {
                name: 'CREDIT_CARD',
                value: 10,
                message: 'Teste'
            },
            installments: 2,
            cardBrand: {
                name: 'Mastercard',
                id: 1
            },
            cardNumber: '5448280000000007',
            dueDate: 1835481600,
            securityCode: '123',
            holderName: 'Teste Name',
            holderDocument: '08245496006',
        }


        store.createNewForm(stateTest);

        expect(store.defaultForms).toEqual(stateTest);
    });
})
