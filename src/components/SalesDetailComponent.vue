<template>
  <Card class="sale-details-card">
    <template #title>
      <div class="margin center">
        <h5>{{ $t('detalhesCompraTitulo') }}</h5>
      </div>
      
    </template>
    <template #content>

      <div class="center">
        <img :src="imgSrc" class="img" />
      </div>
      <ul class="list p-icon-right">
        <li class="item-list" v-if="paymentPage.plan?.accessionValue">
          <span>
            {{ $t('detalhesCompra.adesao') }}
          </span>
          <span>
            <strong>R${{ paymentPage.plan.accessionValue }}</strong>
          </span>
          <!-- <i class="pi pi-dollar"></i> -->
        </li>
        <Divider v-if="paymentPage.plan?.accessionValue" />
        <li class=item-list v-if="paymentPage.loose?.value">
          <span>
            {{ $t('detalhesCompra.valorPrincipal') }}
          </span>
          <span>
            <strong>R${{ paymentPage.loose?.value }}</strong>
          </span>
          <!-- <i class="pi pi-dollar"></i> -->
        </li>
        <Divider v-if="paymentPage.loose?.value" />
        <li class=item-list v-if="paymentPage.plan?.value">
          <span>
            {{ $t('detalhesCompra.valorPlano') }}
          </span>
          <span>
            <strong>R${{ paymentPage.plan?.value }}</strong>
          </span>
          <!-- <i class="pi pi-dollar"></i> -->
        </li>
        <Divider v-if="paymentPage.plan?.value" />
        <li class=item-list v-if="paymentPage.plan?.accessionValue">
          <span>
            {{ $t('detalhesCompra.total') }}
          </span>
          <span>
            <strong>R${{ paymentPage.plan?.accessionValue ?
                (paymentPage.plan?.accessionValue + paymentPage.plan?.value) :
                paymentPage.plan?.value
            }}</strong>
          </span>
          <!-- <i class="pi pi-money-bill"></i> -->
        </li>
        <Divider v-if="paymentPage.plan?.accessionValue" />
        <li class=item-list v-if="paymentPage.plan?.frequency">
          <span>
            {{ $t('detalhesCompra.periodicidade.titulo') }}
          </span>
          <span>
            <strong>
              {{ $t(`detalhesCompra.periodicidade.${paymentPage.plan.frequency}`) }}
            </strong>
          </span>
          <!-- <i class="pi pi-calendar"></i> -->
        </li>
        <Divider v-if="paymentPage.plan?.frequency" />
        <li class=item-list v-if="paymentPage.plan?.name">
          <span>
            {{ $t('detalhesCompra.nomePlano') }}
          </span>
          <span>
            <strong>
              {{ paymentPage.plan?.name }}
            </strong>
          </span>
          <!-- <i class="pi pi-info-circle"></i> -->
        </li>
        <Divider v-if="paymentPage.plan?.name" />
        <li class=item-list v-if="paymentPage.affiliate?.name">
          <span>
            {{ $t('detalhesCompra.loja') }}
          </span>
          <span>
            <strong>
              {{ paymentPage.affiliate?.name }}
            </strong>
          </span>
          <!-- <i class="pi pi-shopping-cart"></i> -->
        </li>
        <Divider v-if="paymentPage.affiliate?.name" />
        <li class=item-list v-if="paymentPage.description">
          <span>
            {{ $t('detalhesCompra.descricao') }}
          </span>
          <span>
            <strong>{{ paymentPage.description }}</strong>
          </span>
          <!-- <i class="pi pi-info"></i> -->
        </li>
      </ul>
      <div class="title-logo">
        <img class="logo" src="..\assets\bempaggo.png" />
      </div>
    </template>

  </Card>

</template>

<script setup lang="ts">
import Card from "primevue/card";
import { Ref, ref } from "vue";
import { Backend } from "@/services/backend";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";
import Divider from "primevue/divider";

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

span {
  font-size: 1rem;
}

.item-list {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  padding: 0.2rem;
  font-size: small;
}

.margin {
  margin-bottom: -30px;
  color: #495057;
}

.logo {
  width: 150px;
  margin: auto;
}

.img {
  height: 150px;
  border-radius: 10px;
}

.title-logo {
  display: flex;
  justify-content: center;
  flex-direction: column
}

.center {
  display: flex;
  justify-content: center;
}

.sale-details-card {
  width: 30rem;
  margin-bottom: 1.5em;
  margin-top: 1.5em;
  align-items: center;
	border-radius: 5px !important;
}

.p-divider-solid.p-divider-horizontal:before {
  border-top-style: solid !important;
}

@media screen and (max-width: 800px) {
  .sale-details-card {
    width: 97vw !important;
    margin-bottom: 1.5em;
    margin-top: 1.5em;
    align-items: center;
  }
}
</style>
