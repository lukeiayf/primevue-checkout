<template>
  <div class="flex-nowrap">
    <span class="p-float-label">
      <InputNumber v-model="v$.installments.$model" id="installments" showButtons mode="decimal" :min="1"
        :max="props.maxInstallments" :class="{ 'full input-size p-invalid': v$.installments.$invalid && props.submitted }" />
      <label for="number" :class="{ 'p-error': v$.installments.$invalid && props.submitted }">{{ $t('quantidadeParcelas') }}*</label>
    </span>
  </div>
  
  <div v-if="v$.paymentMethod.$model.value == 'CREDIT_CARD'" class="input-area" style="margin-top: 25px">
    <div>
      <span class="p-float-label" v-if="v$.cardNumber.$model.length > 13">
        <Dropdown required inputStyle="padding: 2px; padding-left: 6px" v-model="v.cardBrand.$model" id="cardBrand"
          :options="brandsAdministradoras" option-label="name" class="full dropdown-size"
          :class="{ 'full dropdown-size p-invalid': v.cardBrand.$invalid && props.submitted }" />
        <label for="number" :class="{ 'p-error': v.cardBrand.$invalid && props.submitted }">{{ $t('cartao.bandeira') }}*</label>
      </span>
      <small v-if="(v.cardBrand.$invalid && props.submitted) || v.cardBrand.$pending"
        class="p-error">{{ $t('erros.cartao.bandeiraRequerida') }}</small>
    </div>
    <div>
      <span class="p-float-label p-input-icon-right">
        <i class="pi pi-credit-card"></i>
        <InputText required id="cardNumber" type="text" v-model="v$.cardNumber.$model" maxlength="19" class="full input-size"
          :class="{ 'full input-size p-invalid': v$.cardNumber.$invalid && props.submitted }"
          @blur="verifyCard(v$.cardNumber.$model)" />
        <label for="number" :class="{ 'p-error': v$.cardNumber.$invalid && props.submitted }">{{ $t('cartao.numero') }}*</label>
      </span>
      <small v-if="(v$.cardNumber.$invalid && props.submitted) || v$.cardNumber.$pending"
        class="p-error">{{ $t('erros.cartao.numeroRequerido') }}</small>
    </div>
    <div class="flex-row">
      <div class="width-45">
        <span>
          <div class="field col-12 md:col-4">
            <Calendar required inputId="dueDate" class="dropdown-size" v-model="v$.dueDate.$model" view="month"
              :minDate="today" dateFormat="mm/yy" placeholder="Vencimento" :showIcon="true"
              :class="{ 'full input-size p-invalid': v$.dueDate.$invalid && props.submitted }" />
          </div>
        </span>
        <small v-if="(v$.dueDate.$invalid && props.submitted) || v$.dueDate.$pending"
          class="p-error">{{ $t('erros.cartao.validadeRequerida') }}</small>
      </div>
      <div class="width-45">
        <span class="p-float-label p-input-icon-right">
          <i class="pi pi-lock"></i>
          <InputText required id="securityCode" v-model="v$.securityCode.$model" class="full input-size"
            :class="{ 'full input-size p-invalid': v$.securityCode.$invalid && props.submitted }" />
          <label for="number" :class="{ 'p-error': v$.securityCode.$invalid && props.submitted }">{{ $t('cartao.codigo') }}*</label>
        </span>
        <small v-if="(v$.securityCode.$invalid && props.submitted) || v$.securityCode.$pending"
          class="p-error">{{ $t('erros.cartao.codigoRequerido') }}</small>
      </div>
    </div>
    <div>
      <span class="p-float-label p-input-icon-right">
        <i class="pi pi-user"></i>
        <InputText required id="holderName" type="text" v-model="v$.holderName.$model" class="full input-size"
          :class="{ 'full input-size p-invalid': v$.holderName.$invalid && props.submitted }" />
        <label for="number" :class="{ 'p-error': v$.holderName.$invalid && props.submitted }">{{ $t('cartao.nomeTitular') }}*</label>
      </span>
      <small v-if="(v$.holderName.$invalid && props.submitted) || v$.holderName.$pending"
        class="p-error">{{ $t('erros.cartao.nomeRequerido') }}</small>
    </div>
    <div>
      <span class="p-float-label p-input-icon-right">
        <i class="pi pi-info-circle"></i>
        <InputText required id="holderDocument" type="text" v-model="v$.holderDocument.$model" class="full input-size"
          :class="{ 'full input-size p-invalid': v$.holderDocument.$invalid && props.submitted }"
          @Change="validDocument(v$.holderDocument.$model)" />
        <label for="number"
          :class="{ 'p-error': v$.holderDocument.$invalid && props.submitted }">{{ $t('cartao.documentoTitular') }}*</label>
      </span>
      <small v-if="(v$.holderDocument.$invalid && props.submitted) || v$.holderDocument.$pending"
        class="p-error">{{ $t('erros.cartao.documentoRequerido') }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import { validDocument } from "@/helpers/validDocument";
import { v, brandsAdministradoras, verifyCard } from "@/helpers/verifyCard";
import InputNumber from "primevue/inputnumber";
import { Ref, ref } from "vue";
import { v$ } from "@/helpers/vuelidadeConfig";

const today: Ref<Date> = ref(new Date());

const props = defineProps<{
  submitted: boolean;
  maxInstallments: number;
}>();
</script>


<style lang="scss" scoped>
.flex-row {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
}
.flex-nowrap {
  display: flex !important;
  flex-wrap: nowrap !important;
  justify-content: center !important;
}
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

.width-45 {
  width: 45%
}
</style>
