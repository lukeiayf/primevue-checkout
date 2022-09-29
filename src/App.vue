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

body {
  background: linear-gradient(45deg, #0b499c, #26a2bf);
  background-image: linear-gradient(45deg, rgb(11, 73, 156), rgb(38, 162, 191));
  background-position-x: initial;
  background-position-y: initial;
  background-size:100vw 100vh;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
  background-color: initial;
}
</style>
