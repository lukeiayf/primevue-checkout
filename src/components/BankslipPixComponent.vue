<template>
  <div>
    <h5>Selecionar método de pagamento</h5>
    <div class="field-radiobutton">
      <!-- <RadioButton inputId="paymentMethod" name="paymentMethod.name" value="paymentMethod.value" v-model="confirm" />
      <label for="paymentMethod">{{paymentMethod}}</label> -->
      <span>{{testeProps}}</span>
      <span>{{paymentMethod}}</span>
    </div>
  </div>


</template>

<script setup>
import { onMounted, defineProps, ref } from 'vue';
import RadioButton from 'primevue/radiobutton';

defineProps([
  "testeProps",
  "paymentMethod"
])

const confirm = ref();


</script>

<style lang="scss" scoped>

</style>
