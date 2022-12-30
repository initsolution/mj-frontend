import Vue from 'vue'
import Vuex from 'vuex'
import Attendance from './modules/attendance'
import Payslip from './modules/payslip'

Vue.use(Vuex)

export default new Vuex.Store({
    modules : {
        // User
        Attendance,
        Payslip
    }
})