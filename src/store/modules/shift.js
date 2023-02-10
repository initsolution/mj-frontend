import httpCommons from '../../http-commons';

const apiName = 'shift';

const state = {
  data: [],
  status: {},
  update: {},
  isLoading: {},
};

const actions = {
  async actionGetAllShift({ commit }) {
    const res = await httpCommons.get(apiName + '?join=detailShift');
    console.log(res.data);
    commit('SET_DATA_SHIFT', res.data);
  },

  async actionSaveShift({ commit, dispatch }, data) {
    try {
      const res = await httpCommons.post(apiName + '/createShiftDetail', data);
      console.log(res);
      const result = {
        status: res.statusText,
        actions: res.status,
      };
      commit('SET_SAVE_SHIFT', result);
      dispatch('actionGetAllShift');
    } catch (error) {
      const result = {
        status: 'duplicate',
        actions: 201,
      };
      commit('SET_SAVE_SHIFT', result);
    }
  },

  async actionUpdateShift({ commit, dispatch }, data) {
    try {
      const res = await httpCommons.patch(apiName + `/${data.id}`, data);
      console.log(res);
      const result = {
        status: res.statusText,
        actions: res.status,
      };
      commit('SET_UPDATE_SHIFT', result);
      dispatch('actionGetAllShift');
    } catch (error) {
      const result = {
        status: 'duplicate',
        actions: 201,
      };
      commit('SET_UPDATE_SHIFT', result);
    }
  },
};

const mutations = {
  SET_DATA_SHIFT(state, rows) {
    state.data = rows;
  },
  SET_SAVE_SHIFT(state, status) {
    state.status = status;
  },
  SET_UPDATE_SHIFT(state, status) {
    state.status = status;
  },
};

const getters = {
  getAllDataShift: (state) => state.data,
};

export default {
  state,
  getters,
  actions,
  mutations,
};
