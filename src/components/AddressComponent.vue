<template>
<div>
    <span class="p-float-label p-input-icon-right full">
        <i class="pi pi-map-marker"></i>
        <InputText required id="zipcode" type="text" v-model="v$.zipcode.$model" class="full input-size"
            :class="{ 'full input-size p-invalid': v$.zipcode.$invalid && props.submitted }"
            @blur="validateCep(v$.zipcode.$model)" />
        <label for="zipcode" :class="{ 'p-error': v$.zipcode.$invalid && props.submitted }">{{ $t('endereco.cep') }}*</label>
    </span>
    <small v-if="(v$.zipcode.$invalid && props.submitted) || v$.zipcode.$pending"
        class="p-error">{{ $t('erros.endereco.cepRequerido') }}</small>
</div>
<div class="flex-row">
    <div class="width-45">
        <span class="p-float-label p-input-icon-right full">
            <i class="pi pi-flag"></i>
            <InputText required id="state" type="text" v-model="v$.state.$model" class="full input-size"
                :class="{ 'full input-size p-invalid': v$.state.$invalid && props.submitted }" />
            <label for="number" :class="{ 'p-error': v$.state.$invalid && props.submitted }">{{ $t('endereco.estado') }}*</label>
        </span>
        <small v-if="(v$.state.$invalid && props.submitted) || v$.state.$pending"
            class="p-error">{{ $t('erros.endereco.estadoRequerido') }}</small>
    </div>
    <div class="width-45">
        <span class="p-float-label p-input-icon-right full">
            <i class="pi pi-flag"></i>
            <InputText required id="city" type="text" v-model="v$.city.$model" class="full input-size"
                :class="{ 'full input-size p-invalid': v$.city.$invalid && props.submitted }" />
            <label for="number" :class="{ 'p-error': v$.city.$invalid && props.submitted }">{{ $t('endereco.cidade') }}*</label>
        </span>
        <small v-if="(v$.city.$invalid && props.submitted) || v$.city.$pending"
            class="p-error">{{ $t('erros.endereco.cidadeRequerida') }}</small>
    </div>
</div>
<div>
    <span class="p-float-label p-input-icon-right full">
        <i class="pi pi-map"></i>
        <InputText required id="street" type="text" v-model="v$.street.$model" class="full input-size"
            :class="{ 'full input-size p-invalid': v$.street.$invalid && props.submitted }" />
        <label for="street" :class="{ 'p-error': v$.street.$invalid && props.submitted }">{{ $t('endereco.logradouro') }}*</label>
    </span>
    <small v-if="(v$.street.$invalid && props.submitted) || v$.street.$pending"
        class="p-error">{{ $t('erros.endereco.logradouroRequerido') }}</small>
</div>
<div class="flex-row">
    <div class="width-45">
        <span class="p-float-label p-input-icon-right full">
            <i class="pi pi-home"></i>
            <InputText required id="number" type="text" v-model="v$.number.$model" class="full input-size"
                :class="{ 'full input-size p-invalid': v$.number.$invalid && props.submitted }" />
            <label for="number" :class="{ 'p-error': v$.number.$invalid && props.submitted }">{{ $t('endereco.numero') }}*</label>
        </span>
        <small v-if="(v$.number.$invalid && props.submitted) || v$.number.$pending"
            class="p-error">{{ $t('erros.endereco.numeroRequerido') }}</small>
    </div>
    <div class="width-45">
        <span class=" p-float-label p-input-icon-right full">
            <i class="pi pi-building"></i>
            <InputText id="line2" type="text" v-model="v$.lineTwo.$model" class="full input-size" />
            <label for="line2">{{ $t('endereco.complemento') }}</label>
        </span>
    </div>
</div>
</template>
<script setup lang="ts">
import InputText from "primevue/inputtext";
import { v$ } from "@/helpers/vuelidadeConfig";
import cep from "cep-promise";
import { Ref, ref } from "vue";
import { MessageProps } from "primevue/message";

interface MessageError extends MessageProps {
    id: number,
    content: string,
}
const props = defineProps<{
    submitted: boolean;
}>();

const messagesList: Ref<MessageError[]> = ref([]);

const count = ref(0);

function validateCep(inputCep: string) {
	cep(inputCep).then(
		(address) => {
			v$.value.street.$model = address.street;
			v$.value.city.$model = address.city;
			v$.value.state.$model = address.state;
			messagesList.value.pop();
		}
	).catch(() => {
		messagesList.value = [
			{ severity: "error", content: "Cep não encontrado", id: count.value++ },
		];
	}
	);
}
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
    padding: 2px 0 3px 10px;
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

@media screen and (max-width: 800px) {
  .flex-row {
    justify-content: center;
    display: flex;
    flex-direction: column  !important;
    gap: 20px;
  }

  .mobile{
    width: 400px;
  }

  .full {
    width: 90vw !important;
  }

}
</style>
