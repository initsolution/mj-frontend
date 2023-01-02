<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    class="deep-purple"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    app
    width="260"
    v-bind="$attrs"
    dark
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>e-Payroll</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider class="mb-2" />
    <v-list>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block> Logout </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>
  
<script>
import { mapState } from "vuex";
export default {
  name: "DashboardCoreDrawer",

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
        this.$store.commit("SET_DRAWER", val);
      },
    },
  },
  
  data: () => ({
    items: [
      {
        title: "Home",
        icon: "mdi-home",
        to: "/",
      },
      {
        title: "Karyawan",
        icon: "mdi-account-box",
        to: "/karyawan",
      },
      {
        title: "Departemen",
        icon: "mdi-account-group",
        to: "/departemen",
      },
      {
        title: "Kehadiran",
        icon: "mdi-calendar-check",
        to: "/kehadiran",
      },
      {
        title: "Absensi",
        icon: "mdi-calendar-remove",
        to: "/absensi",
      },
      {
        title: "Pinjaman",
        icon: "mdi-calendar-clock",
        to: "/pinjaman",
      },
      {
        title: "Payslip",
        icon: "mdi-file-document",
        to: "/payslip",
      },
      {
        title: "Pengeluaran",
        icon: "mdi-file-document-arrow-right-outline",
        to: "/pengeluaran",
      },
    ],
  }),
};
</script>