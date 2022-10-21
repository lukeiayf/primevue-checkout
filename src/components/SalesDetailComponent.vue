<template>
  <Card style="width: 30rem; margin-bottom: 1.5em; margin-top: 1.5em; align-items: center;">
    <template #title>
      <div style="display: flex; justify-content:flex-start; flex-direction: column">
        <img style="width:150px; margin: 1rem" src="..\assets\bempaggo.png" />
      </div>
    </template>
    <template #subtitle>
      <div class="margin" style="display: flex; justify-content: center; align-items: flex-start;">
        <h5>{{$t('detalhesCompraTitulo')}}</h5>
      </div>
    </template>
    <template #content>

      <div style="display: flex; justify-content: center; background-color: lightgrey;">
        <img :src="imgSrc" style="width:150px;" />
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
import { useSalesDetailsStore } from "../store/saleDetailsStore";
import { Ref, ref } from "vue";
import { Backend } from "@/services/backend";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";


  
let paymentPage: Ref<PaymentPageResponse> = ref(new PaymentPageResponse());

Backend.getInstance().getPagePayImplementation().getPaymentPage(1).then(
	result => {
		paymentPage.value = result;
	}
);



const imgSrc = "src/assets/logo.png";
const detailStore = useSalesDetailsStore();
const fakeData = {
	uuid: "90076629-34dc-4a26-a333-22fab585ff5d",
	value: 10.50,
	plan: {
		name: "Plano Pro",
		id: 1,
		maxInstallments: 1,
		accessionValue: 1,
		value: 10.50,
		description: "Descrição",
		frequency: "mensal",
		trialDays: 15
	},
	image: "https://image.io/product.jpeg",
	looseMaxInstallments: 2,
	saleDescription: "Descrição",
	paymentMethods: [
		"CREDIT_CARD",
		"PIX",
		"BANKSLIP"
	],
	installmentType: "CARD_INSTALLMENT",
	affiliate: {
		id: 1,
		name: "netflix",
		businessName: "netflix nome"
	}
};


function loadSaleDetails() {
	detailStore.createNewSalesDetail(fakeData);
	//detailStore.createNewSalesDetail(paymentPageResponse);
}

loadSaleDetails();



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
</style>
