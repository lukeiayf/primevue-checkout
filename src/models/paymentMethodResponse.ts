export interface PaymentMethod {
    name: string,
    value: number,
    message: string,
}

export const paymentOptions: PaymentMethod[] = [
    {
        name: 'Cartão',
        value: 1,
        message: ''
    },
    {
        name: 'Boleto',
        value: 2,
        message: 'Ao selecionar essa opção, será gerado um boleto bancário.'
    },
    {
        name: 'Pix',
        value: 3,
        message: 'Ao selecionar essa opção, será gerado um QR code.'
    }
];