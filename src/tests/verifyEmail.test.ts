import { describe, expect, test } from 'vitest'
import { verifyEmail, equalsToEmail } from '../helpers/validateEmail'

describe('email',()=>{
    test('emailConfirmationOK', () => {
        const email = 'teste@teste.com';
        const emailConfirmation = 'teste@teste.com'
        
        verifyEmail(email,emailConfirmation)
        
        expect(equalsToEmail.value).toBe(true);
    });
    
    test('emailConfirmationFAIL', () => {
        const email = 'teste@teste.com';
        const emailConfirmation = 'teste@testefail.com'
        
        verifyEmail(email,emailConfirmation)
        
        expect(equalsToEmail.value).toBe(false);
    });
})
