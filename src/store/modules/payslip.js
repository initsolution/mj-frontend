
import httpCommons from '../../http-commons'

const apiNameProduksi = 'payslip-produksi'
const apiNameHelper = 'payslip-helper'
const apiNameBulanan = 'payslip-bulanan'

const state = {
    data: [],
    status: {},
    update: {},
    isLoading : {},
}

const actions = {
    // async actionGetPayslip({ commit }, date) {
    //     if(date == null) {
    //         console.log("date kosong");
    //         var today = new Date();
    //         var dd = String(today.getDate()).padStart(2, "0");
    //         var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    //         var yyyy = today.getFullYear();

    //         today = yyyy + "/" + mm + "/" + dd;
    //         // today = "18/11/2022"
    //         // console.log(today);
    //         date = today;
    //     }
    //     // param =  { s: { overtime: 30 } } 
    //     // const searching = new URLSearchParams([['overtime', 90]]);
    //     // const res = await httpCommons.get(apiNameProduksi+'?s=%7B%22overtime%22%3A90%7D')
    //     // const searching = new URLSearchParams([["overtime", 90]]);
    //     // const param1 = {
    //     //     "overtime": 90
    //     //   };
    //     // var datx = encodeURIComponent(searching);
    //     // var v = 90
    //     // const res = await httpCommons.get(apiNameProduksi, {params : {s : datx}})
    //     const filter = encodeURIComponent(`{"attendance_date":"${date}"}`)
    //     const path = `?s=${filter}`
    //     // const res = await httpCommons.get(apiNameProduksi + path)
    //     const res = await httpCommons.get(apiNameProduksi)
    //     commit('SET_GET_DATA_PAYSLIP', res.data)
    // },

    async savePayslip({ commit, dispatch }, data) {
        try {
            commit('SET_LOADING', true)
            const res = await httpCommons.post(apiNameProduksi, data)
            const result = {
                status: res.statusText,
                actions: res.status,
                data : res.data,
            }
            console.log(result);
            commit('SET_CHECK_PAYSLIP', result)
            commit('SET_LOADING', false)
            // dispatch('actionGetAllAttendence')
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_CHECK_PAYSLIP', result)
        }
    },

    async savePayslipHelper({ commit, dispatch }, data) {
        try {
            commit('SET_LOADING', true)
            const res = await httpCommons.post(apiNameHelper, data)
            const result = {
                status: res.statusText,
                actions: res.status,
                data : res.data,
            }
            console.log(result);
            commit('SET_CHECK_PAYSLIP', result)
            commit('SET_LOADING', false)
            // dispatch('actionGetAllAttendence')
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_CHECK_PAYSLIP', result)
        }
    },

    async savePayslipOffice({ commit, dispatch }, data) {
        try {
            commit('SET_LOADING', true)
            const res = await httpCommons.post(apiNameBulanan, data)
            const result = {
                status: res.statusText,
                actions: res.status,
                data : res.data,
            }
            console.log(result);
            commit('SET_CHECK_PAYSLIP', result)
            commit('SET_LOADING', false)
            // dispatch('actionGetAllAttendence')
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_CHECK_PAYSLIP', result)
        }
    },
    
    async updatePayslipWithBon({commit, dispatch}, data){
        // commit('SET_LOADING', true)
        const res = await httpCommons.patch(apiNameProduksi+'/updatePayslipWithBon', data)
        console.log(res)
        commit('SET_CHECK_PAYSLIP', res.data)
    },
    
    async updatePayslipHelperWithBon({commit, dispatch}, data){
        // commit('SET_LOADING', true)
        const res = await httpCommons.patch(apiNameHelper+'/updatePayslipWithBon', data)
        console.log(res)
        commit('SET_CHECK_PAYSLIP', res.data)
    },

    async updatePayslipOfficeWithBon({commit, dispatch}, data){
        // commit('SET_LOADING', true)
        const res = await httpCommons.patch(apiNameHelper+'/updatePayslipWithBon', data)
        console.log(res)
        commit('SET_CHECK_PAYSLIP', res.data)
    }
}

const mutations = {
    SET_LOADING(state, isLoading){
        state.isLoading ={
            loading : isLoading
        }
    },
    
    SET_GET_DATA_PAYSLIP(state, rows) {
        state.data = rows
    },
   
    SET_CHECK_PAYSLIP(state, status) {
        state.status = status
    },
}

const getters = {
    getDataAllPayslip: state => state.data,
    getStatusPayslip: state => state.status,
    geStatusLoading: state => state.isLoading,
}

export default {
    state,
    getters,
    actions,
    mutations
}