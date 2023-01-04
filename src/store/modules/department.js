
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
}

const mutations = {
    SET_DATA_DEPARTEMENT(state, rows) {
        state.data = rows
    },
}

const getters = {
    getDataAllDepartement: state => state.data,
}

export default {
    state,
    getters,
    actions,
    mutations
}