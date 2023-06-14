import httpCommons from '../../http-commons';

const apiName = 'user';

const state = {
  auth: {},
  data: [],
  status: {},
};

const actions = {
  async actionLogin({ commit, dispatch }, data) {
    try {
      const res = await httpCommons.post(apiName + '/login', data);
      const result = {
        message: res.data.message,
        expiresIn: res.data.expires_in,
        tokenType: res.data.token_type,
        statusCode: res.data.statusCode,
      };
      // localStorage.setItem('user', JSON.stringify(result));
      if (res.data.statusCode == 202) {
        localStorage.setItem('token', res.data.message);
      }
      commit('SET_LOGIN', result);
      // dispatch("actionGetAllAreaByDepartmentId");
    } catch (error) {
      const result = {
        status: 'Error login !',
        actions: 201,
      };
      commit('SET_LOGIN', result);
    }
  },

  async actionLogout() {
    localStorage.removeItem('token');
    // removeHeaderToken();
  },
  async actionGetDataUsers({ commit }, params) {
    const res = await httpCommons.get(apiName, { params: params });
    commit('SET_DATA_USER', res.data);
  },

  async actionInsertUsers({ commit, dispatch }, user) {
    try {
      const res = await httpCommons.post(apiName, user)
      const result = {
        status: res.statusText,
        actions: res.status,
        data: res.data,
      };
      commit('SET_STATUS_RESPONSE', result);
      dispatch('actionGetDataUsers');
    } catch {
      const result = {
        status: 'duplicate',
        actions: 201,
      };
      commit('SET_STATUS_RESPONSE', result);
    }

  },

  async actionUpdateUsers({ commit, dispatch }, user) {
    try {
      const res = await httpCommons.patch(apiName + `/${user.id}`, user)
      const result = {
        status: res.statusText,
        actions: res.status,

      };
      commit('SET_STATUS_RESPONSE', result);
      dispatch('actionGetDataUsers');
    } catch (error) {
      const result = {
        status: error,
        actions: 404,
      };
      commit('SET_STATUS_RESPONSE', result);
    }

  },
  async actionDeleteUsers({ commit, dispatch }, user) {
    try {
      const res = await httpCommons.delete(apiName + `/${user.id}`)
      const result = {
        status: res.statusText,
        actions: res.status,

      };
      commit('SET_STATUS_RESPONSE', result);
      dispatch('actionGetDataUsers');
    } catch (error) {
      const result = {
        status: error,
        actions: 404,
      };
      commit('SET_STATUS_RESPONSE', result);
    }

  }
};

const mutations = {
  SET_LOGIN(state, auth) {
    state.auth = auth;
  },
  SET_DATA_USER(state, data) {
    state.data = data
  },
  SET_STATUS_RESPONSE(state, status) {
    state.status = status;
  },
};

const getters = {
  getAuthLogin: (state) => state.auth,
  getDataUsers: (state) => state.data,
  getStatusUserResponse: (state) => state.status,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
