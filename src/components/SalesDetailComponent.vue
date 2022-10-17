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
      <!-- <ul class="list">
        <li class="item-list" v-for="item in items" :bind="item.key"><strong>{{item.title}}</strong>: {{item?.currency
        }}{{item.value}}
        </li>
      </ul> -->
      <ul class="list">
        <li class = item-list v-if="detailStore.saleDetailsStore.plan.accessionValue">
          <strong>{{$t('detalhesCompra.adesao')}}</strong>: {{detailStore.saleDetailsStore.plan.accessionValue}}
        </li>
        <li class = item-list v-if="detailStore.saleDetailsStore.value">
          <strong>{{$t('detalhesCompra.valorPrincipal')}}</strong>: {{detailStore.saleDetailsStore.value}}
        </li>
        <li class = item-list v-if="detailStore.saleDetailsStore.plan.value">
          <strong>{{$t('detalhesCompra.valorPlano')}}</strong>: {{detailStore.saleDetailsStore.plan.value}}
        </li>
        <li class = item-list>
          <strong>{{$t('detalhesCompra.total')}}</strong>: {{detailStore.saleDetailsStore.plan.accessionValue ? (detailStore.saleDetailsStore.plan.accessionValue + detailStore.saleDetailsStore.plan.value) : detailStore.saleDetailsStore.plan.value }}
        </li>
        <li class = item-list v-if="detailStore.saleDetailsStore.plan.frequency">
          <strong>{{$t('detalhesCompra.periodicidade')}}</strong>:{{detailStore.saleDetailsStore.plan.frequency}}
        </li>
        <li class = item-list v-if="detailStore.saleDetailsStore.plan.name">
          <strong>{{$t('detalhesCompra.nomePlano')}}</strong>: {{detailStore.saleDetailsStore.plan.name}}
        </li>
        <li class = item-list v-if="detailStore.saleDetailsStore.affiliate.name">
          <strong>{{$t('detalhesCompra.loja')}}</strong>: {{detailStore.saleDetailsStore.affiliate.name}}
        </li>
        <li class = item-list v-if="detailStore.saleDetailsStore.saleDescription">
          <strong>{{$t('detalhesCompra.descricao')}}</strong>: {{detailStore.saleDetailsStore.saleDescription}}
        </li>
      </ul>
    </template>

  </Card>

</template>

<script setup>
import { storeToRefs } from "pinia";
import Card from "primevue/card";
import { useSalesDetailsStore } from "../store/saleDetailsStore";
import { PagePayService } from "../services/pagepay.services";

const imgSrc = "src/assets/logo.png";
const valorPrincipal = 25.00;
const pagePayService = new PagePayService();
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


function loadSaleDetails(){
	//let paymentPageResponse = pagePayService.getPaymentPage();
	detailStore.createNewSalesDetail(fakeData);
	//detailStore.createNewSalesDetail(paymentPageResponse);
	//chamar o services =>getpaymentpage=>usar a store no retun
}

loadSaleDetails();
const items = [
	{
		title: "Adesão",
		value: "10"
	},
	{
		title: "Valor principal",
		value: valorPrincipal,
		currency: "R$ "
	},
	{
		title: "Total",
		value: "Total"

	},
	{
		title: "Periodicidade",
		value: "Periodicidade"
	},
	{
		title: "Nome do plano",
		value: "Nome do plano"
	},
	{
		title: "Loja",
		value: "Nome da loja"
	},
	{
		title: "Descrição",
		value: "Descrição"
	},

];


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
