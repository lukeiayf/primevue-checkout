<template>
  <Card style="width: 25rem; margin-bottom: 2em; align-items: center;">
    <template #content>
      <h5>Dados do Cliente</h5>
      <div class="input-area">
        <span class="p-float-label">
          <InputText id="username" type="text" v-model="username" class="full" />
          <label for="username">Nome</label>
        </span>
        <span class="p-float-label">
          <InputText id="cpf" type="text" v-model="cpf" class="full" />
          <label for="cpf">CPF</label>
        </span>
        <span class="p-float-label">
          <Calendar inputId="birthdate" v-model="birthdate" autocomplete="off" class="full" dateFormat="dd/mm/yy" />
          <label for="birthdate">Data de nascimento</label>
        </span>
        <span class="p-float-label">
          <InputText id="email" type="text" v-model="email" class="full" />
          <label for="email">Email</label>
        </span>
        <span class="p-float-label">
          <InputMask id="phone" type="text" v-model="phone" mask="(99)99999-999?9" class="full" />
          <label for="phone">Telefone</label>
        </span>

        <h5>Endereço</h5>
        <span class="p-float-label">
          <InputText id="cep" type="text" v-model="cep" class="full" />
          <label for="cep">CEP</label>
        </span>
        <span class="p-float-label">
          <InputText id="street" type="text" v-model="street" class="full" />
          <label for="street">Logradouro</label>
        </span>
        <span class="p-float-label">
          <InputText id="number" type="text" v-model="number" class="full" />
          <label for="number">Número</label>
        </span>
        <span class="p-float-label">
          <InputText id="line2" type="text" v-model="line2" class="full" />
          <label for="line2">Complemento</label>
        </span>
        <span class="p-float-label">
          <InputText id="state" type="text" v-model="state" class="full" />
          <label for="state">Estado</label>
        </span>
        <span class="p-float-label">
          <InputText id="city" type="text" v-model="city" class="full" />
          <label for="city">Cidade</label>
        </span>



      </div>
    </template>
  </Card>
</template>

<script>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import InputMask from 'primevue/inputmask'

export default {
  components: {
    InputText,
    Card,
    Calendar,
    InputMask
  },
  setup() {
    const username = ref();
    const cpf = ref();
    const birthdate = ref();
    const email = ref();
    const phone = ref();
    const cep = ref();
    const street = ref();
    const number = ref();
    const line2 = ref();
    const state = ref();
    const city = ref();


    return { username, cpf, birthdate, email, phone, cep, street, number, line2, state, city }
  }
}
</script>

<style lang="scss" scoped>
.input-area>* {
  display: block;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
}


.field * {
  display: block;
}

.full {
  width: 100%;
}
</style>
