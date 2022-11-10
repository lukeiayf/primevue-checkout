<script setup lang="ts">
import FormComponent from "./components/FormComponent.vue";
import SalesDetailComponent from "./components/SalesDetailComponent.vue";

</script>

<template>
  <div class="flex-row">
    <SalesDetailComponent class="margin-right mobile"></SalesDetailComponent>
    <FormComponent class="mobile"></FormComponent>
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
  background-size: cover;
  background-attachment: initial;
  background-origin: initial;
  background-clip: initial;
}

.flex-row {
  justify-content: center;
  display: flex;
  flex-direction: row;
}

.margin-right {
  margin-right: 1rem;
}

@media screen and (max-width: 800px) {
  .flex-row {
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  .margin-right {
    margin-right: 0;
  }

  .mobile {
    width: 95vw !important;
  }

}
</style>
