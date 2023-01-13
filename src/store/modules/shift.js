
import httpCommons from '../../http-commons'

const apiName = 'shift'

const state = {
    data: [],
    status: {},
    update: {},
    isLoading : {},
}

const actions = {
    async actionGetDetailShiftById({ commit }, id) {
        const res = await httpCommons.patch(apiName + `/${id}` +"?join=detailShift")
        commit('SET_DATA_SHIFT', res.data)
    },
}

const mutations = {
    SET_DATA_SHIFT(state, rows) {
        state.data = rows
    },
}

const getters = {
    getAllDataDetailShiftById: state => state.data,
}

export default {
    state,
    getters,
    actions,
    mutations
}