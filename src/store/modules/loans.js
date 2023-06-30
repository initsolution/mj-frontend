import httpCommons from '../../http-commons'
import { parseJwt } from '@/utils/utils.js';

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
        var token = localStorage.getItem('token');
        const parseToken =parseJwt(token);
        const user =parseToken.user
        // console.log('loan dept')
        // console.log(parseToken.user)
        // var header = {
        //     'Authorization' : 'Bearer '+token
        // }
        // const res = await httpCommons.get(apiName+'/totaLoanByDepartment', {headers : header})
        const res = await httpCommons.get(apiName+'/totaLoanByDepartment/'+user.role )
        console.log(res.data)
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