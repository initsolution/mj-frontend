
import httpCommons from '../../http-commons'

const apiName = 'position'

const state = {
    data: [],
    status: {},
    update: {},
    isLoading : {},
}

const actions = {
    async actionGetAllPositionByAreaId({ commit }, param) {
        const res = await httpCommons.get(apiName, { params: param })
        commit('SET_DATA_POSITION', res.data)
    },

    async actionSavePosition({ commit, dispatch }, data) {
        try {
          const res = await httpCommons.post(apiName, data);
          const result = {
            status: res.statusText,
            actions: res.status,
          };
          commit("SET_SAVE_POSITION", result);
        //   dispatch("actionGetAllPositionByAreaId");
        } catch (error) {
          const result = {
            status: "duplicate",
            actions: 201,
          };
          commit("SET_SAVE_POSITION", result);
        }
      },

    async actionUpdatePosition({ commit, dispatch }, data) {
        try {
            const res = await httpCommons.patch(apiName + `/${data.id}`, data)
            console.log(res);
            const result = {
                status: res.statusText,
                actions: res.status
            }
            commit('SET_UPDATE_POSITION', result)
            // dispatch('actionGetAllPositionByAreaId')
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_UPDATE_POSITION', result)
        }
    },
}

const mutations = {
    SET_DATA_POSITION(state, rows) {
        state.data = rows
    },
    SET_SAVE_POSITION(state, status) {
        state.status = status
    },
    SET_UPDATE_POSITION(state, status) {
        state.status = status
    }
}

const getters = {
    getDataAllPosition: state => state.data,
    getStatusPosition: state => state.status,
}

export default {
    state,
    getters,
    actions,
    mutations
}