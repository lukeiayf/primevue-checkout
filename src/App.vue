<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import FormComponent from './components/FormComponent.vue';
import SalesDetailComponent from './components/SalesDetailComponent.vue';

</script>

<template>
  <div style="justify-content:center; display: flex; flex-direction: row; ">
    <SalesDetailComponent style="margin-right: 1rem;"></SalesDetailComponent>
    <FormComponent></FormComponent>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
