<template>
  <Card style="width: 50rem; margin-bottom: 1.5em; margin-top:1.5em; align-items: center;">
    <template #content>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <h5>{{$t('dadosCliente')}}</h5>
        <div class="input-area">
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-user" />
            <InputText id="username" type="text" v-model="v$.username.$model" class="full input-size"
              :class="{'full input-size p-invalid':v$.username.$invalid && submitted}" />
            <label for="username" :class="{'p-error':v$.username.$invalid && submitted}">{{$t('cliente.nome')}}*</label>
            <!-- <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response"
              class="p-error">{{v$.username.required.$message.replace('Value', 'Nome')}}</small> -->
          </span>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span class="p-float-label p-input-icon-right" style="width:54%">
              <i class="pi pi-info-circle" />
              <InputMask id="cpf" type="text" v-model="v$.cpf.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.cpf.$invalid && submitted}" mask="99999999999" />
              <label for="cpf">{{$t('cliente.cpf')}}*</label>
            </span>
            <span class="p-float-label">
              <Calendar inputId="birthdate" v-model="birthdate" autocomplete="off" class="full date-size"
              dateFormat="dd/mm/yy" :showIcon="true" />
              <label for="birthdate">{{$t('cliente.nascimento')}}</label>
            </span>
          </div>
          <InlineMessage v-if="messages.length">{{messages[0]?.content}}</InlineMessage>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span class="p-float-label p-input-icon-right" style="width:83%">
              <i class="pi pi-at"></i>
              <InputText id="email" type="text" v-model="v$.email.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.email.$invalid && submitted}" />
              <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">{{$t('cliente.email')}}*</label>
            </span>
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-phone"></i>
              <InputMask id="phone" type="text" v-model="phone" mask="(99)99999-999?9" class="full input-size" />
              <label for="phone">{{$t('cliente.telefone')}}</label>
            </span>
          </div>

          <h5>{{$t('dadosEndereco')}}</h5>
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-map-marker"></i>
            <InputText id="zipcode" type="text" v-model="v$.zipcode.$model" class="full input-size"
              :class="{'full input-size p-invalid':v$.zipcode.$invalid && submitted}" />
            <label for="zipcode" :class="{'p-error':v$.zipcode.$invalid && submitted}">{{$t('endereco.cep')}}*</label>
          </span>
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-map"></i>
            <InputText id="street" type="text" v-model="v$.street.$model" class="full input-size"
              :class="{'full input-size p-invalid':v$.street.$invalid && submitted}" />
            <label for="street" :class="{'p-error':v$.street.$invalid && submitted}">{{$t('endereco.logradouro')}}*</label>
          </span>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span class="p-float-label p-input-icon-right" style="width: 45%;">
              <i class="pi pi-home"></i>
              <InputText id="number" type="text" v-model="v$.number.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.number.$invalid && submitted}" />
              <label for="number" :class="{'p-error':v$.number.$invalid && submitted}">{{$t('endereco.numero')}}*</label>
            </span>
            <span class=" p-float-label p-input-icon-right">
              <i class="pi pi-building"></i>
              <InputText id="line2" type="text" v-model="line2" class="full input-size" />
              <label for="line2">{{$t('endereco.complemento')}}</label>
            </span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span class="p-float-label p-input-icon-right" style="width: 45%;">
              <i class="pi pi-flag"></i>
              <InputText id="state" type="text" v-model="v$.state.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.state.$invalid && submitted}" />
              <label for="number" :class="{'p-error':v$.state.$invalid && submitted}">{{$t('endereco.estado')}}*</label>
            </span>
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-flag"></i>
              <InputText id="city" type="text" v-model="v$.city.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.city.$invalid && submitted}" />
              <label for="number" :class="{'p-error':v$.city.$invalid && submitted}">{{$t('endereco.cidade')}}*</label>
            </span>
          </div>

          <Button label="Enviar código de verificação" class="full" v-tooltip="'Será enviado um código para o e-mail e telefone informados'" @click="sendCode"/>
          <div v-if="showFields">
            <InputText id="verificationCode" type="text" v-model="verificationCode" class="full input-size" placeholder="Insira o código enviado"></InputText>
            <Button type="button" label="Verificar código" class="full"/>
          </div>
          
          <div v-if="codeVerified && !showFields">
            <h5>{{$t('dadosPagamento')}}</h5>

            <SelectButton class="button-payment" v-model="paymentMethod" :options="paymentOptions" optionLabel="name"
              aria-labelledby="single" style="justify-content: center; display: flex;" />

            <div style="display: flex; flex-wrap: nowrap; justify-content: center;">
              <span class="p-float-label">
                <InputNumber v-model="v$.installments.$model" id="installments" showButtons mode="decimal" :min="1"
                  :max="maxInstallments" :class="{'full input-size p-invalid':v$.installments.$invalid && submitted}" />
                <label for="number" :class="{'p-error':v$.installments.$invalid && submitted}">{{$t('quantidadeParcelas')}}*</label>
              </span>
            </div>

            <div v-if="paymentMethod.value == 1" class="input-area" style="margin-top: 25px">
              <span class="p-float-label">
                <Dropdown inputStyle="padding: 2px; padding-left: 6px" v-model="v$.cardBrand.$model" id="cardBrand"
                  :options="brands" option-label="name" class="full dropdown-size"
                  :class="{'full dropdown-size p-invalid':v$.cardBrand.$invalid && submitted}" />
                <label for="number" :class="{'p-error':v$.cardBrand.$invalid && submitted}">{{$t('cartao.bandeira')}}*</label>
              </span>
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-credit-card"></i>
                <InputText id="cardNumber" type="text" v-model="v$.cardNumber.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.cardNumber.$invalid && submitted}" @blur="verifyCard()" />
                <label for="number" :class="{'p-error':v$.cardNumber.$invalid && submitted}">{{$t('cartao.numero')}}*</label>
              </span>
              <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <span style="width: 45%;">
                  <div class="field col-12 md:col-4">
                    <Calendar inputId="month" class="dropdown-size" v-model="v$.month.$model" view="month"
                      :minDate="minDate" dateFormat="mm/yy" placeholder="Vencimento" touchUI :showIcon="true"
                      :class="{'full input-size p-invalid':v$.cardNumber.$invalid && submitted }" />
                  </div>
                </span>
                <span class="p-float-label p-input-icon-right" style="width: 45%;">
                  <i class="pi pi-lock"></i>
                  <InputText id="securityCode" type="text" v-model="v$.securityCode.$model" class="full input-size"
                    style="width: 100%" :class="{'full input-size p-invalid':v$.securityCode.$invalid && submitted}" />
                  <label for="number" :class="{'p-error':v$.securityCode.$invalid && submitted}">{{$t('cartao.codigo')}}*</label>
                </span>
              </div>

              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-user"></i>
                <InputText id="holderName" type="text" v-model="v$.holderName.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.holderName.$invalid && submitted}" />
                <label for="number" :class="{'p-error':v$.holderName.$invalid && submitted}">{{$t('cartao.nomeTitular')}}*</label>
              </span>
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-info-circle"></i>
                <InputText id="holderDocument" type="text" v-model="v$.holderDocument.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.holderDocument.$invalid && submitted}" />
                <label for="number" :class="{'p-error':v$.holderDocument.$invalid && submitted}">{{$t('cartao.documentoTitular')}}*</label>
              </span>
            </div>
          </div>

          <div v-if="codeVerified && !showFields">
            <Button type="submit" :label= "$t('botao.finalizarTransacao')" class="full" v-if="paymentMethod.value == 1" />
            <Button type="submit" :label= "$t('botao.finalizarTransacao')" class="full" v-tooltip="'Será gerado um Boleto Bancário'"
              v-if="paymentMethod.value == 2" />
            <Button type="submit" :label= "$t('botao.finalizarTransacao')" class="full" v-tooltip="'Será gerado um QR code'"
              v-if="paymentMethod.value == 3" />  
          </div>
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InlineMessage from 'primevue/inlinemessage';
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

function addMessages(text:string) {
    messages.push({
      severity: 'warn',
      content: text,
      id: 1
  })
    console.log(messages[0].content);
    console.log(messages.length);
}

function sendCode(){
  showFields.value = true;
  codeVerified.value = true;
  console.log(showFields);
  return showFields.value;
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

.button-payment {
  margin-bottom: 2rem;
}

.dropdown-size {
  height: 27.33px;
  padding: -2px;
  padding-left: -6px;
}
</style>
