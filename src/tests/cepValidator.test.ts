import { describe, expect, test } from 'vitest'
import { validateCep, cepReturn } from '../helpers/cepValidator'

describe('cep', () => {
    test('cepValidationOK', () => {
        const cep = '31570120';
        const cepResponse:any = validateCep(cep);

        //https://jestjs.io/docs/asynchronous
        // return validateCep(cep).then(data = > {
        //     expect(data).eq({ cep: "31570120", state: "MG", city: "Belo Horizonte", neighborhood: "Letícia" })
        // })

        //expect(cepResponse).eq({ cep: "31570120", state: "MG", city: "Belo Horizonte", neighborhood: "Letícia"})
        

    });

})
