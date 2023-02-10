import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: () => import("./views/Index.vue"),
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("./views/pages/Home.vue"),
        },
        {
          path: "karyawan",
          name: "Karyawan",
          component: () => import("./views/pages/Karyawan.vue"),
        },
        {
          path: "departemen",
          name: "Departemen",
          component: () => import("./views/pages/Departemen.vue"),
        },
        {
          path: "kehadiran",
          name: "Kehadiran",
          component: () => import("./views/pages/Kehadiran.vue"),
        },
        {
          path: "kehadiran_bulanan",
          name: "Kehadiran Bulanan",
          component: () => import("./views/pages/KehadiranBulanan.vue"),
        },
        {
          path: "kehadiran_mingguan",
          name: "Kehadiran Mingguan",
          component: () => import("./views/pages/KehadiranMingguan.vue"),
        },
        {
          path: "kehadiran_helper",
          name: "Kehadiran Helper",
          component: () => import("./views/pages/KehadiranHelper.vue"),
        },
        {
          path: "absensi",
          name: "Absensi",
          component: () => import("./views/pages/Absensi.vue"),
        },
        {
          path: "shift",
          name: "Shift",
          component: () => import("./views/pages/Shift.vue"),
        },
        {
          path: "pinjaman",
          name: "Pinjaman",
          component: () => import("./views/pages/Pinjaman.vue"),
        },
        {
          path: "payslip",
          name: "Payslip",
          component: () => import("./views/pages/Payslip.vue"),
        },
        {
          path: "viewPayslip",
          name: "ViewPayslip",
          component: () => import("./views/pages/ViewPayslip.vue"),
        },
        {
          path: "viewPayslipHelper",
          name: "ViewPayslipHelper",
          component: () => import("./views/pages/ViewPayslipHelper.vue"),
        },
        {
          path: "pengeluaran",
          name: "Pengeluaran",
          component: () => import("./views/pages/Pengeluaran.vue"),
        },
      ],
    },
  ],
});
