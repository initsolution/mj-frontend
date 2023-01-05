import httpCommons from '../../http-commons'

const apiName = 'loans'

const state = {
    dataLoan: [],
    statusLoan: {},
}

const actions = {
    async inputLoan({commit}, data){
        const res = await httpCommons.post(apiName, data)
        // console.log(res)
        commit('SET_STATUS_LOAN', res)
    }
}

const mutations = {
    SET_STATUS_LOAN(state, rows){
        state.statusLoan = rows
    }
}

const getters ={
    getStatusLoan : state => state.statusLoan
}

export default {
    state,
    getters,
    actions,
    mutations
}