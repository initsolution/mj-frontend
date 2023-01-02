<template>
  <v-app-bar id="app-bar" color="deep-purple" flat dark app>
    <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>

    <v-toolbar-title></v-toolbar-title>
  </v-app-bar>
</template>
  
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "DashboardCoreAppBar",
  computed: {
    ...mapState(["drawer"]),
  },

  methods: {
    ...mapMutations({ setDrawer: "SET_DRAWER" }),
  },
};
</script>
  