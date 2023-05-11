<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogCancelOvertime" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span class="headline">Konfirmasi Penolakan Lembur</span>
          <!-- {{ (dataAttendance_ = dataAttendance) }} -->
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span
                  >Apakah ingin menolak/membatalkan lembur selama
                  {{ overtime_value }} menit?</span
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
            color="grey darken-1"
            @click.native="close"
            dark
            >Tidak</v-btn
          >
          <v-btn
            min-width="100"
            class="elevation-0"
            color="primary"
            @click="update"
            >Ya</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
    
    <script>
import { mapActions } from 'vuex';
export default {
  name: 'CancelOvertime',
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
    ...mapActions(['updateOvertimeProduksi', 'updateOvertimeBulanan']),
    update() {
      var data = null;
      if (this.type_overtime == 'early') {
        data = {
          id: this.dataAttendance.id,
          early_overtime: 0,
        };
        this.updateOvertimeProduksi(data);
      } else if (this.type_overtime == 'late') {
        data = {
          id: this.dataAttendance.id,
          overtime: 0,
        };
        this.updateOvertimeProduksi(data);
      } else if (this.type_overtime == 'bulanan') {
        data = {
          id: this.dataAttendance.id,
          lembur: 0,
        };
        this.updateOvertimeBulanan(data);
      }
      this.close();
    },

    getOvertime() {
      if (this.type_overtime == 'early') {
        this.overtime_value = this.dataAttendance.early_overtime;
      } else if (this.type_overtime == 'late') {
        this.overtime_value = this.dataAttendance.overtime;
      } else if (this.type_overtime == 'bulanan') {
        this.overtime_value = this.dataAttendance.lembur;
      }
      // console.log(this.overtime_value);
    },

    close() {
      this.total_leave = '';
      this.$emit('update:dialogCancelOvertime', false);
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