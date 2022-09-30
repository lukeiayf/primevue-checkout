import creditCardType, {
    types as CardType,
} from "credit-card-type";
import { useVuelidate } from '@vuelidate/core'
import { reactive } from "vue";
import { required } from '@vuelidate/validators';


export interface DefaultCardBrandState {
    cardBrand: Brand,
}

export const defaultCardBrandState: DefaultCardBrandState = reactive({
    cardBrand: {
        name: '',
        id: 0
    }
});

export const cardBrandRules = {
    cardBrand: { required },
}

export const v = useVuelidate(cardBrandRules, defaultCardBrandState);

export interface Brand {
    name: string,
    id: number,
}

export const brands: Brand[] = [
    {
        name: 'Mastercard',
        id: 1
    },
    {
        name: 'Hipercard',
        id: 2
    },
    {
        name: 'Elo',
        id: 3
    },
    {
        name: 'Visa',
        id: 4
    }
];

export function verifyCard(card) {
    var foundCardBrand: boolean = false;
    let cardNumber = card.replace(/[^\d]+/g, '');
    if (cardNumber != '')
        console.log(cardNumber);
    var visaCards = creditCardType(cardNumber);
    var modelCardBrand = visaCards[0].type;
    console.log(cardNumber)
    console.log(brands.length)
    for (let i = 0; i < brands.length; i++) {
        if (modelCardBrand.toLowerCase() == brands[i].name.toLowerCase()) {
            console.log("igual " + brands[i].name)
            v.value.cardBrand.$model = brands[i]
            foundCardBrand = true;
        }

    }
    if (foundCardBrand == false) {
        v.value.cardBrand.$model = {
            name: '',
            id: 0
        }
    }
}