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
          path: "absensi",
          name: "Absensi",
          component: () => import("./views/pages/Absensi.vue"),
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
          path: "pengeluaran",
          name: "Pengeluaran",
          component: () => import("./views/pages/Pengeluaran.vue"),
        },
      ],
    },
  ],
});