<template>
	<Card class="card" v-show="!showTransactionSummary">
		<template #content>
			<form @submit.prevent="handleSubmit(!v$.$invalid && !v.$invalid)" class="p-fluid">
				<h5>{{ $t('dadosCliente') }}</h5>
				<div class="input-area">
					<CustomerComponent :submitted="submitted"></CustomerComponent>
					<h5>{{ $t('dadosEndereco') }}</h5>
					<AddressComponent :submitted="submitted"></AddressComponent>
					<div>
						<h5>{{ $t('dadosPagamento') }}</h5>
						<SelectButton class="button-payment center-button" v-model="v$.paymentMethod.$model"
							:options="paymentOptions2" optionLabel="name" aria-labelledby="single" />
						<PaymentComponent :submitted="submitted" :maxInstallments="maxInstallments"></PaymentComponent>
					</div>
					<div>
						<Button type="submit" :label="$t('botao.finalizarTransacao')" class="full"
							v-if="v$.paymentMethod.$model.value == 'CREDIT_CARD'" icon="pi pi-play" iconPos="left" />
						<Button type="submit" :label="$t('botao.finalizarTransacao')" class="full"
							v-tooltip="'Será gerado um Boleto Bancário'"
							v-if="v$.paymentMethod.$model.value == 'BANK_SLIP'" icon="pi pi-play" iconPos="left" />
						<Button type="submit" :label="$t('botao.finalizarTransacao')" class="full"
							v-tooltip="'Será gerado um QR code'" v-if="v$.paymentMethod.$model.value == 'PIX'"
							icon="pi pi-play" iconPos="left" />
					</div>
				</div>
			</form>
		</template>
	</Card>

	<TransactionSummaryComponent :customer="customer" :url="paymentLocation" :payment="payment"
		:paymentMethod="paymentMethod" v-if="showTransactionSummary">
	</TransactionSummaryComponent>
</template>


<script setup lang="ts">
import AddressComponent from "@/components/AddressComponent.vue";
import CustomerComponent from "@/components/CustomerComponent.vue";
import PaymentComponent from "@/components/PaymentComponent.vue";
import { v$ } from "@/helpers/vuelidadeConfig";
import { AddressRequest } from "@/models/request/addressRequest";
import { CustomerRequest } from "@/models/request/customerRequest";
import { AddressResponse } from "@/models/response/addressResponse";
import { CustomerMinimalResponse } from "@/models/response/customerMinimalResponse";
import { PaymentPageResponse } from "@/models/response/paymentPageResponse";
import moment from "moment";
import "moment/locale/pt-br";
import Button from "primevue/button";
import Card from "primevue/card";
import SelectButton from "primevue/selectbutton";
import { Ref, ref } from "vue";
import { validDocument } from "../helpers/validDocument";
import { v } from "../helpers/verifyCard";
import { CardRequest } from "../models/request/cardRequest";
import { SaleRequest } from "../models/request/paymentRequest";
import { CustomerResponse } from "../models/response/customerResponse";
import { PaymentMethod, paymentMethods } from "../models/response/paymentMethodResponse";
import { Backend } from "../services/backend";
import TransactionSummaryComponent from "./TransactionSummaryComponent.vue";

const submitted: Ref<boolean> = ref(false);

let showTransactionSummary: Ref<boolean> = ref(false);
let payment: Ref<SaleRequest> = ref(new SaleRequest());
let card: CardRequest;
let profileId: number;
let customer: Ref<CustomerResponse> = ref(new CustomerResponse());
let address: Ref<AddressResponse> = ref(new AddressResponse());
let customerId: Ref<number> = ref(null);
let customerMinimal: Ref<CustomerMinimalResponse> = ref(new CustomerMinimalResponse);
let paymentPage: Ref<PaymentPageResponse> = ref(new PaymentPageResponse());
let paymentLocation: Ref<string> = ref("");
let paymentMethod: Ref<string> = ref("");

let payments: Ref<string[]> = ref([]);
let paymentOptions2: Ref<PaymentMethod[]> = ref([
	{
		name: "Cartão de crédito",
		value: "CREDIT_CARD"
	},
	{
		name: "Boleto",
		value: "BANK_SLIP"
	},
	{
		name: "Pix",
		value: "PIX"
	}
]);
let maxInstallments: Ref<number> = ref(1);
let companyId: Ref<number> = ref(null);
let uuid: Ref<string> = ref("");

companyId.value = parseInt(window.location.pathname.split("/")[2]);
uuid.value = window.location.pathname.split("/")[3];

function filterPayments(el: PaymentMethod) {
	for (let i = 0; i < payments.value.length; i++) {
		if (el.value == payments.value[i]) {
			return true;
		}
	}
}

Backend.getInstance().getPagePayImplementation().getPaymentPage(companyId.value, uuid.value).then(
	result => {
		paymentPage.value = result;
		payments.value = result.methods;
		paymentOptions2.value = paymentMethods.filter(filterPayments);
		paymentPage.value.plan ? maxInstallments.value = paymentPage.value.plan.maxInstallments : maxInstallments.value = paymentPage.value.loose.maxInstallments;
	}
);

Backend.getInstance().getCustomerImplementation().getCustomer(companyId.value, uuid.value).then(
	result => {
		customer.value = result;
		v$.value.username.$model = customer.value.name;
		v$.value.cpf.$model = customer.value.cpf;
		v$.value.birthdate.$model = moment(customer.value.birthdate).toDate();
		v$.value.email.$model = customer.value.email;
		v$.value.emailConfirmation.$model = customer.value.email;
		v$.value.phone.$model = customer.value.phone;
		customerId.value = customer.value.id;
		if (result) {
			Backend.getInstance().getAddressImplementation().getAddress(companyId.value, customerId.value).then(
				result => {
					address.value = result;
					v$.value.zipcode.$model = address.value.zipCode;
					v$.value.city.$model = address.value.city;
					v$.value.state.$model = address.value.state;
					v$.value.street.$model = address.value.street;
					v$.value.number.$model = address.value.number;
					v$.value.lineTwo.$model = address.value.lineTwo;
				}
			);
		}
	}
);





function loadPayment() {
	payment.value = {
		customerId: customerId.value,
		installments: v$.value.installments.$model,
	};
	paymentMethod.value = v$.value.paymentMethod.$model.value;
	if (v$.value.paymentMethod.$model.value == "CREDIT_CARD") {
		card = {
			cardBrand: v.value.cardBrand.$model.name,
			cardNumber: v$.value.cardNumber.$model,
			holderDocument: v$.value.holderDocument.$model.replace(/[^\d]+/g, ""),
			holderName: v$.value.holderName.$model,
			expirationDate: v$.value.dueDate.$model.getTime(),
			securityCode: v$.value.securityCode.$model,
		};
		Backend.getInstance().getCardImplementation().createCard(card, companyId.value, customerId.value).then(
			result => {
				Backend.getInstance().getCardImplementation().getCard(result).then(
					result => {
						profileId = result.id;
						payment.value.profileId = profileId;
						Backend.getInstance().getPaymentImplementation().createPaymentCreditCard(payment.value, companyId.value, uuid.value).then(
							result => {
								paymentLocation.value = result;
								showTransactionSummary.value = true;
							}
						);
					}
				);
			}
		);
	} else if (v$.value.paymentMethod.$model.value == "BANK_SLIP") {
		Backend.getInstance().getPaymentImplementation().createPaymentBankSlip(payment.value, companyId.value, uuid.value).then(
			result => {
				paymentLocation.value = result;
				showTransactionSummary.value = true;
			}
		);
	} else if (v$.value.paymentMethod.$model.value == "PIX") {
		Backend.getInstance().getPaymentImplementation().createPaymentPix(payment.value, companyId.value, uuid.value).then(
			result => {
				console.log(paymentMethod.value);
				console.log(v$.value.paymentMethod.$model.value);
				paymentLocation.value = result;
				showTransactionSummary.value = true;
			}
		);
	}

}

function loadAddress(customerId: number) {
	const AddressState: AddressRequest = {
		zipCode: v$.value.zipcode.$model,
		street: v$.value.street.$model,
		streetNumber: v$.value.number.$model,
		addressLineTwo: v$.value.lineTwo.$model,
		state: v$.value.state.$model,
		city: v$.value.city.$model,
		neighborhood: "teste"
	};
	Backend.getInstance().getAddressImplementation().createAddress(AddressState, companyId.value, customerId).then(result => {
		address.value = result;
		loadPayment();
	});
}

async function loadCustomer() {
	const customerState: CustomerRequest = {
		name: v$.value.username.$model,
		email: v$.value.email.$model,
		document: v$.value.cpf.$model.replace(/[^\d]+/g, ""),
		birthdate: v$.value.birthdate.$model.getTime(),
		phone: v$.value.phone.$model,
	};

	customerMinimal.value = await Backend.getInstance().getCustomerImplementation().getCustomerId(companyId.value, v$.value.cpf.$model);
	if (Object.keys(customerMinimal.value).length == 0) {
		Backend.getInstance().getCustomerImplementation().createCustomer(companyId.value, customerState).then(() => {
			Backend.getInstance().getCustomerImplementation().getCustomerId(companyId.value, v$.value.cpf.$model.replace(/[^\d]+/g, "")).then(
				result => {
					customerId.value = result.id;
					loadAddress(customerId.value);
				}
			);
		});
	} else {
		Backend.getInstance().getCustomerImplementation().putCustomer(customerState, companyId.value, customerId.value)
			.then(() => {
				loadAddress(customerMinimal.value.id);
			});
	}
}

const handleSubmit = async (isFormValid: boolean) => {
	submitted.value = true;
	if (v$.value.paymentMethod.$model.value == "CREDIT_CARD" && !validDocument(v$.value.holderDocument.$model.replace(/[^\d]+/g, ""))) {
		isFormValid = false;
	}
	if (!isFormValid) {
		console.log("n passou");
	} else {
		console.log("passou");

		loadCustomer();
	}

};
</script> 

<style lang="scss" scoped>
.flex-row {
	display: flex !important;
	flex-direction: row !important;
	justify-content: space-between !important;
}

.flex-column {
	display: flex !important;
	flex-direction: column !important;
	justify-content: space-between !important;
}

.card {
	width: 50rem;
	margin-bottom: 1.5em;
	margin-top: 1.5em;
	align-items: center;
}

.flex-nowrap {
	display: flex !important;
	flex-wrap: nowrap !important;
	justify-content: center !important;
}

.width-45 {
	width: 45%
}

.input-area>* {
	display: block;
	margin-bottom: 1.5rem;

	&:last-child {
		margin-bottom: 0;
	}
}

.input-size {
	padding: 2px;
}

.date-size {
	width: 368px;
	height: 27.33px;
}

.full {
	width: 100%;
}

.half {
	margin: 0 1px !important;
	width: 50%;
}

.code-input {
	margin-bottom: 10px;
}

.button-payment {
	margin-bottom: 2rem;
}

.dropdown-size {
	height: 27.33px;
	padding: -2px;
	padding-left: -6px;
}

.center-button {
	justify-content: center;
	display: flex;
}

@media screen and (max-width: 800px) {
	.flex-row {
		justify-content: center;
		display: flex;
		flex-direction: column !important;
		gap: 20px;
	}

	.mobile {
		width: 400px;
	}

	.full {
    width: 90vw !important;
  }

  .button-payment {
	width: 90vw;
  }

  .card {
	width: 97vw;
	margin-bottom: 1.5em;
	margin-top: 1.5em;
	align-items: center;
}

}
</style>
