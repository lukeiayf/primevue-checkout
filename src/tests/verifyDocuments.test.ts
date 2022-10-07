import { describe,expect, test } from 'vitest'
import { validDocument } from '../helpers/validDocument'

describe('document',()=>{
    test('cpfValidationOk', () => {
        const cnpj = '19827720000153';
        
        expect(validDocument(cnpj)).toBe(true);
    });
    
    test('cnpjValidationFail', () => {
        const cnpj = '19827720000223';
        
        expect(validDocument(cnpj)).toBe(false);
    });
    test('cpfValidationOk', () => {
        const cpf = '10095323678';
        
        expect(validDocument(cpf)).toBe(true);
    });
    test('cpfValidationFail', () => {
        const cpf = '10095320000';
        
        expect(validDocument(cpf)).toBe(false);
    });
})

