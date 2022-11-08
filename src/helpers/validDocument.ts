import { validCpf } from "../helpers/cpfValidator";
import { validCnpj } from "../helpers/cnpjValidator";

export function validDocument(value: string): boolean {
	if (validCnpj(value) || validCpf(value)) {
		return true;
	} else {
		return false;
	}
}
