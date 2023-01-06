
import httpCommons from '../../http-commons'

const apiName = 'department'

const state = {
    data: [],
    status: {},
    update: {},
    isLoading : {},
}

const actions = {
    async actionGetAllDepartment({ commit }) {
        const res = await httpCommons.get(apiName)
        commit('SET_DATA_DEPARTEMENT', res.data)
    },

    async actionUpdateDepartement({ commit, dispatch }, data) {
        try {
            const res = await httpCommons.patch(apiName + `/${data.id}`, data)
            console.log(res);
            const result = {
                status: res.statusText,
                actions: res.status
            }
            commit('SET_RES_UPDATE_DEPARTEMENT', result)
            dispatch('actionGetAllDepartment')
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_RES_UPDATE_DEPARTEMENT', result)
        }
    },
}

const mutations = {
    SET_DATA_DEPARTEMENT(state, rows) {
        state.data = rows
    },
    SET_RES_UPDATE_DEPARTEMENT(state, status) {
        state.status = status
    }
}

const getters = {
    getDataAllDepartement: state => state.data,
    getResUpdateDepartement: state => state.status,
}

export default {
    state,
    getters,
    actions,
    mutations
}