import { describe,expect, test } from 'vitest'
import { validCpf } from '../helpers/cpfValidator'

describe('cpf',()=>{
    test('cpfValidationOK', () => {
        const cpf = '10095323678';
        
        expect(validCpf(cpf)).toBe(true);
    });
    
    test('cpfValidationFAIL', () => {
        const cpf = '10095320000';
        
        expect(validCpf(cpf)).toBe(false);
    });
})

