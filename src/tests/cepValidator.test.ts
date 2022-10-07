import { describe, expect, test } from 'vitest'
import { validateCep, cepReturn } from '../helpers/cepValidator'

describe('cep', () => {
    test('cepValidationOK', async () => {
        const cep = '31570120';
        const cepResponse = {
            cep: "31570120", 
            state: "MG", 
            city: "Belo Horizonte", 
            neighborhood: "Letícia", 
            street: "Rua Emídio Furtado",
            service: "correios" 
        }

        await validateCep(cep).then((data) => expect({...data}).toStrictEqual({...cepResponse}))
        

    });
    

})
