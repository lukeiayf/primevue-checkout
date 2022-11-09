import creditCardType from "credit-card-type";
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref, Ref } from "vue";
import { required } from "@vuelidate/validators";
import { BrandsResponse } from "@/models/response/brandsResponse";
import { Backend } from "@/services/backend";

export interface DefaultCardBrandState {
    cardBrand: BrandsResponse,
}

export const defaultCardBrandState: DefaultCardBrandState = reactive({
	cardBrand: {
		name: "",
		id: 0
	}
});

export const cardBrandRules = {
	cardBrand: { required },
};

export const v = useVuelidate(cardBrandRules, defaultCardBrandState);


export const brandsAdministradoras: Ref<BrandsResponse[]> = ref([]);

const companyId: Ref<number> = ref(null);
const uuid: Ref<string> = ref("");

companyId.value = parseInt(window.location.pathname.split("/")[2]);
uuid.value = window.location.pathname.split("/")[3];

Backend.getInstance().getCardImplementation().getBrands(companyId.value, uuid.value).then(
	brands => {
		brandsAdministradoras.value = brands;
	}
);


export function verifyCard(card) {

	let foundCardBrand = false;
	const cardNumber = card.replace(/[^\d]+/g, "");
	const cardType = creditCardType(cardNumber);
	let modelCardBrand = cardType[0].type;
	switch (modelCardBrand) {
	case "mastercard":
		modelCardBrand = "master";
		break;
	case "american-express":
		modelCardBrand = "amex";
		break;
	case "diners-club":
		modelCardBrand = "diners";
		break;
	case "discover":
		modelCardBrand = "discovery";
		break;
	}
	for (let i = 0; i < brandsAdministradoras.value.length; i++) {
		if (modelCardBrand.toLowerCase() == brandsAdministradoras.value[i].name.toLowerCase()) {
			v.value.cardBrand.$model = brandsAdministradoras.value[i];
			foundCardBrand = true;
		}

	}
	if (foundCardBrand == false) {
		v.value.cardBrand.$model = {
			name: "",
			id: 0
		};
	}
	return foundCardBrand;
}