
import httpCommons from '../../http-commons'

const apiNameProduksi = 'payslip-produksi'
const apiNameCs = 'payslip-helper'
const apiNameBulanan = 'payslip-bulanan'
const apiNameOwner = 'payslip-owner'

const state = {
    data: [],
    status: {},
    update: {},
    isLoading: {},
    dataPengeluaranDepartemen: [],
    dataDetailPengeluaran: [],
    statusDetailPengeluaran: {},
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
                data: res.data,
            }
            console.log(result);
            commit('SET_CHECK_PAYSLIP', result)
            commit('SET_LOADING', false)
            // dispatch('actionGetAllAttendence')
        } catch (error) {
            const result = {
                status: error.response.data.statusCode,
                data: error.response.data.data,
            }
            commit('SET_CHECK_PAYSLIP', result)
        }
    },

    async savePayslipCs({ commit, dispatch }, data) {
        try {
            commit('SET_LOADING', true)
            const res = await httpCommons.post(apiNameCs, data)
            const result = {
                status: res.statusText,
                actions: res.status,
                data: res.data,
            }
            console.log(result);
            commit('SET_CHECK_PAYSLIP', result)
            commit('SET_LOADING', false)
            // dispatch('actionGetAllAttendence')
        } catch (error) {
            const result = {
                status: error.response.data.statusCode,
                data: error.response.data.data,
            }
            commit('SET_CHECK_PAYSLIP', result)
        }
    },

    async savePayslipBulananOffice({ commit, dispatch }, data) {
        try {
            commit('SET_LOADING', true)
            const res = await httpCommons.post(apiNameBulanan, data)
            const result = {
                status: res.statusText,
                actions: res.status,
                data: res.data,
            }
            console.log(result);
            commit('SET_CHECK_PAYSLIP', result)
            commit('SET_LOADING', false)
            // dispatch('actionGetAllAttendence')
        } catch (error) {
            const result = {
                status: error.response.data.statusCode,
                data: error.response.data.data,
            }
            commit('SET_CHECK_PAYSLIP', result)
        }
    },

    async savePayslipOwner({ commit, dispatch }, data) {
        try {
            commit('SET_LOADING', true)
            const res = await httpCommons.post(apiNameOwner, data)
            const result = {
                status: res.statusText,
                actions: res.status,
                data: res.data,
            }
            console.log(result);
            commit('SET_CHECK_PAYSLIP', result)
            commit('SET_LOADING', false)
            // dispatch('actionGetAllAttendence')
        } catch (error) {
            const result = {
                status: error.response.data.statusCode,
                data: error.response.data.data,
            }
            commit('SET_CHECK_PAYSLIP', result)
        }
    },

    async ubahHariMasukOwner({ commit, dispatch }, data) {
        try {
            commit('SET_LOADING', true)
            const res = await httpCommons.patch(apiNameOwner + "/updatePayslipTotalHariMasuk", data)
            const result = {
                status: res.statusText,
                actions: res.status,
                data: res.data,
            }
            console.log(result);
            commit('SET_CHECK_PAYSLIP', result)
            commit('SET_LOADING', false)
            // dispatch('actionGetAllAttendence')
        } catch (error) {
            const result = {
                status: error.response.data.statusCode,
                data: error.response.data.data,
            }
            commit('SET_CHECK_PAYSLIP', result)
        }
    },

    async updatePayslipWithBon({ commit, dispatch }, data) {
        // commit('SET_LOADING', true)
        const res = await httpCommons.patch(apiNameProduksi + '/updatePayslipWithBon', data)
        console.log(res)
        commit('SET_CHECK_PAYSLIP', res)
    },

    async updatePayslipCsWithBon({ commit, dispatch }, data) {
        // commit('SET_LOADING', true)
        const res = await httpCommons.patch(apiNameCs + '/updatePayslipWithBon', data)
        console.log(res)
        commit('SET_CHECK_PAYSLIP', res)
    },

    async updatePayslipBulananWithBon({ commit, dispatch }, data) {
        // commit('SET_LOADING', true)
        const res = await httpCommons.patch(apiNameBulanan + '/updatePayslipWithBon', data)
        console.log(res)
        commit('SET_CHECK_PAYSLIP', res)
    },

    async updatePayslipOwnerWithBon({ commit, dispatch }, data) {
        // commit('SET_LOADING', true)
        const res = await httpCommons.patch(apiNameOwner + '/updatePayslipWithBon', data)
        console.log(res)
        commit('SET_CHECK_PAYSLIP', res)
    },

    async updatePayslipBulananTambahanPendapatanLain({ commit, dispatch }, data) {
        // commit('SET_LOADING', true)
        const res = await httpCommons.patch(apiNameBulanan + '/updatePayslipTambahanlain', data)
        console.log(res)
        commit('SET_CHECK_PAYSLIP', res)
    },


    async updatePayslipWithPotonganLain({ commit, dispatch }, data) {
        // commit('SET_LOADING', true)
        let apiname = ''
        if (data.jenis_potongan == 'produksi') {
            apiname = apiNameProduksi
        } else if (data.jenis_potongan == 'cs') {
            apiname = apiNameCs
        } else if (data.jenis_potongan == 'bulanan') {
            apiname = apiNameBulanan
        }
        const res = await httpCommons.patch(apiname + '/updatePayslipWithPotonganLain', data)
        // console.log(res)
        commit('SET_CHECK_PAYSLIP', res)
    },

    async pengeluaranDepartemen({ commit }, param) {
        let link
        if (param.departmentId == 1 || param.departmentId == 3) {
            if (param.departmentId == 1) {
                link = apiNameProduksi
            } else if (param.departmentId == 3) {
                link = apiNameCs
            }
            const res = await httpCommons.get(link + '/getTotalPengeluaran/' + param.bulantahun);
            commit('SET_DATA_TOTAL_PENGELUARAN_DEPARTEMEN', res.data)
        } else {
            const res = await httpCommons.get(apiNameBulanan + '/getTotalPengeluaranBulanan/' + param.bulantahun + '/' + param.departmentId);
            commit('SET_DATA_TOTAL_PENGELUARAN_DEPARTEMEN', res.data)
        }
    },

    async pengeluaranDetail({ commit }, param) {
        let link
        if (param.departmentId == 1 || param.departmentId == 3) {
            if (param.departmentId == 1) {
                link = apiNameProduksi
            } else if (param.departmentId == 3) {
                link = apiNameCs
            }
            const res = await httpCommons.get(link + '/getDetailPengeluaran/' + param.periodeAwal + '/' + param.periodeAkhir);
            commit('STATUS_DETAIL_PENGELUARAN', {
                status: res.status,
                statusText: res.statusText
            })
            commit('SET_DATA_DETAIL_PENGELUARAN', res.data)
        } else {
            const res = await httpCommons.get(apiNameBulanan + '/getDetailPengeluaranBulanan/' + param.periodeAwal + '/' + param.periodeAkhir + '/' + param.departmentId);
            commit('STATUS_DETAIL_PENGELUARAN', {
                status: res.status,
                statusText: res.statusText
            })
            commit('SET_DATA_DETAIL_PENGELUARAN', res.data)
        }

    },

    async pengeluaranDepartemenBulanan({ commit }, param) {
        // let link
        // if (param.departmentId == 1) {
        //     link = apiNameProduksi
        // } else if (param.departmentId == 3) {
        //     link = apiNameCs
        // }

        const res = await httpCommons.get(apiNameBulanan + '/getTotalPengeluaranBulanan/' + param.bulantahun + '/' + param.departmentId);
        commit('SET_DATA_TOTAL_PENGELUARAN_DEPARTEMEN', res.data)
    },

    async pengeluaranDetailBulanan({ commit }, param) {
        // let link
        // if (param.departmentId == 1) {
        //     link = apiNameProduksi
        // } else if (param.departmentId == 3) {
        //     link = apiNameCs
        // }
        const res = await httpCommons.get(apiNameBulanan + '/getDetailPengeluaranBulanan/' + param.periodeAwal + '/' + param.periodeAkhir + '/' + param.departmentId);
        // console.log(res)
        commit('STATUS_DETAIL_PENGELUARAN', {
            status: res.status,
            statusText: res.statusText
        }
        )
        commit('SET_DATA_DETAIL_PENGELUARAN', res.data)
    },

    async pengeluaranDepartemenOfficeKhusus({ commit }, param) {

        const res = await httpCommons.get(apiNameOwner + '/getTotalPengeluaran/' + param.bulantahun);
        commit('SET_DATA_TOTAL_PENGELUARAN_DEPARTEMEN', res.data)

    },

    async pengeluaranDetailOfficeKhusus({ commit }, param) {
        const res = await httpCommons.get(apiNameOwner + '/getDetailPengeluaran/' + param.periodeAwal + '/' + param.periodeAkhir);
        commit('STATUS_DETAIL_PENGELUARAN', {
            status: res.status,
            statusText: res.statusText
        })
        commit('SET_DATA_DETAIL_PENGELUARAN', res.data)
    },
    async updatePayslipOwnerCancelBon({ commit, dispatch }, data) {
        // commit('SET_LOADING', true)
        console.log(data)
        const res = await httpCommons.get(apiNameOwner + '/cancelPotonganBon/'+data.idPayslip+'/'+data.employeeId)
        console.log(res)
        commit('SET_CHECK_PAYSLIP', res)
    },
}

const mutations = {
    SET_LOADING(state, isLoading) {
        state.isLoading = {
            loading: isLoading
        }
    },

    SET_GET_DATA_PAYSLIP(state, rows) {
        state.data = rows
    },

    SET_CHECK_PAYSLIP(state, status) {
        state.status = status
    },
    SET_DATA_TOTAL_PENGELUARAN_DEPARTEMEN(state, data) {
        state.dataPengeluaranDepartemen = data
    },

    SET_DATA_DETAIL_PENGELUARAN(state, data) {
        state.dataDetailPengeluaran = data
    },
    STATUS_DETAIL_PENGELUARAN(state, data) {
        state.statusDetailPengeluaran = data
    }
}

const getters = {
    getDataAllPayslip: state => state.data,
    getStatusPayslip: state => state.status,
    geStatusLoading: state => state.isLoading,
    getdataPengeluaranDepartemen: state => state.dataPengeluaranDepartemen,
    getDataDetailPengeluaran: state => state.dataDetailPengeluaran,
    getStatusDetailPengeluaran: state => state.statusDetailPengeluaran
}

export default {
    state,
    getters,
    actions,
    mutations
}