<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogCancelOvertime" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Info</span>
          <!-- {{ (dataAttendance_ = dataAttendance) }} -->
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span
                  >Apakah ingin membatalkan overtime selama
                  {{ overtime_value }} menit ?</span
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click.native="close">Batal</v-btn>
          <v-btn color="blue darken-1" @click="update">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
    
    <script>
import { mapActions } from "vuex";
export default {
  name: "CancelOvertime",
  props: {
    dialogCancelOvertime: {
      default: false,
    },
    dataAttendance: null,
    type_overtime: null,
  },
  data() {
    return {
      overtime_value: null,
    };
  },
  methods: {
    ...mapActions(["updateOvertimeProduksi"]),
    update() {
      var data = null;
      if (this.type_overtime == "early") {
        data = {
          id: this.dataAttendance.id,
          early_overtime: 0,
        };
      } else if (this.type_overtime == "late") {
        data = {
          id: this.dataAttendance.id,
          overtime: 0,
        };
      }

      this.updateOvertimeProduksi(data);
      this.close();
    },

    getOvertime() {
      if (this.type_overtime == "early") {
        this.overtime_value = this.dataAttendance.early_overtime;
      } else if (this.type_overtime == "late") {
        this.overtime_value = this.dataAttendance.overtime;
      }
      // console.log(this.overtime_value);
    },

    close() {
      this.total_leave = "";
      this.$emit("update:dialogCancelOvertime", false);
    },
  },

  watch: {
    dataAttendance: {
      handler() {
        this.getOvertime();
      },
    },
  },
};
</script>
    
    <style>
</style>