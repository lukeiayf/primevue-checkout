<template>
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
            placeholder="Vencimento" touchUI :showIcon="true" :class="{'full input-size p-invalid':v$.cardNumber.$invalid && submitted}"/>
        </div>
      </span>
      <span class="p-float-label p-input-icon-right" style="width: 45%;">
        <i class="pi pi-lock"></i>
        <InputText id="securityCode" type="text" v-model="v$.securityCode.$model" class="input-size" style="width: 100%"
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

</template>

<script setup>
import { reactive, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators';
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'


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

/* const validateCreditCard = isFormValid => {
  if (!isFormValid) {

    console.log('n passou')
  } else {
    console.log('passou')
  }
} */

const defaultState = reactive({
  cardBrand: '',
  cardNumber: '',
  month: '',
  securityCode: '',
  holderName: '',
  holderDocument: '',
});

const rules = {
  cardBrand: { required },
  cardNumber: { required },
  month: { required },
  securityCode: { required },
  holderName: { required },
  holderDocument: { required },
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
