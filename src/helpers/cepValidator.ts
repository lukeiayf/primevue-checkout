import cep from 'cep-promise'

export function validateCep(inputCep: string){
    cep(inputCep).then(
        (address) => {
            console.log(address);
            return address;
        }
    )
}