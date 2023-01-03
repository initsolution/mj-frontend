
import httpCommons from '../../http-commons'

const apiName = 'payslip-produksi'

const state = {
    data: [],
    status: {},
    update: {},
    isLoading : {},
}

const actions = {
    async actionGetPayslip({ commit }, date) {
        if(date == null) {
            console.log("date kosong");
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, "0");
            var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            var yyyy = today.getFullYear();

            today = yyyy + "/" + mm + "/" + dd;
            // today = "18/11/2022"
            // console.log(today);
            date = today;
        }
        // param =  { s: { overtime: 30 } } 
        // const searching = new URLSearchParams([['overtime', 90]]);
        // const res = await httpCommons.get(apiName+'?s=%7B%22overtime%22%3A90%7D')
        // const searching = new URLSearchParams([["overtime", 90]]);
        // const param1 = {
        //     "overtime": 90
        //   };
        // var datx = encodeURIComponent(searching);
        // var v = 90
        // const res = await httpCommons.get(apiName, {params : {s : datx}})
        const filter = encodeURIComponent(`{"attendance_date":"${date}"}`)
        const path = `?s=${filter}`
        // const res = await httpCommons.get(apiName + path)
        const res = await httpCommons.get(apiName)
        commit('SET_GET_DATA_PAYSLIP', res.data)
    },

    async savePayslip({ commit, dispatch }, data) {
        console.log("save playslip : "+data);
        try {
            commit('SET_LOADING', true)
            const res = await httpCommons.post(apiName, data)
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