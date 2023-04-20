import httpCommons from '../../http-commons';

const apiName = 'user';

const state = {
  auth: {},
};

const actions = {
  async actionLogin({ commit, dispatch }, data) {
    try {
      console.log('pass');
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
};

const mutations = {
  SET_LOGIN(state, auth) {
    state.auth = auth;
  },
};

const getters = {
  getAuthLogin: (state) => state.auth,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
