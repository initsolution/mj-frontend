<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    class="deep-purple"
    :expand-on-hover="expandOnHover"
    mobile-breakpoint="960"
    app
    width="260"
    dark
  >
    <v-list dense>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/8.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Halo, {{ email }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-2" />
      <!-- <v-list>
            <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list> -->

      <div v-for="(item, i) in items" :key="i">
        <v-list-item v-if="!item.children" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          v-else
          :prepend-icon="item.icon"
          :value="item.title"
          color="#ffffff"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <v-list-item
            v-for="child in item.children"
            :key="child.title"
            :to="child.to"
          >
            <v-list-item-content>
              <v-list-item-title>{{ child.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout" color="blue" block> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
  
<script>
import { mapActions, mapState } from 'vuex';
import { parseJwt } from '@/utils/utils.js';

export default {
  name: 'DashboardCoreDrawer',

  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit('SET_DRAWER', val);
      },
    },
  },

  methods: {
    ...mapActions(['actionLogout']),
    logout() {
      this.actionLogout();
      this.$router.push('/login').catch(() => {});
    },

    parsingJwt(token) {
      return parseJwt(token);
    },
  },

  created() {
    const token = localStorage.getItem('token');
    const parsedToken = this.parsingJwt(token);
    this.email = parsedToken.user.email;
    if (parsedToken.user.role == 'owner') {
      this.items = [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/',
        },
        {
          title: 'Karyawan',
          icon: 'mdi-account-box',
          to: '/karyawan',
        },
        {
          title: 'Departemen',
          icon: 'mdi-account-group',
          to: '/departemen',
        },
        {
          title: 'Shift',
          icon: 'mdi-timer',
          to: '/shift',
        },
        {
          title: 'Kehadiran',
          icon: 'mdi-calendar-check',
          to: '/kehadiran',
          children: [
            {
              title: 'Bulanan',
              icon: 'mdi-calendar-check',
              to: '/kehadiran_bulanan',
            },
            {
              title: 'Produksi',
              icon: 'mdi-calendar-check',
              to: '/kehadiran_mingguan',
            },
            {
              title: 'Cleaning Service',
              icon: 'mdi-calendar-check',
              to: '/kehadiran_cs',
            },
          ],
        },
        {
          title: 'Absensi',
          icon: 'mdi-calendar-remove',
          to: '/absensi',
        },
        {
          title: 'Pinjaman',
          icon: 'mdi-calendar-clock',
          to: '/pinjaman',
        },
        {
          title: 'Payslip',
          icon: 'mdi-file-document',
          to: '/payslip',
        },
        {
          title: 'Owner',
          icon: 'mdi-key',
          to: '/owner',
          children: [
            {
              title: 'Payslip',
              icon: 'mdi-file-document',
              to: '/payslip-owner',
            },
            {
              title: 'Pinjaman',
              icon: 'mdi-calendar-clock',
              to: '/pinjaman-owner',
            },
          ],
        },
        {
          title: 'Pengeluaran',
          icon: 'mdi-file-document-arrow-right-outline',
          to: '/pengeluaran',
        },
      ];
    } else if (parsedToken.user.role == 'admin') {
      this.items = [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/',
        },
        {
          title: 'Karyawan',
          icon: 'mdi-account-box',
          to: '/karyawan',
        },
        {
          title: 'Departemen',
          icon: 'mdi-account-group',
          to: '/departemen',
        },
        {
          title: 'Shift',
          icon: 'mdi-timer',
          to: '/shift',
        },
        {
          title: 'Kehadiran',
          icon: 'mdi-calendar-check',
          to: '/kehadiran',
          children: [
            {
              title: 'Bulanan',
              icon: 'mdi-calendar-check',
              to: '/kehadiran_bulanan',
            },
            {
              title: 'Produksi',
              icon: 'mdi-calendar-check',
              to: '/kehadiran_mingguan',
            },
            {
              title: 'Cleaning Service',
              icon: 'mdi-calendar-check',
              to: '/kehadiran_cs',
            },
          ],
        },
        {
          title: 'Absensi',
          icon: 'mdi-calendar-remove',
          to: '/absensi',
        },
        {
          title: 'Pinjaman',
          icon: 'mdi-calendar-clock',
          to: '/pinjaman',
        },
        {
          title: 'Payslip',
          icon: 'mdi-file-document',
          to: '/payslip',
        },
        {
          title: 'Pengeluaran',
          icon: 'mdi-file-document-arrow-right-outline',
          to: '/pengeluaran',
        },
      ];
    } else if (parsedToken.user.role == 'operator') {
      this.items = [
        {
          title: 'Home',
          icon: 'mdi-home',
          to: '/',
        },
        {
          title: 'Karyawan',
          icon: 'mdi-account-box',
          to: '/karyawan',
        },
        {
          title: 'Departemen',
          icon: 'mdi-account-group',
          to: '/departemen',
        },
        {
          title: 'Shift',
          icon: 'mdi-timer',
          to: '/shift',
        },
        {
          title: 'Kehadiran',
          icon: 'mdi-calendar-check',
          to: '/kehadiran',
          children: [
            {
              title: 'Bulanan',
              icon: 'mdi-calendar-check',
              to: '/kehadiran_bulanan',
            },
            {
              title: 'Produksi',
              icon: 'mdi-calendar-check',
              to: '/kehadiran_mingguan',
            },
            {
              title: 'Cleaning Service',
              icon: 'mdi-calendar-check',
              to: '/kehadiran_cs',
            },
          ],
        },
        {
          title: 'Absensi',
          icon: 'mdi-calendar-remove',
          to: '/absensi',
        },
      ];
    }
    console.log(parsedToken);
  },
  data: () => ({
    items: [],
    email: '',
  }),
};
</script>