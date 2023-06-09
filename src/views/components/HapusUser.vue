<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogHapusUser" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span class="headline">Hapus User</span>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span
                  >Apakah anda yakin ingin menghapus user ({{
                    this.user.nama
                  }}) ?</span
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-4 px-8 py-4 d-flex flex-row">
          <v-btn
            min-width="100"
            class="elevation-0"
            color="primary"
            dark
            @click="deleteUser"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "HapusUser",
  props: {
    dialogHapusUser: {
      default: false,
    },
    user: {},
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['actionDeleteUsers']),
    deleteUser() {
      // console.log(this.deleteItems.length);
      
      this.actionDeleteUsers(this.user)
      this.close();
    },

    close() {
      this.$emit('update:dialogHapusUser', false);
    },
  },
};
</script>

<style>
</style>