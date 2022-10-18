import { validCpf } from "../helpers/cpfValidator";
import { validCnpj } from "../helpers/cnpjValidator";

export function validDocument(value: string): boolean {
	//debugger
	console.log("chamou validdocument");
	if (validCnpj(value) || validCpf(value)) {
		console.log("documento valido");
		return true;
	} else {
		console.log("documento invalido");
		return false;
	}
}
