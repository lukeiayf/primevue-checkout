<template>
  <Card style="width: 25rem; margin-bottom: 1.5em; margin-top:1.5em; align-items: center;">
    <template #content>
      <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
        <h5>Dados do Cliente</h5>
        <div class="input-area">
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-user" />
            <InputText id="username" type="text" v-model="v$.username.$model" class="full input-size"
              :class="{'full input-size p-invalid':v$.username.$invalid && submitted}" />
            <label for="username" :class="{'p-error':v$.username.$invalid && submitted}">Nome*</label>
            <!-- <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending.$response"
              class="p-error">{{v$.username.required.$message.replace('Value', 'Nome')}}</small> -->
          </span>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span class="p-float-label p-input-icon-right" style="width:54%">
              <i class="pi pi-info-circle" />
              <InputText id="cpf" type="text" v-model="v$.cpf.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.cpf.$invalid && submitted}" />
              <label for="cpf" :class="{'p-error':v$.cpf.$invalid && submitted}">CPF*</label>
            </span>
            <span class="p-float-label">
              <Calendar inputId="birthdate" v-model="birthdate" autocomplete="off" class="full date-size"
                dateFormat="dd/mm/yy" :showIcon="true" />
              <label for="birthdate">Data de nascimento</label>
            </span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span class="p-float-label p-input-icon-right" style="width:83%">
              <i class="pi pi-at"></i>
              <InputText id="email" type="text" v-model="v$.email.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.email.$invalid && submitted}" />
              <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
            </span>
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-phone"></i>
              <InputMask id="phone" type="text" v-model="phone" mask="(99)99999-999?9" class="full input-size" />
              <label for="phone">Telefone</label>
            </span>
          </div>

          <h5>Endereço</h5>
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-map-marker"></i>
            <InputText id="cep" type="text" v-model="v$.cep.$model" class="full input-size"
              :class="{'full input-size p-invalid':v$.cep.$invalid && submitted}" />
            <label for="cep" :class="{'p-error':v$.cep.$invalid && submitted}">CEP*</label>
          </span>
          <span class="p-float-label p-input-icon-right">
            <i class="pi pi-map"></i>
            <InputText id="street" type="text" v-model="v$.street.$model" class="full input-size"
              :class="{'full input-size p-invalid':v$.street.$invalid && submitted}" />
            <label for="street" :class="{'p-error':v$.street.$invalid && submitted}">Logradouro*</label>
          </span>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span class="p-float-label p-input-icon-right" style="width: 45%;">
              <i class="pi pi-home"></i>
              <InputText id="number" type="text" v-model="v$.number.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.number.$invalid && submitted}" />
              <label for="number" :class="{'p-error':v$.number.$invalid && submitted}">Número*</label>
            </span>
            <span class=" p-float-label p-input-icon-right">
              <i class="pi pi-building"></i>
              <InputText id="line2" type="text" v-model="line2" class="full input-size" />
              <label for="line2">Complemento</label>
            </span>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span class="p-float-label p-input-icon-right" style="width: 45%;">
              <i class="pi pi-flag"></i>
              <InputText id="state" type="text" v-model="v$.state.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.state.$invalid && submitted}" />
              <label for="number" :class="{'p-error':v$.state.$invalid && submitted}">Estado*</label>
            </span>
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-flag"></i>
              <InputText id="city" type="text" v-model="v$.city.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.city.$invalid && submitted}" />
              <label for="number" :class="{'p-error':v$.city.$invalid && submitted}">Cidade*</label>
            </span>
          </div>

          <h5>Dados do Pagamento</h5>

          <SelectButton class="button-payment" v-model="paymentMethod" :options="paymentOptions" optionLabel="name"
            aria-labelledby="single" style="justify-content: center; display: flex;" />

          <div style="display: flex; flex-wrap: nowrap; justify-content: center;">
            <span class="p-float-label">
              <InputNumber v-model="v$.installments.$model" id="installments" showButtons mode="decimal" :min="1"
                :max="maxInstallments" :class="{'full input-size p-invalid':v$.installments.$invalid && submitted}" />
              <label for="number" :class="{'p-error':v$.installments.$invalid && submitted}">Quantidade de
                parcelas*</label>
            </span>
          </div>
          
          <!-- <CreditCardComponent v-if="paymentMethod.value == 1"></CreditCardComponent> -->
          <div v-if="paymentMethod.value == 1">
            <div class="input-area">
              <span class="p-float-label">
                <Dropdown inputStyle="padding: 2px; padding-left: 6px" v-model="v$.cardBrand.$model" id="cardBrand"
                  :options="brands" option-label="name" class="full dropdown-size"
                  :class="{'full dropdown-size p-invalid':v$.cardBrand.$invalid && submitted}" />
                <label for="number" :class="{'p-error':v$.cardBrand.$invalid && submitted}">Bandeira*</label>
              </span>
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-credit-card"></i>
                <InputText id="cardNumber" type="text" v-model="v$.cardNumber.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.cardNumber.$invalid && submitted}" />
                <label for="number" :class="{'p-error':v$.cardNumber.$invalid && submitted}">Número do cartão*</label>
              </span>
              <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <span style="width: 45%;">
                  <div class="field col-12 md:col-4">
                    <Calendar inputId="month" class="dropdown-size" v-model="v$.month.$model" view="month" dateFormat="mm/yy"
                      placeholder="Vencimento" touchUI :showIcon="true"
                      :class="{'full input-size p-invalid':v$.cardNumber.$invalid && submitted}" />
                  </div>
                </span>
                <span class="p-float-label p-input-icon-right" style="width: 45%;">
                  <i class="pi pi-lock"></i>
                  <InputText id="securityCode" type="text" v-model="v$.securityCode.$model" class="full input-size" style="width: 100%"
                    :class="{'full input-size p-invalid':v$.securityCode.$invalid && submitted}" />
                  <label for="number" :class="{'p-error':v$.securityCode.$invalid && submitted}">CVV*</label>
                </span>
              </div>
            
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-user"></i>
                <InputText id="holderName" type="text" v-model="v$.holderName.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.holderName.$invalid && submitted}" />
                <label for="number" :class="{'p-error':v$.holderName.$invalid && submitted}">Nome do titular*</label>
              </span>
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-info-circle"></i>
                <InputText id="holderDocument" type="text" v-model="v$.holderDocument.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.holderDocument.$invalid && submitted}" />
                <label for="number" :class="{'p-error':v$.holderDocument.$invalid && submitted}">CPF do titular*</label>
              </span>
            </div>            
          </div>

          <Button type="submit" label="Confirmar transação" class="full" v-if="paymentMethod.value == 1" />
          <Button type="submit" label="Confirmar transação" class="full" v-tooltip="'Será gerado um Boleto Bancário'"
            v-if="paymentMethod.value == 2" />
          <Button type="submit" label="Confirmar transação" class="full" v-tooltip="'Será gerado um QR code'"
            v-if="paymentMethod.value == 3" />
        </div>
      </form>
    </template>
  </Card>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import CreditCardComponent from './CreditCardComponent.vue';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown'

const birthdate = ref();
const phone = ref();
const maxInstallments = ref(12);
const submitted = ref(false);
const line2 = ref()

const defaultState = reactive({
  username: '',
  email: '',
  cpf: '',
  cep: '',
  street: '',
  number: '',
  state: '',
  city: '',
  installments: 1,
  cardBrand: '',
  cardNumber: '',
  month: '',
  securityCode: '',
  holderName: '',
  holderDocument: '',

});

const rules = {
  username: { required },
  email: { required, email },
  cpf: { required, minLengthValue: minLength(11) },
  cep: { required, minLengthValue: minLength(8) },
  street: { required },
  number: { required },
  state: { required },
  city: { required },
  installments: { required },
  cardBrand: { required },
  cardNumber: { required, minLengthValue:minLength(13), maxLengthValue:maxLength(16) },
  month: { required },
  securityCode: { required, minLengthValue:minLength(3) },
  holderName: { required },
  holderDocument: { required, minLengthValue: minLength(11), maxLengthValue: maxLength(14) }
};

const v$ = useVuelidate(rules, defaultState);

const handleSubmit = (isFormValid) => {
  submitted.value = true;
  if (!isFormValid) {
    console.log('n passou')
    console.log(v$.$errors)
  } else {
    console.log('passou')
  }

};

const paymentMethod = ref({
  name: 'Cartão',
  value: 1,
  message: ''
});

const paymentOptions = [
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

const brands = ref([
  {
    name: 'Mastercard',
    id: 1
  },
  {
    name: 'Rede',
    id: 2
  },
  {
    name: 'Elo',
    id: 3
  }
]);


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
