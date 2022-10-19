import { reactive, Ref} from "vue";

export interface ICustomerState {
    username: string,
    email: string,
    emailConfirmation: string,
    cpf: string,
    birthdate: number;
    phone: string,
    zipcode: string,
    street: string,
    number: string,
    lineTwo: Ref<string> | string,
    state: string,
    city: string,
}

export const customerState: ICustomerState = reactive({
	username: "",
	email: "",
	emailConfirmation: "",  
	cpf: "",
	birthdate: null,
	phone: "",
	zipcode: "",
	street: "",
	number: null,
	lineTwo: "",
	state: "",
	city: ""

});
