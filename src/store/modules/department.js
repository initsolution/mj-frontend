
import httpCommons from '../../http-commons'

const apiName = 'department'

const state = {
    data: [],
    status: {},
    update: {},
    isLoading: {},
}

const actions = {
    async actionGetAllDepartment({ commit }, param) {
        // const param = new URLSearchParams();
        // param.append("join", "area");
        // param.append('filter', 'department.id||$eq||1');
        // const res = await httpCommons.get(apiName, { params: param })
        const res = await httpCommons.get(apiName, {params : param})
        commit('SET_DATA_DEPARTEMENT', res.data)
    },

    async actionUpdateDepartement({ commit, dispatch }, data) {
        try {
            const res = await httpCommons.patch(apiName + `/${data.id}`, data)
            const result = {
                status: res.statusText,
                actions: res.status
            }
            commit('SET_STATUS_DEPARTEMENT', result)
            // dispatch('actionGetAllDepartment')
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_STATUS_DEPARTEMENT', result)
        }
    },
}

const mutations = {
    SET_DATA_DEPARTEMENT(state, rows) {
        state.data = rows
    },
    SET_STATUS_DEPARTEMENT(state, status) {
        state.status = status
    }
}

const getters = {
    getDataAllDepartement: state => state.data,
    getStatusDepartement: state => state.status,
}

export default {
    state,
    getters,
    actions,
    mutations
}