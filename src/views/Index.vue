<template>
  <v-app>
    <!--  <router-link v-if="!isLoggedIn" to="/login"
      ><button>Login</button></router-link
    >
    <div v-else> -->
    <dashboard-core-drawer />
    <dashboard-core-app-bar />
    <v-main>
      <router-view />
    </v-main>
    <!-- </div> -->
  </v-app>
</template>
<!-- <router-link v-if="!isLoggedIn" to="/login"><button>Login</button></router-link> -->
<script>
import { mapGetters } from 'vuex';
export default {
  name: 'DashboardIndex',

  components: {
    DashboardCoreAppBar: () => import('./components/core/AppBar'),
    DashboardCoreDrawer: () => import('./components/core/NavigationDrawer'),
  },

  data: () => ({
    expandOnHover: false,
  }),

  // computed: {
  //   ...mapGetters(['isLoggedIn']),
  // },
};
</script>
  