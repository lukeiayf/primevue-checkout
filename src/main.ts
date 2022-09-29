import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import VueCreditCardValidation from 'vue-credit-card-validation';
import { setupI18n } from "./i18n"
import pt  from "./i18n/pt.json"

const app = createApp(App);
const i18n = setupI18n({
    legacy: false,
    locale: "pt",
    fallbackLocale: "pt",
    globalInjection: true,
    messages: {
        pt,
    }
});

app.use(PrimeVue, {
    locale: {
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"],
        dayNamesMin: ["Do", "Se", "Te", "Qua", "Qui", "Sx", "Sa"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    }
});
app.use(VueCreditCardValidation);
app.use(i18n);
app.component('Button', Button);
app.directive('tooltip', Tooltip);
app.mount('#app');
