import Vue from "vue";
import Vuex from "vuex";
import Attendance from "./modules/attendance";
import AttendanceBulanan from "./modules/attendance-bulanan";
import AttendanceHelper from "./modules/attendance-helper";
import Payslip from './modules/payslip'
import Employee from './modules/employee'
import Department from './modules/department'
import Loans from './modules/loans'
import Shift from './modules/shift'
import DetailShift from './modules/detailshift'
import Area from './modules/area'
import Position from './modules/position'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: null,
  },
  modules: {
    // User
    Attendance,
    AttendanceBulanan,
    AttendanceHelper,
    Payslip,
    Employee,
    Department,
    Loans,
    Shift,
    DetailShift,
    Area,
    Position,
  },
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload;        
    },
  },
});
