import { describe,expect, test } from 'vitest'
import { validCnpj } from '../helpers/cnpjValidator'

describe('cnpj',()=>{
    test('cnpjValidationOk', () => {
        const cnpj = '19827720000153';
        
        expect(validCnpj(cnpj)).toBe(true);
    });
    
    test('cnpjValidationFail', () => {
        const cnpj = '19827720000223';
        
        expect(validCnpj(cnpj)).toBe(false);
    });
})

