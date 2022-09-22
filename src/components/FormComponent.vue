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
          <CreditCardComponent v-if="paymentMethod.value == 1"></CreditCardComponent>
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
import { required, email } from '@vuelidate/validators';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import CreditCardComponent from './CreditCardComponent.vue';
import Button from 'primevue/button';


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
  installments: 1
});

const rules = {
  username: { required },
  email: { required, email },
  cpf: { required },
  cep: { required },
  street: { required },
  number: { required },
  state: { required },
  city: { required },
  installments: { required }
};

const v$ = useVuelidate(rules, defaultState);

const handleSubmit = (isFormValid) => {
  submitted.value = true;
  if (!isFormValid) {
    console.log('n passou')
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
</style>
