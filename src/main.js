import Vue from 'vue';
import App from './App.vue';
import Router from './router';
import currency from 'v-currency-field';
import store from './store';
import vuetify from '@/plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);
Vue.use(VueSweetalert2);
Vue.use(currency);
Vue.config.productionTip = false;

new Vue({
  router: Router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount('#app');
