<template>
  <Card style="width: 50rem; margin-bottom: 1.5em; margin-top:1.5em; align-items: center;">
      <template #title>
        <div style="display: flex; justify-content:flex-start; flex-direction: column">
          <h5>{{$t('sumarioTransacao')}}</h5>
        </div>
      </template>
      <template #content>
        <h5>{{$t('dadosCliente')}}</h5>
        <ul class="list">
          <li class="item-list">
              <strong>{{$t('cliente.nome')}}</strong>: {{store.defaultForms[0].username}}
          </li>
          <li class="item-list">
          <strong>{{$t('cliente.email')}}</strong>: {{store.defaultForms[0].email}}
          </li>
        </ul>
        <h5>{{$t('dadosPagamento')}}</h5>
        <ul class="list">
          <li class="item-list">
            <strong>{{$t('metodoPagamento')}}</strong>: {{store.defaultForms[0].paymentMethod.name}}
          </li>
          <li v-if="store.defaultForms[0].paymentMethod.value == 3" class="item-list">
            <strong>{{$t('detalhesPagamento.dataExpiracao')}}</strong>: Apenas para QRCODE
          </li>
          <li v-if="store.defaultForms[0].paymentMethod.value == 2" class="item-list">
            <strong>{{$t('detalhesPagamento.dataVencimento')}}</strong>: Apenas para BOLETO
          </li>
        </ul>
        <div v-if="store.defaultForms[0].paymentMethod.value == 2" style="display: flex; justify-content: center;">
          <img :src="imgSrcBankslip" style="width:400px;" alt="Boleto"/>
        </div>
        <div v-if="store.defaultForms[0].paymentMethod.value == 3" style="display: flex; justify-content: center;">
          <img :src="imgSrcPix" style="width:200px;" alt="PIX"/>
        </div>
      </template>
  </Card>
</template>

<script setup lang="ts">
import Card from 'primevue/card';
import 'moment/locale/pt-br';
import { useMainStore } from '../store';

const store = useMainStore();

const imgSrcBankslip = "src/assets/boleto-logo.svg"
const imgSrcPix = "src/assets/qrcode.png"

</script> 

<style lang="scss" scoped>
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
</style>
