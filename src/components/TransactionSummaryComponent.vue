<template>
  <Card style="width: 50rem; margin-bottom: 1.5em; margin-top:1.5em; align-items: center;">
      <template #title>
      <div style="display: flex; justify-content:flex-start; flex-direction: column">
        <h5>Resumo da compra</h5>
      </div>
      {{localStorageVar}}
    </template>
  </Card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import Card from 'primevue/card';
import creditCardType, {
  types as CardType,
} from "credit-card-type";
import type { Ref } from 'vue';
import 'moment/locale/pt-br';

const birthdate: Ref<any> = ref('');
const phone: Ref<string> = ref('');
const maxInstallments: Ref<number> = ref(12);
const submitted: Ref<boolean> = ref(false);
const line2: Ref<string> = ref('');
const minDate: Ref<Date> = ref(new Date());
let messages: Message[] = reactive([]);
let showFields: Ref<boolean> = ref(false);
let verificationCode: string = '';
let codeVerified: Ref<boolean> = ref(false);

interface Message {
  severity: string;
  content: string;
  id: number;
}
let localStorageVar = localStorage.getItem('Nome')


const props = defineProps({
  name: String
})

console.log(props.name)

interface PaymentMethod {
  name: string,
  value: number,
  message: string,
}

interface Brand {
  name: string,
  id: number,
}

interface DefaultState {
  username: string,
  email: string,
  cpf: string,
  zipcode: string,
  street: string,
  number: string,
  state: string,
  city: string,
  installments: number,
  cardBrand: Brand,
  cardNumber: string,
  month: any,
  securityCode: string,
  holderName: string,
  holderDocument: string,
}

const defaultState: DefaultState = reactive({
  username: '',
  email: '',
  cpf: '',
  zipcode: '',
  street: '',
  number: '',
  state: '',
  city: '',
  installments: 1,
  cardNumber: '',
  month: '',
  securityCode: '',
  holderName: '',
  holderDocument: '',
  cardBrand: {
    name: '',
    id: 0
  }

});


const validCpf = (inputCPF: any) => {
  //console.log(v$.value.cpf.$model);
  console.log('chamou validcpf');
  inputCPF = inputCPF.replace(/[^\d]+/g, '');
  let soma: number = 0;
  let resto: number = 0;
  let invalidCpf: string[] = ["00000000000", "11111111111", "22222222222", "3333333333", "44444444444", "55555555555", "66666666666", "77777777777", "88888888888", "99999999999"];

  if (invalidCpf.indexOf(inputCPF) !== -1) {
    //console.log('false');
    addMessages("cpf invalido")
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
    //console.log('false')
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
    //console.log('false');
    return false;
  }
  // console.log('true');
  messages.pop();
  return true;
}

const validCnpj = (cnpj: any) => {
  console.log("chamou valid cnpj");
  //console.log(v$.value.holderDocument.$model);
  //remove caracteres especiais
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj == '') return false;
  if (cnpj.length != 14)
    return false;
  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return false;
  // Valida DVs
  let tamanho = cnpj.length - 2
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
    return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
    return false;
  return true;
}

const handleSubmit = (isFormValid) => {
  // debugger
  submitted.value = true;
  if (!isFormValid) {
    console.log('n passou');
    // console.log(v$.value.cardNumber.$model.valueOf);
  } else {
    console.log('passou')
  }

};

const paymentMethod: Ref<PaymentMethod> = ref({
  name: 'Cartão',
  value: 1,
  message: ''
});

const paymentOptions: PaymentMethod[] = [
  {
    name: 'Cartão',
    value: 1,
    message: ''
  },
  {
    name: 'Boleto',
    value: 2,
    message: 'Ao selecionar essa opção, será gerado um boleto bancário.'
  },
  {
    name: 'Pix',
    value: 3,
    message: 'Ao selecionar essa opção, será gerado um QR code.'
  }
];

const brands: Brand[] = [
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

function verifyCard() {
  var foundCardBrand: boolean = false;
  let cardNumber = v$.value.cardNumber.$model.replace(/[^\d]+/g, '');
  if (cardNumber != '')
    console.log(cardNumber);
  var visaCards = creditCardType(cardNumber);
  var modelCardBrand = visaCards[0].type;
  console.log(cardNumber)
  console.log(brands.length)
  for (let i = 0; i < brands.length; i++) {
    if (modelCardBrand.toLowerCase() == brands[i].name.toLowerCase()) {
      console.log("igual " + brands[i].name)
      v$.value.cardBrand.$model = brands[i]
      foundCardBrand = true;
    }

  }
  if (foundCardBrand == false) {
    v$.value.cardBrand.$model = {
      name: '',
      id: 0
    }
  }
}

const validDocument = (value) => {
  console.log('chamou validdocument')
  if (validCnpj(value) || validCpf(value))
    return true
}

function addMessages(text: string) {
  messages.push({
    severity: 'warn',
    content: text,
    id: 1
  })
  console.log(messages[0].content);
  console.log(messages.length);
}

function sendCode() {
  showFields.value = true;
  codeVerified.value = true;
  console.log(showFields);
  return showFields.value;
}

function verifyCode() {
  showFields.value = false;
  codeVerified.value = true;
}

const rules = {
  username: { required },
  email: { required, email },
  cpf: { required, minLengthValue: minLength(11), validCpf },
  zipcode: { required, minLengthValue: minLength(8) },
  street: { required },
  number: { required },
  state: { required },
  city: { required },
  installments: { required },
  cardBrand: { required },
  cardNumber: { required, minLengthValue: minLength(13), maxLengthValue: maxLength(19) },
  month: { required },
  securityCode: { required, minLengthValue: minLength(3) },
  holderName: { required },
  holderDocument: { required, minLengthValue: minLength(11), maxLengthValue: maxLength(18), validDocument }
};

const v$ = useVuelidate(rules, defaultState);
</script> 

<style lang="scss" scoped>
.input-area>* {
  display: block;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.input-size {
  padding: 2px;
}

.date-size {
  width: 368px;
  height: 27.33px;
}

.full {
  width: 100%;
}

.half {
  margin: 0 1px !important;
  width: 50%;
}

.code-input {
  margin-bottom: 10px;
}

.button-payment {
  margin-bottom: 2rem;
}

.dropdown-size {
  height: 27.33px;
  padding: -2px;
  padding-left: -6px;
}
</style>
