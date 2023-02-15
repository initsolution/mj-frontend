import httpCommons from "../../http-commons";

const apiName = "attendance-helper";

const state = {
  data: [],
  status: {},
  update: {},
  loading: Boolean
};

const actions = {
  async getAttendanceCustomHelper({commit}){
    // console.log('get custom attendance')
    const res = await httpCommons.get(apiName+'/customGetAttendance');
    console.log(res)
    commit("SET_GET_DATA_ATTENDANCE", res.data);
  },
  
  async actionGetAllAttendenceHelper({ commit }) {
    // if (date == null) {
    //   console.log("date kosong");
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, "0");
      var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      var yyyy = today.getFullYear();
      const today1 = today
      var todayDate = yyyy + "-" + mm + "-" + dd;
      // console.log(todayDate)
    //   // today = "18/11/2022"
    //   // console.log(today);
    //   date = today;
    // }
    // param =  { s: { overtime: 30 } }
    // const searching = new URLSearchParams([['overtime', 90]]);
    // const res = await httpCommons.get(apiName+'?s=%7B%22overtime%22%3A90%7D')
    // const searching = new URLSearchParams([["overtime", 90]]);
    // const param1 = {
    //     "overtime": 90
    //   };
    // var datx = encodeURIComponent(searching);
    // var v = 90
    // const res = await httpCommons.get(apiName, {params : {s : datx}})
    // const filter = encodeURIComponent(`{"attendance_date":"${date}"}`);
    // const path = `?s=${filter}`;
    // const res = await httpCommons.get(apiName + path)
    const params = new URLSearchParams();
    params.append("filter", "created_at||cont||"+todayDate)
    
    const res = await httpCommons.get(apiName, {params : params});
    // console.log(res)
    commit("SET_GET_DATA_ATTENDANCE", res.data);
  },

  async actionGetAllAttendenceByFilterHelper({ commit }, param) {
    const res = await httpCommons.get(apiName, {params : param});
    // console.log(res);
    commit("SET_GET_DATA_ATTENDANCE", res.data);
  },

  async saveAttendanceHelper({ commit, dispatch }, data) {
    try {
      const res = await httpCommons.post(apiName, data);
      const result = {
        status: res.statusText,
        actions: res.status,
      };
      commit("SET_CHECK_ATTENDANCE", result);
    } catch (error) {
      const result = {
        status: "duplicate",
        actions: 201,
      };
      commit("SET_CHECK_ATTENDANCE", result);
    }
  },

  async saveBulkAttendanceHelper({ commit, dispatch }, data) {
    // console.log(data);
    commit("SET_LOADING_ATTENDANCE", true);
    try {
      const res = await httpCommons.post(apiName + "/bulk", data);
      const result = {
        status: res.statusText,
        actions: res.status,
        data: res.data,
      };
      // console.log("res : " + res);
      // console.log(result);
      commit("SET_CHECK_ATTENDANCE", result);
      dispatch("getAttendanceCustomHelper");
      
    } catch (error) {
      // console.log(error);
      const result = {
        status: "duplicate",
        actions: 201,
      };
      commit("SET_CHECK_ATTENDANCE", result);
    }
    commit("SET_LOADING_ATTENDANCE", false);
  },

  async updateIjin({ commit, dispatch }, data) {
    try {
      const res = await httpCommons.patch(apiName + `/${data.id}`, data);
      // console.log(res);
      const result = {
        status: res.statusText,
        actions: res.status,
        data: res.data,
      };
      // console.log(result);
      commit("SET_UPDATE_ATTENDANCE", result);
      // dispatch("actionGetAllAttendence");
    } catch (error) {
      const result = {
        status: "duplicate",
        actions: 201,
      };
      commit("SET_UPDATE_ATTENDANCE", result);
    }
  },

  async actionSwitchShift({ commit, dispatch }, data) {
    try {
      const res = await httpCommons.patch(apiName+"/updateAttendanceByShift", data);
      // console.log(res);
      const result = {
        status: res.statusText,
        actions: res.status,
        data: res.data,
      };
      commit("SET_UPDATE_ATTENDANCE", result);
    } catch (error) {
      const result = {
        status: "duplicate",
        actions: 201,
      };
      commit("SET_UPDATE_SHIFT", result);
    }
  },

  async checkAttendanceHelper({ commit, dispatch }, data) {
    // console.log(data);
    try {
      const res = await httpCommons.post(apiName + "/checkAttendance", data);
      const result = {
        status: res.statusText,
        actions: res.status,
        data: res.data,
      };
      // console.log(result.data);
      commit("SET_CHECK_ATTENDANCE", result);
    } catch (error) {
      const result = {
        status: "duplicate",
        actions: 201,
      };
      commit("SET_CHECK_ATTENDANCE", result);
    }
  },

  async deleteAttendanceByIdHelper({ commit, dispatch }, id) {
    try {
      const res = await httpCommons.delete(apiName + "/" + id);
      // console.log("res " + res);
      const result = {
        status: res.statusText,
        actions: res.status,
      };
      commit("SET_DELETE_ATTENDANCE", result);
      // dispatch("actionGetAllAttendence");
    } catch (error) { }
  },
};

const mutations = {
  SET_GET_DATA_ATTENDANCE(state, rows) {
    state.data = rows;
  },

  SET_CHECK_ATTENDANCE(state, status) {
    state.status = status;
  },

  SET_LOADING_ATTENDANCE(state, loading) {
    state.loading = loading;
  },

  SET_UPDATE_ATTENDANCE(state, status) {
    state.status = status;
  },

  SET_DELETE_ATTENDANCE(state, status) {
    state.status = status;
  },
};

const getters = {
  getDataAllAttendanceHelper: (state) => state.data,
  getStatusAttendanceHelper: (state) => state.status,
  getBulkAttendanceHelper: (state) => state.status,
  getLoadingAttendanceHelper: (state) => state.loading,
};

export default {
  state,
  getters,
  actions,
  mutations,
};