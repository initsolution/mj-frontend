import Vue from "vue";
import Vuex from "vuex";
import Attendance from "./modules/attendance";
import Payslip from './modules/payslip'
import Employee from './modules/employee'
import Department from './modules/department'
import Loans from './modules/loans'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: null,
  },
  modules: {
    // User
    Attendance,
    Payslip,
    Employee,
    Department,
    Loans
  },
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload;        
    },
  },
});
