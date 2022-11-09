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
      <ul class="list p-icon-right">
        <li class="item-list" v-if="paymentPage.plan?.accessionValue">
          <span>
            <strong>{{$t('detalhesCompra.adesao')}}</strong>: R${{paymentPage.plan.accessionValue}}
          </span>
          <i class="pi pi-dollar"></i>
        </li>
        <li class=item-list v-if="paymentPage.loose?.value">
          <span>
            <strong>{{$t('detalhesCompra.valorPrincipal')}}</strong>: R${{paymentPage.loose?.value}}
          </span>
          <i class="pi pi-dollar"></i>
        </li>
        <li class=item-list v-if="paymentPage.plan?.value">
          <span>
            <strong>{{$t('detalhesCompra.valorPlano')}}</strong>: R${{paymentPage.plan?.value}}
          </span>
          <i class="pi pi-dollar"></i>
        </li>
        <li class=item-list v-if="paymentPage.plan">
          <span>
            <strong>{{$t('detalhesCompra.total')}}</strong>: R${{paymentPage.plan?.accessionValue ?
            (paymentPage.plan?.accessionValue + paymentPage.plan?.value) :
            paymentPage.plan?.value }}
          </span>
          <i class="pi pi-money-bill"></i>
        </li>
        <li class=item-list v-if="paymentPage.plan?.frequency">
          <span>
            <strong>{{$t('detalhesCompra.periodicidade.titulo')}}</strong>: {{$t(`detalhesCompra.periodicidade.${paymentPage.plan.frequency}`)}}
          </span>
          <i class="pi pi-calendar"></i>
        </li>
        <li class=item-list v-if="paymentPage.plan?.name">
          <span>
            <strong>{{$t('detalhesCompra.nomePlano')}}</strong>: {{paymentPage.plan?.name}}
          </span>
          <i class="pi pi-info-circle"></i>
        </li>
        <li class=item-list v-if="paymentPage.affiliate?.name">
          <span>
            <strong>{{$t('detalhesCompra.loja')}}</strong>: {{paymentPage.affiliate?.name}}
          </span>
          <i class="pi pi-shopping-cart"></i>
        </li>
        <li class=item-list v-if="paymentPage.description">
          <span>
            <strong>{{$t('detalhesCompra.descricao')}}</strong>: {{paymentPage.description}}
          </span>
          <i class="pi pi-info"></i>
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

let companyId: Ref<number> = ref(null);
let uuid: Ref<string> = ref("");

companyId.value = parseInt(window.location.pathname.split("/")[2]);
uuid.value = window.location.pathname.split("/")[3];
  
let paymentPage: Ref<PaymentPageResponse> = ref(new PaymentPageResponse());

Backend.getInstance().getPagePayImplementation().getPaymentPage(companyId.value, uuid.value).then(
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
  display: flex;
  justify-content: space-between;
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
