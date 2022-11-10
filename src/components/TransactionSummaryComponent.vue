<template>
  <Card class="transaction-summary-card">
    <template #title>
      <div class="title">
        <h5>{{ $t('sumarioTransacao') }}</h5>
      </div>
    </template>
    <template #content>
      <h5>{{ $t('dadosCliente') }}</h5>
      <ul class="list p-icon-right">
        <li class="item-list">
          <span>
            Nome
          </span>
          <span>
            {{ props.customer.name }}
          </span>
          <!-- <i class="pi pi-user" /> -->
        </li>

        <Divider />
        <li class="item-list">
          <span>
            Email
          </span>
          <span>
            {{ props.customer.email }}
          </span>
          <!-- <i class="pi pi-at"></i> -->
        </li>
      </ul>
      <h5>{{ $t('dadosPagamento') }}</h5>

      <ul class="list">
        <li class="item-list">
          <span>
            Método de pagamento
          </span>
          <span>
            {{ $t(`transactionSummary.${paymentMethod}`) }}
          </span>
          <!-- <i class="pi pi-dollar"></i> -->
        </li>
        <Divider />
        <li class="item-list">
          <span>
            Parcelas
          </span>
          <span>
            {{ props.payment.installments }}
          </span>
          <!-- <i class="pi pi-money-bill"></i> -->
        </li>
        <Divider />
        <li class="item-list" v-if="props.paymentMethod == 'CREDIT_CARD'">
          Status da transação
          <span>
            {{ $t(`transactionSummary.status.${transaction.status}`) }}
          </span>

          <!-- <i class="pi pi-calendar"></i> -->
        </li>
        <Divider v-if="props.paymentMethod == 'CREDIT_CARD'" />
        <li type="date" v-if="props.paymentMethod == 'PIX'" class="item-list">
          <span>
            {{ date }}
          </span>
          <i class="pi pi-calendar"></i>
        </li>
        <Divider v-if="props.paymentMethod == 'PIX'" />
        <li v-if="props.paymentMethod == 'BANK_SLIP'" class="item-list">
          <span>
            Data de vencimento
          </span>
          <span>
            {{ date }}
          </span>
          <!-- <i class="pi pi-calendar"></i> -->
        </li>
        <Divider v-if="props.paymentMethod == 'BANK_SLIP'" />
        <li v-if="props.paymentMethod == 'BANK_SLIP'" class="item-list wrap">
          <span>
            Linha digitável
          </span>
          <span>
            {{ code }}
          </span>
          <!-- <i class="pi pi-info-circle"></i> -->
        </li>
      </ul>
      <div v-if="props.paymentMethod == 'CREDIT_CARD'" class="center container-code">
        <img v-if="transaction.status == 'APPROVED'" src="../assets/shopping-cart.png" class="img-barcode"
          alt="Boleto" />
        <img v-if="!transactionOk" src="../assets/warning.jpg" class="img-qrcode"
          alt="Houve um erro durante a transaction" />
        <Button v-if="!transactionOk" type="button" id="btn-copy" class="refresh-button"
          v-tooltip="'Houve um erro durante a transação, clique aqui para tentar novamente'" icon="pi pi-refresh"
          iconPos="left" @click="reloadPage()">{{ textReloadTransaction }}</Button>
      </div>
      <div v-if="props.paymentMethod == 'BANK_SLIP'" class="container-code">
        <img :src="imgSrcBankslip" class="img-barcode" alt="Boleto" />
        <Button type="submit" id="btn-copy" class="button-barcode" v-tooltip="'Clique para copiar'"
          v-if="props.paymentMethod == 'BANK_SLIP'" icon="pi pi-copy" iconPos="left" @click="copyEmv()">{{ textButton
          }}</Button>
      </div>
      <div v-if="props.paymentMethod == 'PIX'" class="container-code">
        <img :src="imgSrcPix" class="img-qrcode" alt="PIX" />
        <Button type="submit" id="btn-copy" class="button-qrcode" v-tooltip="'Clique para copiar'"
          v-if="props.paymentMethod == 'PIX'" icon="pi pi-copy" iconPos="left" @click="copyEmv()">{{ textButton
          }}</Button>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Card from "primevue/card";
import "moment/locale/pt-br";
import { CustomerResponse } from "@/models/response/customerResponse";
import { TransactionResponse } from "@/models/response/transactionResponse";
import { SaleRequest } from "@/models/request/paymentRequest";
import { Backend } from "@/services/backend";
import { Ref, ref } from "vue";
import moment from "moment";
import Button from "primevue/button";
import Divider from "primevue/divider";


const imgSrcBankslip: Ref<string> = ref("");
const imgSrcPix: Ref<string> = ref("");
const props = defineProps<{
  customer: CustomerResponse;
  payment: SaleRequest;
  url: string;
  paymentMethod: string;
}>();
let transaction: Ref<TransactionResponse> = ref(new TransactionResponse());
let companyId: Ref<number> = ref(null);
let uuid: Ref<string> = ref("");
let date: Ref<string> = ref("");
let code: Ref<string> = ref("");
let textButton: Ref<string> = ref("");
let textReloadTransaction: Ref<string> = ref("Clique aqui para tentar novamente");
let transactionOk: Ref<boolean> = ref(true);

companyId.value = parseInt(window.location.pathname.split("/")[2]);
uuid.value = window.location.pathname.split("/")[3];

if (props.paymentMethod != "CREDIT_CARD") {
	Backend.getInstance().getPaymentImplementation().getPaymentInfo(props.url).then(
		result => {
			date.value = moment(result.date).format("DD/MM/yyyy");
			code.value = result.code;
			if (props.paymentMethod == "PIX") {
				textButton.value = "Pix copia e cola";
				imgSrcPix.value = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/qrcode?code=${code.value}`;
			} else if (props.paymentMethod == "BANK_SLIP") {
				textButton.value = "Copiar linha digitável";
				imgSrcBankslip.value = `${import.meta.env.VITE_APP_BACK_END}/api/v2/checkout/companies/barcode?code=${code.value}`;
			}
		}
	);
} else {
	Backend.getInstance().getPaymentImplementation().getTransaction(props.url).then(
		result => {
			transaction.value = result;
			if (transaction.value.status == ("NOT_AUTHORIZED" || "NOT_APPROVED" || "CANCELED" || "FAIL" || "INVALID")) {
				transactionOk.value = false;
			}
		}
	);
}

function copyEmv() {
	navigator.clipboard.writeText(code.value);
	textButton.value = "Copiado!";
	document.getElementById("btn-copy").classList.add("copy");
}

function reloadPage() {
	location.reload();
}
</script> 

<style lang="scss" scoped>
.center {
  display: flex;
  justify-content: center;
}

.title {
  display: flex;
  justify-content: flex-start;
  flex-direction: column
}

.list {
  padding: 1rem;
  list-style: none;
}

.item-list {
  display: flex;
  justify-content: space-between;
  border-radius: 3px;
  margin-bottom: 5px;
  padding: 0.2rem;
  font-size: small;
}

.container-code {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.button-qrcode {
  width: 10rem !important;
}

.button-barcode {
  width: 20rem !important;
}

.copy {
  background-color: #5eb37f;
  border: #5eb37f;
}

.img-barcode {
  width: 600px;
}

span {
  font-size: 1rem;
}

.img-qrcode {
  width: 200px;
}

.transaction-summary-card {
  width: 50rem;
  margin-bottom: 1.5em;
  margin-top: 1.5em;
  align-items: center;
  padding: 2rem;  
	border-radius: 5px !important;
}

.refresh-button {
  width: 13rem !important;
  padding: 0.5rem;
}

.p-divider-solid.p-divider-horizontal:before {
  border-top-style: solid !important;
}

@media screen and (max-width: 800px) {
  .transaction-summary-card {
    width: 97vw;
    margin-bottom: 1.5em;
    margin-top: 1.5em;
    align-items: center;
  }

  .img-barcode {
  width: 95vw;
}

.wrap{
  display: none;
}

}
</style>
