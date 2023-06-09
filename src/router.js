import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store/index';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      meta: {
        guest: true,
      },
      component: () => import('./views/Login.vue'),
    },
    {
      path: '/',
      meta: {
        auth: true,
      },
      component: () => import('./views/Index.vue'),
      children: [
        {
          path: '/',
          name: 'Home',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/Home.vue'),
        },
        {
          path: 'karyawan',
          name: 'Karyawan',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/Karyawan.vue'),
        },
        {
          path: 'departemen',
          name: 'Departemen',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/Departemen.vue'),
        },
        {
          path: 'kehadiran',
          name: 'Kehadiran',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/Kehadiran.vue'),
        },
        {
          path: 'kehadiran_bulanan',
          name: 'Kehadiran Bulanan',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/KehadiranBulanan.vue'),
        },
        {
          path: 'kehadiran_mingguan',
          name: 'Kehadiran Mingguan',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/KehadiranMingguan.vue'),
        },
        {
          path: 'kehadiran_cs',
          name: 'Kehadiran CS',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/KehadiranCs.vue'),
        },
        {
          path: 'absensi',
          name: 'Absensi',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/Absensi.vue'),
        },
        {
          path: 'shift',
          name: 'Shift',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/Shift.vue'),
        },
        {
          path: 'pinjaman',
          name: 'Pinjaman',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/Pinjaman.vue'),
        },
        {
          path: 'payslip',
          name: 'Payslip',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/Payslip.vue'),
        },
        {
          path: 'viewPayslip',
          name: 'ViewPayslip',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/ViewPayslip.vue'),
        },
        {
          path: 'viewPayslipCs',
          name: 'ViewPayslipCs',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/ViewPayslipCs.vue'),
        },
        {
          path: 'viewPayslipBulananOffice',
          name: 'viewPayslipBulananOffice',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/ViewPayslipBulananOffice.vue'),
        },
        {
          path: 'viewPayslipOwner',
          name: 'viewPayslipOwner',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/ViewPayslipOwner.vue'),
        },
        {
          path: 'pengeluaran',
          name: 'Pengeluaran',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/Pengeluaran.vue'),
        },
        {
          path: 'detail_pengeluaran',
          name: 'Detail Pengeluaran',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/DetailPengeluaran.vue'),
        },
        {
          path: 'payslip-owner',
          name: 'Payslip-Owner',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/PayslipOwner.vue'),
        },
        {
          path: 'pinjaman-owner',
          name: 'pinjaman-Owner',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/PinjamanOwner.vue'),
        },
        {
          path: 'user',
          name: 'user',
          meta: {
            auth: true,
          },
          component: () => import('./views/pages/User.vue'),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // const publicPages = ['/login'];
  // const authRequired = !publicPages.includes(to.path);
  // const loggedIn = localStorage.getItem('user');

  // if (authRequired && !loggedIn) {
  //   return next('/login');
  // }

  // next();

  await store.restored;
  // console.log(to.matched.some((record) => record.meta.auth));
  if (to.matched.some((record) => record.meta.auth)) {
    const loggedIn = localStorage.getItem('token');
    // console.log(loggedIn);
    // localStorage.removeItem('token');
    if (!loggedIn) {
      next('/login');
      return;
    }
    next();
  }
  next();
});

export default router;
