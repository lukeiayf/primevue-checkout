<script setup lang="ts">
import FormComponent from "./components/FormComponent.vue";
import SalesDetailComponent from "./components/SalesDetailComponent.vue";

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
  background: #2196F3;
  background-position-x: initial;
  background-position-y: initial;
  background-size:cover;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
}
</style>
