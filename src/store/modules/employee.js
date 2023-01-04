import httpCommons from '../../http-commons'

const apiName = 'employee'

const state = {
    dataEmployee: [],
    statusEmployee: {},
    
}

const actions = {
    async getAllEmployee({commit}, param){
        const res = await httpCommons.get(apiName, {params : param})
        console.log(res.data)
        commit('SET_DATA_EMPLOYEE', res.data)
    }
}

const mutations = {
    SET_DATA_EMPLOYEE(state, rows){
        state.dataEmployee = rows
    }
}

const getters ={
    getDataEmployees : state => state.dataEmployee
}

export default {
    state,
    getters,
    actions,
    mutations
}