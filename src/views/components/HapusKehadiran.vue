<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogHapusKehadiran" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Hapus Kehadiran</span>
        </v-card-title>

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
        <v-card-actions>
          <v-btn color="red darken-1" @click.native="close">Close</v-btn>
          <v-btn color="blue darken-1" @click="deleteAttendance">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
  
  <script>
import { mapActions } from "vuex";
export default {
  name: "HapusKehadiran",
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
    ...mapActions(["deleteAttendanceById", "deleteAttendanceByIdBulanan","deleteAttendanceByIdCs"]),
    deleteAttendance() {
      console.log(this.deleteItems.length);
      if (this.deleteItems.length > 0) {
        for (var i = 0; i < this.deleteItems.length; i++) {
          var id = this.deleteItems[i].id;
          if (this.departementId == 1) {
            this.deleteAttendanceById(id);
          } else if(this.departementId == 2) {
            this.deleteAttendanceByIdBulanan(id);
          } else if(this.departementId == 3) {
            this.deleteAttendanceByIdCs(id);
          }
        }
      }
      this.close();
    },

    close() {
      this.$emit("update:dialogHapusKehadiran", false);
    },
  },
};
</script>
  
  <style>
</style>