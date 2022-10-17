import { reactive } from "vue";
import { Brand } from "../helpers/verifyCard";
import { PaymentMethod } from "./response/paymentMethodResponse";

export interface DefaultState {
    id: string,
    username: string,
    email: string,
    emailConfirmation: string,
    cpf: string,
    birthdate: any;
    phone: string,
    zipcode: string,
    street: string,
    number: string,
    lineTwo: string,
    state: string,
    city: string,
    paymentMethod: PaymentMethod,
    installments: number,
    cardBrand: Brand,
    cardNumber: string,
    dueDate: any,
    securityCode: string,
    holderName: string,
    holderDocument: string,
}

export const defaultState: DefaultState = reactive({
	id: "",
	username: "",
	email: "",
	emailConfirmation: "",  
	cpf: "",
	birthdate: "",
	phone: "",
	zipcode: "",
	street: "",
	number: "",
	lineTwo: "",
	state: "",
	city: "",
	paymentMethod: {
		name: "Cartão",
		value: 1,
		message: "" 
	},
	installments: 1,
	cardNumber: "",
	dueDate: "",
	securityCode: "",
	holderName: "",
	holderDocument: "",
	cardBrand: {
		name: "",
		id: 0
	}

});
