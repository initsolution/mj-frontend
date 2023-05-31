<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogHapusKaryawan" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span class="headline">Hapus Karyawan</span>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span
                  >Apakah anda yakin ingin menghapus data karyawan yang sudah
                  dipilih ({{ this.deleteItems.length }} data) ?</span
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
            @click="deleteEmployee"
          >
            Hapus
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
  
  <script>
import { mapActions } from 'vuex';
export default {
  name: 'HapusKehadiran',
  props: {
    dialogHapusKaryawan: {
      default: false,
    },
    deleteItems: [],
    getDataDepartemen: {},
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['actionUpdateEmployee']),
    deleteEmployee() {
      // console.log(this.deleteItems.length);
      if (this.deleteItems.length > 0) {
        for (var i = 0; i < this.deleteItems.length; i++) {
          const _employee = {
            id: this.deleteItems[i].id,
            active: 0,
          };
          this.actionUpdateEmployee(_employee);
        }
      }
      this.close();
    },

    close() {
      this.$emit('update:dialogHapusKaryawan', false);
    },
  },
};
</script>
  
  <style>
</style>