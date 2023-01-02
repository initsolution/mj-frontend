<template>
  <v-app>
    <dashboard-core-drawer />
    <dashboard-core-app-bar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
  
<script>
export default {
  name: "DashboardIndex",

  components: {
    DashboardCoreAppBar: () => import("./components/core/AppBar"),
    DashboardCoreDrawer: () => import("./components/core/NavigationDrawer"),
  },

  data: () => ({
    expandOnHover: false,
  }),
};
</script>
  