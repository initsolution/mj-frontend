
import httpCommons from '../../http-commons'

const apiName = 'detail-shift'

const state = {
    data: [],
    status: {},
    update: {},
    isLoading: {},
}

const actions = {
      async actionUpdateDetailShift({ commit, dispatch }, data) {
        try {
          const res = await httpCommons.patch(apiName + `/${data.id}`, data);
          console.log(res);
          const result = {
            status: res.statusText,
            actions: res.status,
          };
          commit("SET_UPDATE_DETAIL_SHIFT", result);
          dispatch("actionGetAllShift");
        } catch (error) {
          const result = {
            status: "duplicate",
            actions: 201,
          };
          commit("SET_UPDATE_DETAIL_SHIFT", result);
        }
      },
}

const mutations = {
    SET_UPDATE_DETAIL_SHIFT(state, status) {
      state.status = status
  },
}

const getters = {
    getAllDetailShift: state => state.data,
}

export default {
    state,
    getters,
    actions,
    mutations
}