<template>
<div>
    <span class="p-float-label p-input-icon-right">
        <i class="pi pi-user" />
        <InputText id="username" type="text" v-model="v$.username.$model" class="full input-size"
        :class="{ 'full input-size p-invalid': v$.username.$invalid && props.submitted }" />
        <label for="username" :class="{ ' full p-inputtext-sm p-error': v$.username.$invalid && props.submitted }">{{
            $t('cliente.nome')
        }}*</label>
    </span>
    <small v-if="(v$.username.$invalid && props.submitted) || v$.username.$pending" class="p-error">{{
            $t('erros.cliente.nomeRequerido')
    }}</small>
</div>
<div class="flex-row">
    <div class="width-45">
        <span class="p-float-label p-input-icon-right">
            <i class="pi pi-info-circle" />
            <InputMask mask="999.999.999-99" required id="cpf" type="text" v-model="v$.cpf.$model"
                class="full input-size" :class="{ 'full input-size p-invalid': v$.cpf.$invalid && props.submitted }" />
            <label for="cpf">{{ $t('cliente.cpf') }}*</label>
        </span>
        <small v-if="(v$.cpf.$invalid && props.submitted) || v$.cpf.$pending" class="p-error">{{
                $t('erros.cliente.cpfRequerido')
        }}</small>
    </div>
    <div class="width-45">
        <span class="p-float-label">
            <Calendar inputId="birthdate" v-model="v$.birthdate.$model" autocomplete="off" class="full date-size"
                dateFormat="dd/mm/yy" :showIcon="true" />
            <label for="birthdate">{{ $t('cliente.nascimento') }}</label>
        </span>
    </div>
</div>
<div class="flex-row">
    <div class="width-45">
        <span class="p-float-label p-input-icon-right">
            <i class="pi pi-at"></i>
            <InputText required id="email" type="text" v-model="v$.email.$model" class="full input-size"
                :class="{ 'full input-size p-invalid': v$.email.$invalid && props.submitted }" />
            <label for="email" :class="{ 'p-error': v$.email.$invalid && props.submitted }">{{ $t('cliente.email') }}*</label>
        </span>
        <small v-if="(v$.email.$invalid && props.submitted) || v$.email.$pending" class="p-error">{{
                $t('erros.cliente.emailRequerido')
        }}</small>
    </div>
    <div class="width-45">
        <span class="p-float-label p-input-icon-right">
            <i class="pi pi-at"></i>
            <InputText required id="emailConfirmation" type="text" v-model="v$.emailConfirmation.$model"
                class="full input-size" :class="{ 'full input-size p-invalid': !equalsToEmail }"
                @blur="verifyEmail(v$.email.$model, v$.emailConfirmation.$model)" />
            <label for="emailConfirmation" :class="{ 'p-error': !equalsToEmail }">{{ $t('cliente.confirmacaoEmail')
            }}*</label>
        </span>
        <small v-if="(!equalsToEmail)" class="p-error">{{ $t('erros.cliente.emailConfirmacao') }}</small>
    </div>
</div>
<div class="width-45">
    <span class="p-float-label p-input-icon-right">
        <i class="pi pi-phone"></i>
        <InputText id="phone" type="text" v-model="v$.phone.$model" class="full input-size" />
        <label for="phone">{{ $t('cliente.telefone') }}</label>
    </span>
</div>
</template>
<script setup lang="ts">
import InputText from "primevue/inputtext";
import Calendar from "primevue/calendar";
import { v$ } from "@/helpers/vuelidadeConfig";
import { equalsToEmail, verifyEmail } from "../helpers/validateEmail";
import InputMask from "primevue/inputmask";


const props = defineProps<{
    submitted: boolean;
}>();

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
</style>
