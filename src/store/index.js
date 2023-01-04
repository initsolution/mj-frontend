import Vue from "vue";
import Vuex from "vuex";
import Attendance from "./modules/attendance";
import Payslip from './modules/payslip'
import Departement from './modules/department'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: null,
  },
  modules: {
    // User
    Attendance,
    Payslip,
    Departement,
  },
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload;        
    },
  },
});
