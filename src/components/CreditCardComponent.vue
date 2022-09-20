<template>
  <div class="input-area">
    <span class="p-float-label">
      <Dropdown inputStyle="padding: 2px; padding-left: 6px" v-model="cardBrand" id="cardBrand" :options="brands"
        option-label="name" class="full dropdown-size" />
      <label for="cardBrand">Bandeira</label>
    </span>
    <span class="p-float-label">
      <InputText id="cardNumber" type="text" v-model="cardNumber" class="full input-size" />
      <label for="cardNumber">Número do cartão</label>
    </span>
    <div style="display: flex; flex-direction: row; justify-content: space-between;">
      <span style="width: 25%;">
        <div class="field col-12 md:col-4">
          <Calendar inputId="month" class="dropdown-size" v-model="month" view="month" dateFormat="mm" placeholder="Mês" touchUI />
        </div>
      </span>
      <span  style="width: 25%;">
        <div class="field col-12 md:col-4 ">
          <Calendar inputId="year" class="dropdown-size" v-model="year"  view="year" dateFormat="yy" placeholder="Ano"  touchUI />
        </div>
      </span>
      <span class="p-float-label" style="width: 45%;">
        <InputText id="securityCode" type="text" v-model="securityCode" class="input-size" style="width: 100%" />
        <label for="securityCode">CVV</label>
      </span>
    </div>

    <span class="p-float-label">
      <InputText id="holderName" type="text" v-model="holderName" class="full input-size" />
      <label for="holderName">Nome do titular</label>
    </span>
    <span class="p-float-label">
      <InputText id="holderDocument" type="text" v-model="holderDocument" class="full input-size" />
      <label for="holderDocument">CPF do titular</label>
    </span>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'

const cardBrand = ref();
const cardNumber = ref();
const month = ref();
const year = ref();
const securityCode = ref();
const holderName = ref();
const holderDocument = ref();
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

.full {
  width: 100%;
}

.input-size {
  padding: 2px;
}


.dropdown-size {
  height: 27.33px;
  padding: -2px;
  padding-left: -6px;
}
</style>
