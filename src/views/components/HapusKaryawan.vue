<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogHapusKaryawan" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Hapus Karyawan</span>
        </v-card-title>

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
        <v-card-actions>
          <v-btn color="red darken-1" class="white--text" @click.native="close"
            >Batal</v-btn
          >
          <v-btn color="blue darken-1" class="white--text" @click="deleteEmployee"
            >Hapus</v-btn
          >
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