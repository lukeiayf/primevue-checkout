<template>
  <Card class="sale-details-card">
    <template #title>
      <div class="flex-start-column">
        <img class="logo" src="..\assets\bempaggo.png" />
      </div>
    </template>
    <template #subtitle>
      <div class="margin center">
        <h5>{{$t('detalhesCompraTitulo')}}</h5>
      </div>
    </template>
    <template #content>

      <div class="center">
        <img :src="imgSrc" class="img"/>
      </div>
      <ul class="list">
        <li class=item-list v-if="paymentPage.plan?.accessionValue">
          <strong>{{$t('detalhesCompra.adesao')}}</strong>: {{paymentPage.plan.accessionValue}}
        </li>
        <li class=item-list v-if="paymentPage.loose?.value">
          <strong>{{$t('detalhesCompra.valorPrincipal')}}</strong>: {{paymentPage.loose?.value}}
        </li>
        <li class=item-list v-if="paymentPage.plan?.value">
          <strong>{{$t('detalhesCompra.valorPlano')}}</strong>: {{paymentPage.plan?.value}}
        </li>
        <li class=item-list v-if="paymentPage.plan">
          <strong>{{$t('detalhesCompra.total')}}</strong>: {{paymentPage.plan?.accessionValue ?
          (paymentPage.plan?.accessionValue + paymentPage.plan?.value) :
          paymentPage.plan?.value }}
        </li>
        <li class=item-list v-if="paymentPage.plan?.frequency">
          <strong>{{$t('detalhesCompra.periodicidade')}}</strong>:{{paymentPage.plan?.frequency}}
        </li>
        <li class=item-list v-if="paymentPage.plan?.name">
          <strong>{{$t('detalhesCompra.nomePlano')}}</strong>: {{paymentPage.plan?.name}}
        </li>
        <li class=item-list v-if="paymentPage.affiliate?.name">
          <strong>{{$t('detalhesCompra.loja')}}</strong>: {{paymentPage.affiliate?.name}}
        </li>
        <li class=item-list v-if="paymentPage.description">
          <strong>{{$t('detalhesCompra.descricao')}}</strong>: {{paymentPage.description}}
        </li>
      </ul>
    </template>

  </Card>

</template>

<script setup lang="ts">
import Card from "primevue/card";
import { Ref, ref } from "vue";
import { Backend } from "@/services/backend";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";

let imgSrc: Ref<string> = ref("");


  
let paymentPage: Ref<PaymentPageResponse> = ref(new PaymentPageResponse());

Backend.getInstance().getPagePayImplementation().getPaymentPage(1).then(
	result => {
		paymentPage.value = result;
		imgSrc.value = paymentPage.value.image;
	}
);

</script>


<style scoped>
.list {
  padding: 1rem;
  list-style: none;
}

.item-list {
  border: #d4d9de solid 1px;
  border-radius: 3px;
  margin-bottom: 5px;
  padding: 0.2rem;
  font-size: small;
}

.margin {
  margin-bottom: -30px;
  color: #495057;
}
.logo{
  width:150px; 
  margin: 1rem;
}

.img{
  height: 150px;
}
.flex-start-column{
  display: flex; justify-content:flex-start; flex-direction: column
}

.center{
  display: flex; 
  justify-content: center; 
}

.sale-details-card{
  width: 30rem;
  margin-bottom: 1.5em;
  margin-top: 1.5em;
  align-items: center;
}
</style>
