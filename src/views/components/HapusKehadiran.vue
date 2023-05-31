<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogHapusKehadiran" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span class="headline">Hapus Kehadiran</span>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span
                  >Apakah anda yakin ingin menghapus data kehadiran yang sudah
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
            @click="deleteAttendance"
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
    dialogHapusKehadiran: {
      default: false,
    },
    deleteItems: [],
    departementId: null,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      'deleteAttendanceById',
      'deleteAttendanceByIdBulanan',
      'deleteAttendanceByIdCs',
    ]),
    deleteAttendance() {
      console.log(this.deleteItems.length);
      if (this.deleteItems.length > 0) {
        for (var i = 0; i < this.deleteItems.length; i++) {
          var id = this.deleteItems[i].id;
          if (this.departementId == 1) {
            this.deleteAttendanceById(id);
          } else if (this.departementId == 2) {
            this.deleteAttendanceByIdBulanan(id);
          } else if (this.departementId == 3) {
            this.deleteAttendanceByIdCs(id);
          }
        }
      }
      this.close();
    },

    close() {
      this.$emit('update:dialogHapusKehadiran', false);
    },
  },
};
</script>
  
  <style>
</style>