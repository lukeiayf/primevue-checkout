<template>
  <Card style="width: 50rem; margin-bottom: 1.5em; margin-top:1.5em; align-items: center;"
    v-show="!showTransactionSummary">
    <template #content>
      <form @submit.prevent="handleSubmit((!v$.$invalid && !v.$invalid) ? true : false)" class="p-fluid">
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
            <label for="street"
              :class="{'p-error':v$.street.$invalid && submitted}">{{$t('endereco.logradouro')}}*</label>
          </span>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span class="p-float-label p-input-icon-right" style="width: 45%;">
              <i class="pi pi-home"></i>
              <InputText id="number" type="text" v-model="v$.number.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.number.$invalid && submitted}" />
              <label for="number"
                :class="{'p-error':v$.number.$invalid && submitted}">{{$t('endereco.numero')}}*</label>
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

          <Button v-if="!showFields && !codeVerified" label="Enviar código de verificação" class="full"
            icon="pi pi-send" iconPos="left" v-tooltip="'Será enviado um código para o e-mail e telefone informados'"
            @click="sendCode" />
          <div v-if="showFields">
            <span class="p-float-label p-input-icon-right code-input">
              <InputText id="verificationCode" type="text" v-model="verificationCode" class="full input-size">
              </InputText>
              <label for="verificationCode">{{$t('inserirCodigo')}}*</label>
            </span>
            <div class="p-buttonset">
              <Button type="button" label="Reenviar código" class="half" icon="pi pi-refresh" iconPos="left"
                @click="sendCode()" />
              <Button type="button" label="Verificar código" class="half p-button-success" icon="pi pi-search"
                iconPos="left" @click="verifyCode()" />
            </div>
          </div>

          <div v-if="codeVerified && !showFields">
            <h5>{{$t('dadosPagamento')}}</h5>

            <SelectButton class="button-payment" v-model="paymentMethod" :options="paymentOptions" optionLabel="name"
              aria-labelledby="single" style="justify-content: center; display: flex;" />

            <div style="display: flex; flex-wrap: nowrap; justify-content: center;">
              <span class="p-float-label">
                <InputNumber v-model="v$.installments.$model" id="installments" showButtons mode="decimal" :min="1"
                  :max="maxInstallments" :class="{'full input-size p-invalid':v$.installments.$invalid && submitted}" />
                <label for="number"
                  :class="{'p-error':v$.installments.$invalid && submitted}">{{$t('quantidadeParcelas')}}*</label>
              </span>
            </div>

            <div v-if="paymentMethod.value == 1" class="input-area" style="margin-top: 25px">
              <span class="p-float-label" v-if="v$.cardNumber.$model.length > 13">
                <Dropdown inputStyle="padding: 2px; padding-left: 6px" v-model="v.cardBrand.$model" id="cardBrand"
                  :options="brands" option-label="name" class="full dropdown-size"
                  :class="{'full dropdown-size p-invalid':v.cardBrand.$invalid && submitted}" />
                <label for="number"
                  :class="{'p-error':v.cardBrand.$invalid && submitted}">{{$t('cartao.bandeira')}}*</label>
              </span>
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-credit-card"></i>
                <InputText id="cardNumber" type="text" v-model="v$.cardNumber.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.cardNumber.$invalid && submitted}" @blur="verifyCard(v$.cardNumber.$model)" />
                <label for="number"
                  :class="{'p-error':v$.cardNumber.$invalid && submitted}">{{$t('cartao.numero')}}*</label>
              </span>
              <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <span style="width: 45%;">
                  <div class="field col-12 md:col-4">
                    <Calendar inputId="month" class="dropdown-size" v-model="v$.month.$model" view="month"
                      :minDate="minDate" dateFormat="mm/yy" placeholder="Vencimento" :showIcon="true"
                      :class="{'full input-size p-invalid':v$.cardNumber.$invalid && submitted }" />
                  </div>
                </span>
                <span class="p-float-label p-input-icon-right" style="width: 45%;">
                  <i class="pi pi-lock"></i>
                  <InputText id="securityCode" type="text" v-model="v$.securityCode.$model" class="full input-size"
                    style="width: 100%" :class="{'full input-size p-invalid':v$.securityCode.$invalid && submitted}" />
                  <label for="number"
                    :class="{'p-error':v$.securityCode.$invalid && submitted}">{{$t('cartao.codigo')}}*</label>
                </span>
              </div>

              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-user"></i>
                <InputText id="holderName" type="text" v-model="v$.holderName.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.holderName.$invalid && submitted}" />
                <label for="number"
                  :class="{'p-error':v$.holderName.$invalid && submitted}">{{$t('cartao.nomeTitular')}}*</label>
              </span>
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-info-circle"></i>
                <InputText id="holderDocument" type="text" v-model="v$.holderDocument.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.holderDocument.$invalid && submitted}" />
                <label for="number"
                  :class="{'p-error':v$.holderDocument.$invalid && submitted}">{{$t('cartao.documentoTitular')}}*</label>
              </span>
            </div>
          </div>

          <div v-if="codeVerified && !showFields">
            <Button type="submit" :label="$t('botao.finalizarTransacao')" class="full" v-if="paymentMethod.value == 1"
              icon="pi pi-play" iconPos="left" />
            <Button type="submit" :label="$t('botao.finalizarTransacao')" class="full"
              v-tooltip="'Será gerado um Boleto Bancário'" v-if="paymentMethod.value == 2" icon="pi pi-play"
              iconPos="left" />
            <Button type="submit" :label="$t('botao.finalizarTransacao')" class="full"
              v-tooltip="'Será gerado um QR code'" v-if="paymentMethod.value == 3" icon="pi pi-play" iconPos="left" />
          </div>
        </div>
      </form>
    </template>
  </Card>
  
  <TransactionSummaryComponent :name="v$.username.$model" v-if="showTransactionSummary"></TransactionSummaryComponent>
  
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
import TransactionSummaryComponent from './TransactionSummaryComponent.vue';
import { validCpf, messages } from '../helpers/cpfValidator';
import { validCnpj } from '../helpers/cnpjValidator';
import { Brand, brands, verifyCard, v } from '../helpers/verifyCard';

const birthdate: Ref<any> = ref('');
const phone: Ref<string> = ref('');
const maxInstallments: Ref<number> = ref(12);
const submitted: Ref<boolean> = ref(false);
const line2: Ref<string> = ref('');
const minDate: Ref<Date> = ref(new Date());

let showFields: Ref<boolean> = ref(false);
let verificationCode: string = '';
let codeVerified: Ref<boolean> = ref(true);
let showTransactionSummary: Ref<boolean> = ref(false);
let customerName: string;



interface PaymentMethod {
  name: string,
  value: number,
  message: string,
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


const handleSubmit = (isFormValid:boolean) => {
  // debugger
  console.log(v.value.cardBrand.$invalid)
  submitted.value = true;
  if (!isFormValid) {
    console.log('n passou');
    // console.log(v$.value.cardNumber.$model.valueOf);
  } else {
    console.log('passou');
    customerName = v$.value.username.$model;
    showTransactionSummary.value = true;
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

const validDocument = (value) => {
  console.log('chamou validdocument')
  if (validCnpj(value) || validCpf(value))
    return true
}

function sendCode() {
  showFields.value = true;
  codeVerified.value = true;
  console.log(v$.value.username.$model);
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
