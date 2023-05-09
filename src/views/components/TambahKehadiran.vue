<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogTambahKehadiran" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span class="headline">Tambah Kehadiran</span
          ><v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model.trim="employee_data"
                  :items="getEmployee"
                  color="white"
                  item-text="name"
                  label="Nama"
                  return-object
                ></v-autocomplete>
                <v-menu
                  v-model="date_menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      color="grey darken-2"
                      v-model="selectDate"
                      label="Tanggal Masuk"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="selectDate"
                    :max="currentDate"
                    locale="id"
                    @input="date_menu = false"
                  ></v-date-picker>
                </v-menu>

                <v-combobox
                  :items="label_kehadiran"
                  v-model="select"
                  label="Kehadiran"
                  outlined
                  dense
                >
                </v-combobox>
                <v-text-field
                  label="Jam Tiba di Kantor"
                  v-mask="mask"
                  v-model.trim="arrive_home"
                />
                <v-row>
                  <v-col
                    ><v-text-field
                      label="Jam Masuk"
                      required
                      v-mask="mask"
                      v-model.trim="check_in"
                  /></v-col>
                  <v-col
                    ><v-text-field
                      label="Mulai Istirahat"
                      v-model.trim="start_for_break"
                      required
                      v-mask="mask"
                  /></v-col>
                </v-row>
                <v-row>
                  <v-col
                    ><v-text-field
                      label="Selesai Istirahat"
                      required
                      v-model.trim="end_for_break"
                      v-mask="mask"
                  /></v-col>
                  <v-col
                    ><v-text-field
                      label="Jam Pulang"
                      required
                      v-mask="mask"
                      v-model.trim="check_out"
                  /></v-col>
                </v-row>
                <v-row>
                  <v-col
                    ><v-text-field
                      label="Mulai Ijin"
                      v-mask="mask"
                      v-model.trim="start_for_left"
                  /></v-col>
                  <v-col
                    ><v-text-field
                      label="Selesai Ijin"
                      v-mask="mask"
                      v-model.trim="end_for_left"
                  /></v-col>
                </v-row>
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
            dark
            @click.native="close"
            >Tutup</v-btn
          >
          <v-btn
            min-width="100"
            class="elevation-0"
            color="primary"
            @click="addOneAttendance"
            >Tambah</v-btn
          >
          <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
            top
            color="orange"
          >
            {{ notif_text }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
    
<script>
import { mapActions, mapGetters } from 'vuex';
import { mask } from 'vue-the-mask';
export default {
  name: 'TambahKehadiran',
  props: {
    dialogTambahKehadiran: {
      default: false,
    },
    departementId: null,
  },

  directives: {
    mask,
  },
  // created() {
  //   console.log("create")
  //   this.actionGetAllEmployeeByFilter();
  // },

  data() {
    return {
      employee_data: null,
      date_menu: false,
      selectDate: null,
      currentDate: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      mask: '##:##',
      label_kehadiran: [
        {
          text: 'Masuk',
          value: '1',
        },
        {
          text: 'Tidak Masuk',
          value: '0',
        },
      ],
      select_kehadiran: null,
      check_in: '',
      check_out: '',
      start_for_break: '',
      end_for_break: '',
      start_for_left: '',
      end_for_left: '',
      arrive_home: '',
      multiLine: false,
      snackbar: false,
      notif_text: '',
    };
  },
  methods: {
    ...mapActions([
      'saveBulkAttendance',
      'saveBulkAttendanceCs',
      'actionGetAllEmployeeByFilter',
    ]),
    addOneAttendance() {
      var bulk = [];
      var getDate = null;
      var week_of_day = -1;
      var data = null;

      if (this.employee_data == null) {
        this.notif_text = 'Pilih karyawan terlebih dahulu';
        this.snackbar = true;
        return;
      }

      if (this.selectDate == null) {
        this.notif_text = 'Pilih tanggal terlebih dahulu';
        this.snackbar = true;
        return;
      } else {
        getDate = new Date(this.selectDate);
        week_of_day = getDate.getDay() + 1;
      }

      if (this.select_kehadiran == null) {
        this.notif_text = 'Pilih Kehadiran terlebih dahulu';
        this.snackbar = true;
        return;
      }

      if (this.select_kehadiran.value == 0) {
        data = {
          employee: {
            id: this.employee_data.id,
          },
          name: this.employee_data.name,
          attendance_date: this.selectDate,
          week_of_day: week_of_day,
          attendance_type: attendance_type,
          time_check_in: null,
          time_check_out: null,
          time_start_for_break: null,
          time_end_for_break: null,
          time_start_for_left: null,
          time_end_for_left: null,
          time_arrive_home: null,
        };
      } else if (this.select_kehadiran.value == 1) {
        if (
          this.check_in.length != 5 ||
          this.check_out.length != 5 ||
          this.start_for_break.length != 5 ||
          this.end_for_break.length != 5
        ) {
          this.notif_text =
            'Format waktu tidak sesuai, harap cek kembali. contoh: 17:00';
          this.snackbar = true;
          return;
        }

        if (this.arrive_home != null) {
          if (this.arrive_home.length != 0 && this.arrive_home.length != 5) {
            this.notif_text =
              'Format waktu tidak sesuai, harap cek kembali. contoh: 17:00';
            this.snackbar = true;
            return;
          }
        }

        if (this.start_for_left != null) {
          if (
            this.start_for_left.length != 0 &&
            this.start_for_left.length != 5
          ) {
            this.notif_text =
              'Format waktu tidak sesuai, harap cek kembali. contoh: 17:00';
            this.snackbar = true;
            return;
          } else if (this.end_for_left != null) {
            if (
              this.start_for_left.length == 5 &&
              this.end_for_left.length != 5
            ) {
              //jika start_for_left ada data, maka end_for_left harus diisi
              this.notif_text =
                'Format waktu tidak sesuai, harap cek kembali. contoh: 17:00';
              this.snackbar = true;
              return;
            }
          }
        }

        this.arrive_home = this.arrive_home == '' ? null : this.arrive_home;
        this.start_for_left =
          this.start_for_left == '' ? null : this.start_for_left;
        this.end_for_left = this.end_for_left == '' ? null : this.end_for_left;

        var attendance_type = this.arrive_home != null ? 1 : 0;

        var result_check_in = this.checkTime(
          this.check_in.split(':')[0],
          this.check_in.split(':')[1],
        );
        var result_check_out = this.checkTime(
          this.check_out.split(':')[0],
          this.check_out.split(':')[1],
        );
        var result_start_for_break = this.checkTime(
          this.start_for_break.split(':')[0],
          this.start_for_break.split(':')[1],
        );
        var result_end_for_break = this.checkTime(
          this.end_for_break.split(':')[0],
          this.end_for_break.split(':')[1],
        );

        if (
          result_check_in != '' ||
          result_check_out != '' ||
          result_start_for_break != '' ||
          result_end_for_break != ''
        ) {
          this.notif_text =
            'Format waktu tidak sesuai, harap cek kembali. contoh: 17:00';
          this.snackbar = true;
          return;
        }

        if (this.start_for_left != null || this.end_for_left != null) {
          var result_start_for_left = this.checkTime(
            this.start_for_left.split(':')[0],
            this.start_for_left.split(':')[1],
          );
          var result_end_for_left = this.checkTime(
            this.end_for_left.split(':')[0],
            this.end_for_left.split(':')[1],
          );
          if (result_start_for_left != '' || result_end_for_left != '') {
            this.notif_text =
              'Format waktu tidak sesuai, harap cek kembali. contoh: 17:00';
            this.snackbar = true;
            return;
          }
        }

        if (this.arrive_home != null) {
          var result_arrive_home = this.checkTime(
            this.arrive_home.split(':')[0],
            this.arrive_home.split(':')[1],
          );
          if (result_arrive_home != '') {
            this.notif_text =
              'Format waktu tidak sesuai, harap cek kembali. contoh: 17:00';
            this.snackbar = true;
            return;
          }
        }

        data = {
          employee: {
            id: this.employee_data.id,
          },
          name: this.employee_data.name,
          attendance_date: this.selectDate,
          week_of_day: week_of_day,
          attendance_type: attendance_type,
          time_check_in: this.check_in,
          time_check_out: this.check_out,
          time_start_for_break: this.start_for_break,
          time_end_for_break: this.end_for_break,
          time_start_for_left: this.start_for_left,
          time_end_for_left: this.end_for_left,
          time_arrive_home: this.arrive_home,
        };
      }

      // console.log(data);
      bulk.push(data);
      if (this.departementId == 1) {
        this.saveBulkAttendance({ bulk: bulk });
      } else if (this.departementId == 2) {
      } else if (this.departementId == 3) {
        this.saveBulkAttendanceCs({ bulk: bulk });
      }
      this.close();
    },

    checkTime(hour, minute) {
      if (hour > 23 || minute > 59) {
        return 'Format Jam Salah';
      }
      return '';
    },

    close() {
      this.total_leave = '';
      this.$emit('update:dialogTambahKehadiran', false);
      this.employee_data = null;
      this.selectDate = null;
      this.check_in = '';
      this.check_out = '';
      this.start_for_break = '';
      this.end_for_break = '';
      this.start_for_left = '';
      this.end_for_left = '';
      this.arrive_home = '';
      this.select_kehadiran = null;
    },
  },
  computed: {
    ...mapGetters(['getDataEmployees']),
    getEmployee() {
      return this.getDataEmployees.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
    select: {
      get: function () {
        return this.select_kehadiran;
      },
      // setter
      set: function (newValue) {
        // your setter here
        // console.log("new value : " + newValue);
        this.select_kehadiran = newValue;
      },
    },
  },

  watch: {
    dialogTambahKehadiran: {
      handler() {
        // console.log(this.dialogTambahKehadiran);
        if (this.dialogTambahKehadiran == true) {
          const params = new URLSearchParams();
          params.append('filter', 'department.id||$eq||' + this.departementId);
          params.append('filter', 'active||$eq||1');
          params.append('join', 'department');
          this.actionGetAllEmployeeByFilter(params);
        }
      },
    },
  },
};
</script>