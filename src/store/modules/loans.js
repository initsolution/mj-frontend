import httpCommons from '../../http-commons'

const apiName = 'loans'

const state = {
    dataLoan: [],
    statusLoan: {},
    dataLoanByDept : [],
}

const actions = {
    async inputLoan({commit}, data){
        const res = await httpCommons.post(apiName, data)
        // console.log(res)
        commit('SET_STATUS_LOAN', res)
    },
    
    async getTotalLoanPerDepartment({commit}){
        const res = await httpCommons.get(apiName+'/totaLoanByDepartment')
        commit('SET_DATA_LOAN_BY_DEPT', res.data)
    }
}

const mutations = {
    SET_STATUS_LOAN(state, rows){
        state.statusLoan = rows
    },
    SET_DATA_LOAN_BY_DEPT(state, rows){
        state.dataLoanByDept = rows
    }
}

const getters ={
    getStatusLoan : state => state.statusLoan,
    getDataLoanByDept : state => state.dataLoanByDept
}

export default {
    state,
    getters,
    actions,
    mutations
}