import Vue from 'vue'
import Vuex from 'vuex'
import Attendance from './modules/attendance'

Vue.use(Vuex)

export default new Vuex.Store({
    modules : {
        // User
        Attendance
    }
})