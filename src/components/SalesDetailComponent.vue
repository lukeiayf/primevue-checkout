<template>
  <Card style="width: 30rem; margin-bottom: 1.5em; margin-top: 1.5em; align-items: center;">
    <template #title>
      <div style="display: flex; justify-content:flex-start; flex-direction: column">
        <img style="width:150px; margin: 1rem" src="..\assets\bempaggo.png" />
      </div>
    </template>
    <template #subtitle>
      <div class="margin" style="display: flex; justify-content: center; align-items: flex-start;">
        <h5>{{$t('detalhesCompra')}}</h5>
      </div>
    </template>
    <template #content>

      <div style="display: flex; justify-content: center; background-color: lightgrey;">
        <img :src="imgSrc" style="width:150px;" />
      </div>
      <ul class="list">
        <li class="item-list" v-for="item in items" :bind="item.key"><strong>{{item.title}}</strong>: {{item?.currency
        }}{{item.value}}
        </li>
      </ul>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card';

const imgSrc = "src/assets/logo.png"
const valorPrincipal = 25.00;
const items = [
  {
    title: 'Adesão',
    value: 'Valor Adesão'
  },
  {
    title: 'Valor principal',
    value: valorPrincipal,
    currency: 'R$ '
  },
  {
    title: 'Total',
    value: 'Total'

  },
  {
    title: 'Periodicidade',
    value: 'Periodicidade'
  },

]


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
