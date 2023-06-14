<template>
  
  <v-app-bar id="app-bar" color="deep-purple" flat dark app>
    
    <v-app-bar-nav-icon @click="setDrawer(!drawer)"></v-app-bar-nav-icon>

    <v-toolbar-title></v-toolbar-title>
    <v-spacer></v-spacer>
    <form-user
      :dialogForm.sync="dialogForm"
      :dataUser.sync="user"
      :isOwner="false"
    />
    <ganti-password
      :dialogGantiPassword.sync="dialogGantiPassword"
      :user.sync="user"
    />
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-account-cog</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="openEdit">
          Ganti User
        </v-list-item>
        <v-list-item @click="openGantiPassword">
          Ganti Password
        </v-list-item>
      </v-list>
    </v-menu>
    
  </v-app-bar>
</template>
  
<script>
import { mapState, mapMutations } from "vuex";
import FormUser from "@/views/components/FormUser.vue";
import GantiPassword from "@/views/components/GantiPassword.vue";
import { parseJwt } from '@/utils/utils.js';
export default {
  name: "DashboardCoreAppBar",
  data() {
    return {
      dialogForm: false,
      dialogGantiPassword: false,
      user : {},
    };
  },
  components: { FormUser, GantiPassword },
  computed: {
    ...mapState(["drawer"]),
  },

  methods: {
    ...mapMutations({ setDrawer: "SET_DRAWER" }),
    parsingJwt(token) {
      return parseJwt(token);
    },
    openEdit() {
      const token = localStorage.getItem("token");
      const parsedToken = this.parsingJwt(token);
      this.user = parsedToken.user;
      this.dialogForm = true;
    },
    openGantiPassword() {
      const token = localStorage.getItem("token");
      const parsedToken = this.parsingJwt(token);
      this.user = parsedToken.user;
      this.dialogGantiPassword = true;
    },
  },
};
</script>
  