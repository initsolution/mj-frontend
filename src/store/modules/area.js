
import httpCommons from '../../http-commons'

const apiName = 'area'

const state = {
    data: [],
    status: {},
    update: {},
    isLoading: {},
}

const actions = {
    async actionGetAllAreaByDepartmentId({ commit }, param) {
        const res = await httpCommons.get(apiName, { params: param })
        commit('SET_DATA_AREA', res.data)
    },

    async actionGetAllAreaById({ commit }, data) {
        const id = data.id;
        const param = data.param;
        const res = await httpCommons.get(apiName + `/${id}`, { params: param })
        commit('SET_DATA_AREA', res.data)
    },

    async actionSaveArea({ commit, dispatch }, data) {
        try {
            const res = await httpCommons.post(apiName, data);
            const result = {
                status: res.statusText,
                actions: res.status,
            };
            commit("SET_SAVE_AREA", result);
            // dispatch("actionGetAllAreaByDepartmentId");
        } catch (error) {
            const result = {
                status: "duplicate",
                actions: 201,
            };
            commit("SET_SAVE_AREA", result);
        }
    },

    async actionUpdateArea({ commit, dispatch }, data) {
        try {
            const res = await httpCommons.patch(apiName + `/${data.id}`, data)
            const result = {
                status: res.statusText,
                actions: res.status
            }
            commit('SET_UPDATE_AREA', result)
            // dispatch('actionGetAllAreaByDepartmentId')
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_UPDATE_AREA', result)
        }
    },
}

const mutations = {
    SET_DATA_AREA(state, rows) {
        state.data = rows
    },
    SET_SAVE_AREA(state, status) {
        state.status = status
    },
    SET_UPDATE_AREA(state, status) {
        state.status = status
    }
}

const getters = {
    getDataAllArea: state => state.data,
    getStatusArea: state => state.status,
}

export default {
    state,
    getters,
    actions,
    mutations
}