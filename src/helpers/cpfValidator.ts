import { reactive } from "vue";

export const messages: Message[] = reactive([]);

export interface Message {
    severity: string;
    content: string;
    id: number;
}

export const validCpf = (inputCPF: string) => {
	// console.log(inputCPF);
	// console.log('chamou validcpf para testar' + inputCPF);
	inputCPF = inputCPF.replace(/[^\d]+/g, "");
	let soma = 0;
	let resto = 0;
	const invalidCpf: string[] = ["00000000000", "11111111111", "22222222222", "3333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"];

	if (invalidCpf.indexOf(inputCPF) !== -1) {
		console.log("cpf invalido");
		addMessages("cpf invalido");
		return false;
	}
	// tslint:disable-next-line:radix
	for (let i = 1; i <= 9; i++) {
		soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (11 - i);
		resto = (soma * 10) % 11;
	}

	if ((resto === 10) || (resto === 11)) { resto = 0; }

	// tslint:disable-next-line:radix
	if (resto !== parseInt(inputCPF.substring(9, 10))) {
		console.log("cpf invalido");
		return false;
	}

	soma = 0;
	// tslint:disable-next-line:radix
	for (let i = 1; i <= 10; i++) {
		soma = soma + parseInt(inputCPF.substring(i - 1, i)) * (12 - i);
		resto = (soma * 10) % 11;
	}

	if ((resto === 10) || (resto === 11)) { resto = 0; }

	// tslint:disable-next-line:radix
	if (resto !== parseInt(inputCPF.substring(10, 11))) {
		console.log("cpf invalido");
		return false;
	}
	console.log("cpf valido");
	messages.pop();
	return true;
};

export function addMessages(text: string) {
	messages.push({
		severity: "warn",
		content: text,
		id: 1
	});
	console.log(messages[0].content);
	console.log(messages.length);
}