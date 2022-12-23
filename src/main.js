import Vue from 'vue'
import App from './components/Payslip.vue'
import store from './store'
import vuetify from '@/plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2)
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  render: h => h(App),
}).$mount('#app')
