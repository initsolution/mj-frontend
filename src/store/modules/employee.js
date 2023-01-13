import httpCommons from "../../http-commons";

const apiName = "employee";

const state = {
  data: [],
  status: {},
};

const actions = {
  async actionGetAllEmployee({ commit }, param) {
    const res = await httpCommons.get(apiName, { params: param });
    // console.log(res.data)
    commit("SET_DATA_EMPLOYEE", res.data);
  },
  async saveBulkEmployee({ commit, dispatch }, data) {
    console.log(data);
    try {
      const res = await httpCommons.post(apiName + "/bulk", data);
      const result = {
        status: res.statusText,
        actions: res.status,
        data: res.data,
      };
      console.log(result);
      commit("SET_BULK_EMPLOYEE", result);
      dispatch("actionGetAllEmployee");
    } catch (error) {
      const result = {
        status: "duplicate",
        actions: 201,
      };
      commit("SET_BULK_EMPLOYEE", result);
    }
  },
};

const mutations = {
  SET_DATA_EMPLOYEE(state, rows) {
    state.data = rows;
  },
  SET_BULK_EMPLOYEE(state, status) {
    state.status = status;
  },
};

const getters = {
  getDataEmployees: (state) => state.data,
  getBulkEmployees: (state) => state.status,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
