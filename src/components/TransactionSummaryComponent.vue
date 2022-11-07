<template>
  <Card class="transaction-summary-card">
    <template #title>
      <div class="title">
        <h5>{{ $t('sumarioTransacao') }}</h5>
      </div>
    </template>
    <template #content>
      <h5>{{ $t('dadosCliente') }}</h5>
      <ul class="list">
        <li class="item-list">
          <strong>{{ $t('cliente.nome') }}</strong>: {{ props.customer.name }}
        </li>
        <li class="item-list">
          <strong>{{ $t('cliente.email') }}</strong>: {{ props.customer.email }}
        </li>
      </ul>
      <h5>{{ $t('dadosPagamento') }}</h5>
      <ul class="list">
        <li class="item-list">
          <strong>{{ $t('metodoPagamento') }}</strong>: {{ paymentMethod }}
        </li>
        <li class="item-list">
          <strong>{{ $t('quantidadeParcelas') }}</strong>: {{ props.payment.installments }}
        </li>
        <li type="date" v-if="props.paymentMethod == 'PIX'" class="item-list">
          <strong>{{ $t('detalhesPagamento.dataExpiracao') }}</strong>: {{ date }}
        </li>
        <li v-if="props.paymentMethod == 'BANKSLIP'" class="item-list">
          <strong>{{ $t('detalhesPagamento.dataVencimento') }}</strong>: {{ date }}
        </li>
      </ul>
      <div v-if="props.paymentMethod == 'BANKSLIP'" class="center">
        <img :src="imgSrcBankslip" class="img-barcode" alt="Boleto" />
      </div>
      <div v-if="props.paymentMethod == 'PIX'" class="container-qrcode">
        <img :src="imgSrcPix" class="img-qrcode" alt="PIX" />
        <Button type="submit" id="btn-copy" class="button" v-tooltip="'Clique para copiar'" v-if="props.paymentMethod == 'PIX'" icon="pi pi-copy"
          iconPos="left" @click="copyEmv()">{{textButton}}</Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import "moment/locale/pt-br";
import { CustomerResponse } from "@/models/response/customerResponse";
import { SaleRequest } from "@/models/request/paymentRequest";
import { Backend } from "@/services/backend";
import { Ref, ref } from "vue";
import moment from "moment";
import Button from "primevue/button";


const imgSrcBankslip = "src/assets/boleto-logo.svg";
const imgSrcPix = "src/assets/qrcode.png";
const props = defineProps<{
  customer: CustomerResponse;
  payment: SaleRequest;
  location: string;
  paymentMethod: string;
}>();

let date: Ref<string> = ref("");
let code: Ref<string> = ref("");
let textButton: Ref<string> = ref("Pix copia e cola");



Backend.getInstance().getPaymentImplementation().getPaymentInfo(props.location).then(
	result => {
		date.value = moment(result.date).format("DD/MM/yyyy");
		code.value = result.code;
	}
);

function copyEmv(){
	navigator.clipboard.writeText(code.value);
	textButton.value = "Copiado!";
	document.getElementById("btn-copy").classList.add("copy");
}
</script> 

<style lang="scss" scoped>
.center{
  display: flex; 
  justify-content: center;
}
.title{
  display: flex; 
  justify-content:flex-start; 
  flex-direction: column
}
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

.container-qrcode {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.button {
  width: 10rem !important;
}
.copy {
  background-color: #5eb37f;
  border: #5eb37f;
}
.img-barcode{
  width:400px;
}

.img-qrcode{
  width:200px;
}

.transaction-summary-card{
  width: 50rem;
  margin-bottom: 1.5em;
  margin-top: 1.5em;
  align-items: center;
}
</style>
