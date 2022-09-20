<template>
  <Card style="width: 25rem; margin-bottom: 2em; align-items: center;">
    <template #content>
      <h5>Dados do Cliente</h5>
      <div class="input-area">
        <span class="p-float-label">
          <InputText id="username" type="text" v-model="username" class="full input-size" />
          <label for="username">Nome</label>
        </span>
        <span class="p-float-label">
          <InputText id="cpf" type="text" v-model="cpf" class="full input-size" />
          <label for="cpf">CPF</label>
        </span>
        <span class="p-float-label">
          <Calendar inputId="birthdate" v-model="birthdate" autocomplete="off" class="full date-size"
            dateFormat="dd/mm/yy" />
          <label for="birthdate">Data de nascimento</label>
        </span>
        <span class="p-float-label">
          <InputText id="email" type="text" v-model="email" class="full input-size" />
          <label for="email">Email</label>
        </span>
        <span class="p-float-label">
          <InputMask id="phone" type="text" v-model="phone" mask="(99)99999-999?9" class="full input-size" />
          <label for="phone">Telefone</label>
        </span>

        <h5>Endereço</h5>
        <span class="p-float-label">
          <InputText id="cep" type="text" v-model="cep" class="full input-size" />
          <label for="cep">CEP</label>
        </span>
        <span class="p-float-label">
          <InputText id="street" type="text" v-model="street" class="full input-size" />
          <label for="street">Logradouro</label>
        </span>
        <span class="p-float-label">
          <InputText id="number" type="text" v-model="number" class="full input-size" />
          <label for="number">Número</label>
        </span>
        <span class="p-float-label">
          <InputText id="line2" type="text" v-model="line2" class="full input-size" />
          <label for="line2">Complemento</label>
        </span>
        <span class="p-float-label">
          <InputText id="state" type="text" v-model="state" class="full input-size" />
          <label for="state">Estado</label>
        </span>
        <span class="p-float-label">
          <InputText id="city" type="text" v-model="city" class="full input-size" />
          <label for="city">Cidade</label>
        </span>

        <h5>Dados do Pagamento</h5>
        
        <SelectButton class="button-payment" v-model="paymentMethod" :options="paymentOptions" optionLabel="name" aria-labelledby="single" />

        <div style="display: flex; flex-wrap: nowrap; width: 100%">
          <span class="p-float-label">
            <InputNumber v-model="installments" id="installments" showButtons mode="decimal" :min="1" :max="12" />
            <label for="installments">Quantidade de parcelas</label>
          </span>
        </div>
        <CreditCardComponent v-if="paymentMethod.value==1"></CreditCardComponent>
      </div>

    </template>
  </Card>
</template>

<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask';
import InputNumber from 'primevue/inputnumber';
import SelectButton from 'primevue/selectbutton';
import CreditCardComponent from './CreditCardComponent.vue';

const username = ref();
const cpf = ref();
const birthdate = ref();
const email = ref();
const phone = ref();
const cep = ref();
const street = ref();
const number = ref();
const line2 = ref();
const state = ref();
const city = ref();
const installments = ref();
const paymentMethod = ref({
  name: 'Cartão',
  value: 1
})
console.log(paymentMethod);
const paymentOptions = [
  {
    name: 'Cartão', value: 1
  },
  {
    name: 'Boleto', value: 2
  },
  {
    name: 'Pix', value: 3
  },
]


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
