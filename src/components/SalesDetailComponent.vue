<template>
  <Card style="width: 25rem; margin-bottom: 2em; align-items: center;">
    <template #title>
      <div style="display: flex; justify-content:flex-start; flex-direction: column">
        <img style="width:150px; margin: 1rem" src="..\assets\bempaggo.png" />
      </div>
    </template>
    <template #subtitle>
      <div class="margin" style="display: flex; justify-content: center; align-items: flex-start;">
        <h5>Detalhes da compra</h5>
      </div>
    </template>
    <template #content >

      <div style="display: flex; justify-content: center; background-color: antiquewhite;">
        <img src="..\assets\logo.png" />
      </div>
      <ul class="list">
        <li class="item-list" v-for="item in items" :bind="item.key"><strong>{{item.title}}</strong>: {{item.value}}
        </li>
      </ul>
    </template>
  </Card>
</template>

<script setup>
import Card from 'primevue/card';

const items = [
  {
    title: 'Adesão',
    value: 'Valor Adesão'
  },
  {
    title: 'Valor principal',
    value: 'Valor principal'
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
  padding: 0.3rem;
}

.margin {
  margin-bottom: -30px;
  color:#495057;
  }
</style>
