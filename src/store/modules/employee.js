import httpCommons from '../../http-commons';

const apiName = 'employee';

const state = {
  data: [],
  status: {},
};

const actions = {
  async actionGetAllEmployee({ commit }) {
    
    const params = new URLSearchParams();
    params.append('join', 'department');
    params.append('join', 'area');
    params.append('join', 'position');
    params.append('join', 'shift');
    params.append('join', 'loan');
    params.append('sort', 'name,ASC');
    const res = await httpCommons.get(apiName, { params: params });
    // console.log(res.data)
    commit('SET_DATA_EMPLOYEE', res.data);
  },
  async saveBulkEmployee({ commit, dispatch }, data) {
    console.log('save');
    console.log(data);
    try {
      const res = await httpCommons.post(apiName + '/bulk', data);
      const result = {
        status: res.statusText,
        actions: res.status,
        data: res.data,
      };
      console.log(result);
      commit('SET_STATUS_RESPONSE', result);
      dispatch('actionGetAllEmployee');
    } catch (error) {
      const result = {
        status: 'duplicate',
        actions: 201,
      };
      commit('SET_STATUS_RESPONSE', result);
    }
  },
  async actionUpdateEmployee({ commit, dispatch }, data) {
    try {
      const res = await httpCommons.patch(apiName + `/${data.id}`, data);
      console.log('res ' + res);
      const result = {
        status: res.statusText,
        actions: res.status,
      };
      commit('SET_STATUS_RESPONSE', result);
      dispatch('actionGetAllEmployee');
    } catch (error) {
      const result = {
        status: error,
        actions: 404,
      };
      commit('SET_STATUS_RESPONSE', result);
    }
  },

  async actionSaveEmployee({ commit, dispatch }, data) {
    try {
      const res = await httpCommons.post(apiName, data);
      const result = {
        status: res.statusText,
        actions: res.status,
      };
      commit('SET_STATUS_RESPONSE', result);
      dispatch('actionGetAllEmployee');
    } catch (error) {
      const result = {
        status: error,
        actions: 404,
      };
      commit('SET_STATUS_RESPONSE', result);
    }
  },
};

const mutations = {
  SET_DATA_EMPLOYEE(state, rows) {
    state.data = rows;
  },
  SET_STATUS_RESPONSE(state, status) {
    state.status = status;
  },
};

const getters = {
  getDataEmployees: (state) => state.data,
  getStatusResponse: (state) => state.status,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
