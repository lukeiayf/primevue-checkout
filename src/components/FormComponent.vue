<template>
  <Card style="width: 50rem; margin-bottom: 1.5em; margin-top:1.5em; align-items: center;"
    v-show="!showTransactionSummary">
    <template #content>
      <form @submit.prevent="handleSubmit(!v$.$invalid && !v.$invalid)" class="p-fluid">
        <h5>{{$t('dadosCliente')}}</h5>
        <div class="input-area">
          <div>
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-user" />
              <InputText id="username" type="text" v-model="v$.username.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.username.$invalid && submitted}" />
              <label for="username"
                :class="{' full p-inputtext-sm p-error':v$.username.$invalid && submitted}">{{$t('cliente.nome')}}*</label>
            </span>
            <small v-if="(v$.username.$invalid && submitted) || v$.username.$pending"
              class="p-error">{{$t('erros.cliente.nomeRequerido')}}</small>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <div style="width:45%">
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-info-circle" />
                <InputMask required id="cpf" type="text" v-model="v$.cpf.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.cpf.$invalid && submitted}" mask="99999999999" />
                <label for="cpf">{{$t('cliente.cpf')}}*</label>
              </span>
              <small v-if="(v$.cpf.$invalid && submitted) || v$.cpf.$pending"
                class="p-error">{{$t('erros.cliente.cpfRequerido')}}</small>
            </div>
            <div style="width: 45%;">
              <span class="p-float-label">
                <Calendar inputId="birthdate" v-model="v$.birthdate.$model" autocomplete="off" class="full date-size"
                  dateFormat="dd/mm/yy" :showIcon="true" />
                <label for="birthdate">{{$t('cliente.nascimento')}}</label>
              </span>
            </div>
          </div>
          <InlineMessage v-if="messages.length">{{messages[0]?.content}}</InlineMessage>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <div style="width: 45%;">
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-at"></i>
                <InputText required id="email" type="text" v-model="v$.email.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.email.$invalid && submitted}" />
                <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">{{$t('cliente.email')}}*</label>
              </span>
              <small v-if="(v$.email.$invalid && submitted) || v$.email.$pending"
                class="p-error">{{$t('erros.cliente.emailRequerido')}}</small>
            </div>
            <div style="width: 45%;">
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-at"></i>
                <InputText required id="emailConfirmation" type="text" v-model="v$.emailConfirmation.$model"
                  class="full input-size" :class="{'full input-size p-invalid': !equalsToEmail}"
                  @blur="verifyEmail(v$.email.$model, v$.emailConfirmation.$model)" />
                <label for="emailConfirmation"
                  :class="{'p-error':!equalsToEmail}">{{$t('cliente.confirmacaoEmail')}}*</label>
              </span>
              <small v-if="(!equalsToEmail)" class="p-error">{{$t('erros.cliente.emailConfirmacao')}}</small>
            </div>
          </div>
          <div style="width: 45%;">
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-phone"></i>
              <InputMask id="phone" type="text" v-model="v$.phone.$model" mask="(99)99999-999?9"
                class="full input-size" />
              <label for="phone">{{$t('cliente.telefone')}}</label>
            </span>
          </div>
          <h5>{{$t('dadosEndereco')}}</h5>
          <transition-group name="p-message" tag="div">
            <Message v-for="msg of messagesList" :severity="msg.severity" :key="msg.id">{{msg.content}}</Message>
          </transition-group>
          <div>
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-map-marker"></i>
              <InputText required id="zipcode" type="text" v-model="v$.zipcode.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.zipcode.$invalid && submitted}"
                @blur="validateCep(v$.zipcode.$model)" />
              <label for="zipcode" :class="{'p-error':v$.zipcode.$invalid && submitted}">{{$t('endereco.cep')}}*</label>
            </span>
            <small v-if="(v$.zipcode.$invalid && submitted) || v$.zipcode.$pending"
              class="p-error">{{$t('erros.endereco.cepRequerido')}}</small>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <div style="width: 45%;">
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-flag"></i>
                <InputText required id="state" type="text" v-model="v$.state.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.state.$invalid && submitted}" />
                <label for="number"
                  :class="{'p-error':v$.state.$invalid && submitted}">{{$t('endereco.estado')}}*</label>
              </span>
              <small v-if="(v$.state.$invalid && submitted) || v$.state.$pending"
                class="p-error">{{$t('erros.endereco.estadoRequerido')}}</small>
            </div>
            <div style="width: 45%;">
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-flag"></i>
                <InputText required id="city" type="text" v-model="v$.city.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.city.$invalid && submitted}" />
                <label for="number"
                  :class="{'p-error':v$.city.$invalid && submitted}">{{$t('endereco.cidade')}}*</label>
              </span>
              <small v-if="(v$.city.$invalid && submitted) || v$.city.$pending"
                class="p-error">{{$t('erros.endereco.cidadeRequerida')}}</small>
            </div>
          </div>
          <div>
            <span class="p-float-label p-input-icon-right">
              <i class="pi pi-map"></i>
              <InputText required id="street" type="text" v-model="v$.street.$model" class="full input-size"
                :class="{'full input-size p-invalid':v$.street.$invalid && submitted}" />
              <label for="street"
                :class="{'p-error':v$.street.$invalid && submitted}">{{$t('endereco.logradouro')}}*</label>
            </span>
            <small v-if="(v$.street.$invalid && submitted) || v$.street.$pending"
              class="p-error">{{$t('erros.endereco.logradouroRequerido')}}</small>
          </div>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <div style="width: 45%;">
              <span class="p-float-label p-input-icon-right">
                <i class="pi pi-home"></i>
                <InputText required id="number" type="text" v-model="v$.number.$model" class="full input-size"
                  :class="{'full input-size p-invalid':v$.number.$invalid && submitted}" />
                <label for="number"
                  :class="{'p-error':v$.number.$invalid && submitted}">{{$t('endereco.numero')}}*</label>
              </span>
              <small v-if="(v$.number.$invalid && submitted) || v$.number.$pending"
                class="p-error">{{$t('erros.endereco.numeroRequerido')}}</small>
            </div>
            <div style="width: 45%;">
              <span class=" p-float-label p-input-icon-right">
                <i class="pi pi-building"></i>
                <InputText id="line2" type="text" v-model="line2" class="full input-size" />
                <label for="line2">{{$t('endereco.complemento')}}</label>
              </span>
            </div>
          </div>

          <div>
            <h5>{{$t('dadosPagamento')}}</h5>

            <SelectButton class="button-payment" v-model="v$.paymentMethod.$model" :options="paymentOptions"
              optionLabel="name" aria-labelledby="single" style="justify-content: center; display: flex;" />

            <div style="display: flex; flex-wrap: nowrap; justify-content: center;">
              <span class="p-float-label">
                <InputNumber v-model="v$.installments.$model" id="installments" showButtons mode="decimal" :min="1"
                  :max="maxInstallments" :class="{'full input-size p-invalid':v$.installments.$invalid && submitted}" />
                <label for="number"
                  :class="{'p-error':v$.installments.$invalid && submitted}">{{$t('quantidadeParcelas')}}*</label>
              </span>
            </div>

            <div v-if="v$.paymentMethod.$model.value == 1" class="input-area" style="margin-top: 25px">
              <div>
                <span class="p-float-label" v-if="v$.cardNumber.$model.length > 13">
                  <Dropdown required inputStyle="padding: 2px; padding-left: 6px" v-model="v.cardBrand.$model"
                    id="cardBrand" :options="brands" option-label="name" class="full dropdown-size"
                    :class="{'full dropdown-size p-invalid':v.cardBrand.$invalid && submitted}" />
                  <label for="number"
                    :class="{'p-error':v.cardBrand.$invalid && submitted}">{{$t('cartao.bandeira')}}*</label>
                </span>
                <small v-if="(v.cardBrand.$invalid && submitted) || v.cardBrand.$pending"
                  class="p-error">{{$t('erros.cartao.bandeiraRequerida')}}</small>
              </div>
              <div>
                <span class="p-float-label p-input-icon-right">
                  <i class="pi pi-credit-card"></i>
                  <InputText required id="cardNumber" type="text" v-model="v$.cardNumber.$model" class="full input-size"
                    :class="{'full input-size p-invalid':v$.cardNumber.$invalid && submitted}"
                    @blur="verifyCard(v$.cardNumber.$model)" />
                  <label for="number"
                    :class="{'p-error':v$.cardNumber.$invalid && submitted}">{{$t('cartao.numero')}}*</label>
                </span>
                <small v-if="(v$.cardNumber.$invalid && submitted) || v$.cardNumber.$pending"
                  class="p-error">{{$t('erros.cartao.numeroRequerido')}}</small>
              </div>
              <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <div style="width: 45%;">
                  <span>
                    <div class="field col-12 md:col-4">
                      <Calendar required inputId="dueDate" class="dropdown-size" v-model="v$.dueDate.$model"
                        view="month" :minDate="today" dateFormat="mm/yy" placeholder="Vencimento" :showIcon="true"
                        :class="{'full input-size p-invalid':v$.dueDate.$invalid && submitted }" />
                    </div>
                  </span>
                  <small v-if="(v$.dueDate.$invalid && submitted) || v$.dueDate.$pending"
                    class="p-error">{{$t('erros.cartao.validadeRequerida')}}</small>
                </div>
                <div style="width: 45%;">
                  <span class="p-float-label p-input-icon-right">
                    <i class="pi pi-lock"></i>
                    <InputText required id="securityCode" v-model="v$.securityCode.$model" class="full input-size"
                      style="width: 100%"
                      :class="{'full input-size p-invalid':v$.securityCode.$invalid && submitted}" />
                    <label for="number"
                      :class="{'p-error':v$.securityCode.$invalid && submitted}">{{$t('cartao.codigo')}}*</label>
                  </span>
                  <small v-if="(v$.securityCode.$invalid && submitted) || v$.securityCode.$pending"
                    class="p-error">{{$t('erros.cartao.codigoRequerido')}}</small>
                </div>
              </div>
              <div>
                <span class="p-float-label p-input-icon-right">
                  <i class="pi pi-user"></i>
                  <InputText required id="holderName" type="text" v-model="v$.holderName.$model" class="full input-size"
                    :class="{'full input-size p-invalid':v$.holderName.$invalid && submitted}" />
                  <label for="number"
                    :class="{'p-error':v$.holderName.$invalid && submitted}">{{$t('cartao.nomeTitular')}}*</label>
                </span>
                <small v-if="(v$.holderName.$invalid && submitted) || v$.holderName.$pending"
                  class="p-error">{{$t('erros.cartao.nomeRequerido')}}</small>
              </div>
              <div>
                <span class="p-float-label p-input-icon-right">
                  <i class="pi pi-info-circle"></i>
                  <InputText required id="holderDocument" type="text" v-model="v$.holderDocument.$model"
                    class="full input-size"
                    :class="{'full input-size p-invalid':v$.holderDocument.$invalid && submitted}"
                    @Change="validDocument(v$.holderDocument.$model)" />
                  <label for="number"
                    :class="{'p-error':v$.holderDocument.$invalid && submitted}">{{$t('cartao.documentoTitular')}}*</label>
                </span>
                <small v-if="(v$.holderDocument.$invalid && submitted) || v$.holderDocument.$pending"
                  class="p-error">{{$t('erros.cartao.documentoRequerido')}}</small>
              </div>
            </div>
          </div>

          <div>
            <Button type="submit" :label="$t('botao.finalizarTransacao')" class="full"
              v-if="v$.paymentMethod.$model.value == 1" icon="pi pi-play" iconPos="left" />
            <Button type="submit" :label="$t('botao.finalizarTransacao')" class="full"
              v-tooltip="'Será gerado um Boleto Bancário'" v-if="v$.paymentMethod.$model.value == 2" icon="pi pi-play"
              iconPos="left" />
            <Button type="submit" :label="$t('botao.finalizarTransacao')" class="full"
              v-tooltip="'Será gerado um QR code'" v-if="v$.paymentMethod.$model.value == 3" icon="pi pi-play"
              iconPos="left" />
          </div>
        </div>
      </form>
    </template>
    <template #footer>

    </template>
  </Card>

  <TransactionSummaryComponent :name="v$.username.$model" v-if="showTransactionSummary"></TransactionSummaryComponent>

</template>


<script setup lang="ts">
import { ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength, maxLength, requiredIf } from "@vuelidate/validators";
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Calendar from "primevue/calendar";
import InputMask from "primevue/inputmask";
import InputNumber from "primevue/inputnumber";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import InlineMessage from "primevue/inlinemessage";
import type { Ref } from "vue";
import "moment/locale/pt-br";
import TransactionSummaryComponent from "./TransactionSummaryComponent.vue";
import { validCpf, messages } from "../helpers/cpfValidator";
import { validDocument } from "../helpers/validDocument";
import { brands, verifyCard, v } from "../helpers/verifyCard";
import { defaultState } from "../models/defaultState.model";
import { paymentOptions } from "../models/response/paymentMethodResponse";
import { useMainStore } from "../store/index";
import { useCustomerStore } from "../store/customerStore";
import { ICustomerState } from "../models/customerState.model";
import cep from "cep-promise";
import Message from "primevue/message";
import { verifyEmail, equalsToEmail } from "../helpers/validateEmail";
import { CardRequest } from "../models/request/cardRequest";
import { PaymentRequest } from "../models/request/paymentRequest";
//import { PaymentPageResponse } from "../models/response/paymentPageResponse";
import { customerId, newCustomer} from "../helpers/verifyCustomer";
import { Backend } from "../services/backend";

const maxInstallments: Ref<number> = ref(12);
const submitted: Ref<boolean> = ref(false);
const line2: Ref<string> = ref("");
const today: Ref<Date> = ref(new Date());
const store = useMainStore();
const customerStore = useCustomerStore();
const messagesList: any = ref([]);
const count = ref(0);


let showTransactionSummary: Ref<boolean> = ref(false);
let card: CardRequest;
let payment: PaymentRequest;
//let paymentPage: PaymentPageResponse;
let profileId: number;
let isCard: Ref<boolean> = ref(false);

const rules = {
	username: { required },
	email: { required, email },
	emailConfirmation: { required },
	cpf: { required, minLengthValue: minLength(11), validCpf },
	birthdate: {},
	phone: {},
	zipcode: { required, minLengthValue: minLength(8) },
	street: { required },
	lineTwo: {},
	number: { required },
	state: { required },
	city: { required },
	paymentMethod: { required },
	installments: { required },

	cardBrand: { required: requiredIf(isCard) },
	cardNumber: { required: requiredIf(isCard), minLengthValue: minLength(13), maxLengthValue: maxLength(19) },
	dueDate: { required: requiredIf(isCard) },
	securityCode: { required: requiredIf(isCard), minLengthValue: minLength(3) },
	holderName: { required: requiredIf(isCard) },
	holderDocument: { minLengthValue: minLength(11), maxLengthValue: maxLength(18) }
};

const v$ = useVuelidate(rules, defaultState);


function validateCep(inputCep: string) {
	cep(inputCep).then(
		(address) => {
			v$.value.street.$model = address.street;
			v$.value.city.$model = address.city;
			v$.value.state.$model = address.state;
			messagesList.value.pop();
		}
	).catch(err => {
		console.log(err);
		messagesList.value = [
			{ severity: "error", content: "Cep não encontrado", id: count.value++ },
		];
	}
	);
}

const handleSubmit = (isFormValid: boolean) => {
	submitted.value = true;
	if (v$.value.paymentMethod.$model.value == 1 && !validDocument(v$.value.holderDocument.$model)) {
		isFormValid = false;
	}
	if (!isFormValid) {
		console.log("n passou");
	} else {
		console.log("passou");
		store.createNewForm(defaultState);
		const customerState: ICustomerState = {
			username: v$.value.username.$model,
			email: v$.value.email.$model,
			emailConfirmation: v$.value.emailConfirmation.$model,
			cpf: v$.value.cpf.$model,
			birthdate: v$.value.birthdate.$model,
			phone: v$.value.phone.$model,
			zipcode: v$.value.zipcode.$model,
			street: v$.value.street.$model,
			number: v$.value.number.$model,
			lineTwo: line2,
			state: v$.value.state.$model,
			city: v$.value.city.$model
		};
    customerStore.createNewForm(customerState);
		//Backend.getInstance().getCustomerImplementation().createCustomer(customerState);
		payment = {
			//uuid: paymentPage.uuid,
			uuid: "testeuuid",
			customerId: customerId,
			paymentType: store.defaultForms.paymentMethod.name,
			installments: store.defaultForms.installments,
		};
		if (store.defaultForms.paymentMethod.name == "CREDIT_CARD") {
			card = {
				cardBrand: store.defaultForms.cardBrand.name,
				cardNumber: store.defaultForms.cardNumber,
				holderDocument: store.defaultForms.holderDocument,
				holderName: store.defaultForms.holderName,
				dueDate: store.defaultForms.dueDate.getTime(),
				securityCode: parseInt(store.defaultForms.securityCode),
			};
			payment.profileId = profileId;
		}

		console.log(newCustomer);
		showTransactionSummary.value = true;
	}

};


</script> 

<style lang="scss" scoped>
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
</style>
