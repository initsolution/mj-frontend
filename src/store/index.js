import Vue from "vue";
import Vuex from "vuex";
import Attendance from "./modules/attendance";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawer: null,
  },
  modules: {
    // User
    Attendance,
  },
  mutations: {
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
  },
});
