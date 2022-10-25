import { defaultState } from "@/models/defaultState.model";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, requiredIf, maxLength } from "@vuelidate/validators";
import { Ref, ref } from "vue";
import { validCpf } from "./cpfValidator";

const isCard: Ref<boolean> = ref(false);

const rules = {
	username: { required },
	email: { required, email },
	emailConfirmation: { required },
	cpf: { required, minLengthValue: minLength(11), validCpf },
	birthdate: {},
	phone: {},
	zipcode: { required, minLengthValue: minLength(8) },
	street: { required },
	lineTwo: {},
	number: { required },
	state: { required },
	city: { required },
	paymentMethod: { required },
	installments: { required },

	cardBrand: { required: requiredIf(isCard) },
	cardNumber: { required: requiredIf(isCard), minLengthValue: minLength(13), maxLengthValue: maxLength(19) },
	dueDate: { required: requiredIf(isCard) },
	securityCode: { required: requiredIf(isCard), minLengthValue: minLength(3) },
	holderName: { required: requiredIf(isCard) },
	holderDocument: { minLengthValue: minLength(11), maxLengthValue: maxLength(18) }
};

export const v$ = useVuelidate(rules, defaultState);