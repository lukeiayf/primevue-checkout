import cep from "cep-promise";
import { ref } from "vue";
import type { Ref } from "vue";

export const cepReturn: Ref<any> = ref({});

export async function validateCep(inputCep: string){
	cep(inputCep).then(
		(address) => {
			cepReturn.value = address;
			return address;
		}
	);
	return cep(inputCep);
}