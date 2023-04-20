import Vue from 'vue';
import Vuex from 'vuex';
import User from './modules/user';
import Attendance from './modules/attendance';
import AttendanceBulanan from './modules/attendance-bulanan';
import AttendanceCs from './modules/attendance-cs';
import Payslip from './modules/payslip';
import Employee from './modules/employee';
import Department from './modules/department';
import Loans from './modules/loans';
import Shift from './modules/shift';
import DetailShift from './modules/detailshift';
import Area from './modules/area';
import Position from './modules/position';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: null,
    // token: null,
  },
  modules: {
    User,
    Attendance,
    AttendanceBulanan,
    AttendanceCs,
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

    // SET_TOKEN(state, token) {
    //   state.token = token;
    // },
  },
  // getters: {
  //   isLoggedIn(state) {
  //     return !!state.token;
  //   },
  // },
});
