
import httpCommons from '../../http-commons'

const apiName = 'attendance'

const state = {
    data: [],
    status: {},
}

const actions = {
    async actionGetAllUsers({ commit }, param) {
        const res = await httpCommons.get(apiName, { params: param })
        commit('SET_DATA_USERS', res.data)
    },

    async saveAttendance({ commit, dispatch }, data) {
        try {
            const res = await httpCommons.post(apiName, data)
            const result = {
                status: res.statusText,
                actions: res.status
            }
            commit('SET_RES_REGISTER_USER', result)
            
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_RES_REGISTER_USER', result)
        }
    },

    async saveBulkAttendance({ commit, dispatch }, data) {
        try {
            const res = await httpCommons.post(apiName+"/bulk", data)
            const result = {
                status: res.statusText,
                actions: res.status,
                data : res.data,
            }
            console.log(result);
            commit('SET_RES_REGISTER_USER', result)
            
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_RES_REGISTER_USER', result)
        }
    },

    async checkAttendance({ commit, dispatch }, data) {
        try {
            const res = await httpCommons.post(apiName + "/checkAttendance", data)
            const result = {
                status: res.statusText,
                actions: res.status,
                data : res.data,
            }
            console.log(result.data);
            commit('SET_CHECK_ATTENDANCE', result)
            
        } catch (error) {
            const result = {
                status: 'duplicate',
                actions: 201
            }
            commit('SET_CHECK_ATTENDANCE', result)
        }
    },

}

const mutations = {
    SET_DATA_USERS(state, rows) {
        state.data = rows
    },
    SET_RES_REGISTER_USER(state, status) {
        state.status = status
    },
    SET_CHECK_ATTENDANCE(state, status) {
        state.status = status
    }
}

const getters = {
    getDataAllUsers: state => state.data,
    getResRegisterUser: state => state.status,
    getStatusAttendance: state => state.status,
}

export default {
    state,
    getters,
    actions,
    mutations
}