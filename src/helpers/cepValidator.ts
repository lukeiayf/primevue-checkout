import cep from 'cep-promise';
import { ref } from 'vue';
import type { Ref } from 'vue';

export let cepReturn: Ref<any> = ref({});

export async function validateCep(inputCep: string){
    cep(inputCep).then(
        (address) => {
            console.log(address);
            cepReturn.value = address;
            return address;
        }
    )
    return cep(inputCep);
}