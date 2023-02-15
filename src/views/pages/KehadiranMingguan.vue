<template>
  <v-container class="pa-8" fluid>
    <edit-attendance
      :dialogEditAttendance.sync="dialogEditAttendancelocal"
      :dataAttendance="dataAttendance"
      :type_overtime="type_overtime"
    >
    </edit-attendance>
    <cancel-overtime
      :dialogCancelOvertime.sync="dialogCancelOvertime"
      :dataAttendance="dataAttendance"
      :type_overtime="type_overtime"
    >
    </cancel-overtime>

    <tambah-kehadiran
      :dialogTambahKehadiran.sync="dialogTambahKehadiran"
      :departementId="departementId"
    >
    </tambah-kehadiran>
    <hapus-kehadiran
      :dialogHapusKehadiran.sync="dialogHapusKehadiran"
      :deleteItems="selected_items"
      :departementId="departementId"
    >
    </hapus-kehadiran>

    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-calendar-check</v-icon>
                <div>Data Absensi</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-row>
            <v-col md="8">
              <v-file-input
                accept=".xlsx"
                label="File input"
                outlined
                v-model="selectXlsx"
                show-size
              ></v-file-input>
            </v-col>

            <v-col cols="4" md="4">
              <v-btn
                @click="importAttendance"
                color="primary elevation-0"
                class="mt-3 mr-2 icon-box"
              >
                Upload
              </v-btn>

              <v-btn
                @click="addAttendance"
                color="primary elevation-0"
                class="mt-3 mr-2 icon-box"
              >
                Tambah
              </v-btn>
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
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Filter tanggal Mulai</div>
              </div>
              <div>
                <v-menu
                  v-model="menuStartDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      color="grey darken-2"
                      label="Tanggal mulai"
                      v-model="startDate"
                      readonly
                      dense
                      class="white elevation-0"
                      hide-details
                      outlined
                      single-line
                      v-on="on"
                      prepend-inner-icon="mdi-calendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="startDate"
                    :max="endDate"
                    @input="menuStartDate = false"
                  ></v-date-picker>
                </v-menu>
              </div>
            </v-col>
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Filter tanggal Selesai</div>
              </div>
              <div>
                <v-menu
                  v-model="menuEndDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      color="grey darken-2"
                      label="Tanggal selesai"
                      readonly
                      v-model="endDate"
                      dense
                      class="white elevation-0"
                      hide-details
                      outlined
                      single-line
                      v-on="on"
                      prepend-inner-icon="mdi-calendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="endDate"
                    :min="startDate"
                    @input="menuEndDate = false"
                  ></v-date-picker>
                </v-menu>
              </div>
            </v-col>
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Pencarian Nama Karyawan</div>
              </div>
              <v-text-field
                single-line
                v-model.trim="keyword"
                class="white elevation-0"
                dense
                hide-details
                outlined
                prepend-inner-icon="mdi-select-search"
                color="grey darken-2"
                @keyup.enter="searchKeyword"
                label="Tekan enter untuk mencari"
              ></v-text-field>
              <!-- <span class="red--text font-md mt-2"
                >Cek kembali kata kunci anda</span
              > -->
            </v-col>
          </v-row>
          <div style="margin-bottom: 30px"></div>
          <div class="py2" v-if="selected_items.length > 0">
            <div class="d-flex flex-row align-center justify-space-between">
              <div>
                <span>Data yang ditandai</span>
                <v-chip color="blue" class="ml-3" dark>
                  <strong>Total: {{ selected_items.length }}</strong>
                </v-chip>
              </div>
              <v-btn
                dark
                color="blue"
                class="mr-2 icon-box"
                @click="deleteAttendance"
              >
                <v-icon>mdi-delete</v-icon>Hapus data terpilih
              </v-btn>
            </div>
          </div>
          <v-divider></v-divider>
          <v-card class="mx-auto" tile>
            <v-card-text>
              <v-data-table
                v-model="selected_items"
                :headers="this.headers"
                :items="getDataAllAttendance"
                class="elevation-1"
                show-select
              >
                <template v-slot:[`item.attendance_date`]="{ item }">
                  {{ convertDate(item.attendance_date) }}
                </template>
                <template v-slot:[`item.time_check_in`]="{ item }">
                  <span
                    v-if="
                      isLate(
                        item.time_check_in,
                        item.work_hours != null
                          ? item.work_hours.split('-')[0]
                          : null,
                        'check_in'
                      )
                    "
                    class="text-color"
                    >{{ convertTime(item.time_check_in) }}</span
                  >
                  <span v-else>{{ convertTime(item.time_check_in) }}</span>
                </template>
                <template v-slot:[`item.time_check_out`]="{ item }">
                  <span
                    v-if="
                      isLate(
                        item.time_check_out,
                        item.work_hours != null
                          ? item.work_hours.split('-')[1]
                          : null,
                        'check_out'
                      ) && item.time_arrive_home == null
                    "
                    class="text-color"
                    >{{ convertTime(item.time_check_out) }}</span
                  >
                  <span v-else>{{ convertTime(item.time_check_out) }}</span>
                </template>
                <template v-slot:[`item.time_start_for_break`]="{ item }">
                  <!-- start_for_break tidak di hitung-->
                  <!-- <span v-if="isLate(item.time_start_for_break, item.break_hours !=null ? item.break_hours.split('-')[0] : null, 'start_break')" 
                  class="text-color">{{ convertTime(item.time_start_for_break) }}</span> -->
                  <!-- <span v-else>{{ convertTime(item.time_start_for_break) }}</span> -->
                  {{ convertTime(item.time_start_for_break) }}
                </template>
                <template v-slot:[`item.time_end_for_break`]="{ item }">
                  <!-- {{ convertTime(item.time_end_for_break) }} -->
                  <span
                    v-if="
                      isLate(
                        item.time_end_for_break,
                        item.break_hours != null
                          ? item.break_hours.split('-')[1]
                          : null,
                        'end_break'
                      )
                    "
                    class="text-color"
                    >{{ convertTime(item.time_end_for_break) }}</span
                  >
                  <span v-else>{{ convertTime(item.time_end_for_break) }}</span>
                </template>
                <template v-slot:[`item.time_arrive_home`]="{ item }">
                  {{ convertTime(item.time_arrive_home) }}
                </template>
                <template v-slot:[`item.time_start_for_left`]="{ item }">
                  {{ convertTime(item.time_start_for_left) }}
                </template>
                <template v-slot:[`item.time_end_for_left`]="{ item }">
                  {{ convertTime(item.time_end_for_left) }}
                </template>
                <template v-slot:[`item.overtime`]="{ item }">
                  <div class="text-center">
                    <v-menu open-on-hover top offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
                          Dropdown
                        </v-btn> -->
                        <v-chip
                          v-if="item.overtime != null"
                          :color="getColor(item.overtime)"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ convertToHour(item.overtime) }} jam
                        </v-chip>
                      </template>

                      <v-list v-if="item.overtime > 0" class="py-0">
                        <v-list-item @click="confirmOvertime(item, 'late')">
                          <v-list-item-content>
                            <v-list-item-title>
                              <v-icon small class="mr-2 green--text"
                                >check</v-icon
                              >
                              <span class="font-md">Terima</span>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item @click="cancelOvertime(item, 'late')">
                          <v-list-item-content>
                            <v-list-item-title>
                              <v-icon small class="mr-2 red--text"
                                >cancel</v-icon
                              >
                              <span class="font-md">Tolak</span>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
                <template v-slot:[`item.early_overtime`]="{ item }">
                  <div class="text-center">
                    <v-menu open-on-hover top offset-y>
                      <template v-slot:activator="{ on, attrs }">
                        <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
                          Dropdown
                        </v-btn> -->
                        <v-chip
                          v-if="item.early_overtime != null"
                          :color="getColor(item.early_overtime)"
                          dark
                          v-bind="attrs"
                          v-on="on"
                        >
                          {{ convertToHour(item.early_overtime) }} jam
                        </v-chip>
                      </template>

                      <v-list v-if="item.early_overtime > 0" class="py-0">
                        <v-list-item @click="confirmOvertime(item, 'early')">
                          <v-list-item-content>
                            <v-list-item-title>
                              <v-icon small class="mr-2 green--text"
                                >check</v-icon
                              >
                              <span class="font-md">Terima</span>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item @click="cancelOvertime(item, 'early')">
                          <v-list-item-content>
                            <v-list-item-title>
                              <v-icon small class="mr-2 red--text"
                                >cancel</v-icon
                              >
                              <span class="font-md">Tolak</span>
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
                <template v-slot:[`item.total_leave`]="{ item }">
                  {{ calculateTotalLeave(item.total_leave) }}
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        color="blue"
        dark
      ></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
    
    <script>
import XLSX from "xlsx";
import { mapActions, mapGetters } from "vuex";
import EditAttendance from "@/components/EditAttendance.vue";
import { formatPrice, formatDate, manipulateDate } from "@/utils/utils";
import TambahKehadiran from "@/views/components/TambahKehadiran.vue";
import HapusKehadiran from "@/views/components/HapusKehadiran.vue";
import CancelOvertime from "@/views/components/CancelOvertime.vue";
export default {
  name: "KehadiranMingguan",

  data() {
    return {
      datalist: [],
      days_label: [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ],
      selectXlsx: null,
      headers: [
        {
          text: "Nik",
          sortable: false,
          value: "employee.id",
        },
        { text: "Nama", value: "employee.name", width: 200 },
        { text: "Tanggal Kehadiran", value: "attendance_date", width: 130 },
        { text: "Masuk", value: "time_check_in" },
        { text: "Mulai Istirahat", value: "time_start_for_break" },
        { text: "Selesai Istirahat", value: "time_end_for_break" },
        { text: "Pulang", value: "time_check_out" },
        { text: "Tiba dirumah", value: "time_arrive_home" },
        { text: "Mulai Ijin", value: "time_start_for_left" },
        { text: "Selesai Ijin", value: "time_end_for_left" },
        { text: "Lembur", value: "overtime" },
        { text: "Lembur Awal", value: "early_overtime" },
        { text: "Total Ijin", value: "total_leave" },
      ],
      departementId: 1,
      dialogEditAttendancelocal: false,
      dialogCancelOvertime: false,
      dialogTambahKehadiran: false,
      dialogHapusKehadiran: false,
      dataAttendance: null,
      // selectedItem: null,
      type_overtime: null,
      multiLine: false,
      snackbar: false,
      notif_text: "",
      selected_items: [],
      menuStartDate: false,
      menuEndDate: false,
      startDate: null,
      endDate: null,
      keyword: null,
      overlay: false,
    };
  },

  components: {
    EditAttendance,
    HapusKehadiran,
    TambahKehadiran,
    CancelOvertime,
  },

  created() {
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, "0");
    // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    // var yyyy = today.getFullYear();

    // today = yyyy + "/" + mm + "/" + dd;
    // today = "18/11/2022"
    // console.log(today);

    this.getAttendanceCustom();
  },

  methods: {
    ...mapActions([
      "saveAttendance",
      "saveBulkAttendance",
      "checkAttendance",
      "actionGetAllAttendence",
      "actionGetAllAttendenceByFilter",
      "getAttendanceCustom",
    ]),
    manipulasiDate(tgl, operator, val) {
      // console.log(tgl + "-" + operator + "-" + val);
      return manipulateDate(tgl, operator, val);
    },
    addAttendance() {
      this.dialogTambahKehadiran = true;
    },
    deleteAttendance() {
      // for (var i = 0; i < this.selected_items.length; i++) {
      //   console.log(this.selected_items[i].employee.name);
      // }
      this.dialogHapusKehadiran = true;
    },

    uploadAttendance() {
      var bulk = [];
      for (var i = 0; i < this.datalist.length; i++) {
        const data = {
          employee: {
            id: this.datalist[i].id,
          },
          name: this.datalist[i].name,
          attendance_date: this.datalist[i].attendance_date,
          week_of_day: this.datalist[i].week_of_day,
          attendance_type: this.datalist[i].attendance_type,
          time_check_in: this.datalist[i].time_check_in,
          time_check_out: this.datalist[i].time_check_out,
          time_start_for_break: this.datalist[i].time_start_for_break,
          time_end_for_break: this.datalist[i].time_end_for_break,
          time_start_for_left: this.datalist[i].time_start_for_left,
          time_end_for_left: this.datalist[i].time_end_for_left,
          time_arrive_home: this.datalist[i].time_arrive_home,
          work_duration: this.datalist[i].work_duration,
          // time_arrive_home: this.datalist[i].time_arrive_home ? this.datalist[i].time_arrive_home : null,
        };
        bulk.push(data);
      }
      // console.log(bulk);
      // this.checkAttendance({ bulk: bulk });
      this.saveBulkAttendance({ bulk: bulk });
    },

    importAttendance(event) {
      // console.log("Upload");
      if (!this.selectXlsx) {
        // console.log("Please upload a xlsx file");
        this.notif_text = "Pilih file excel dahulu";
        this.snackbar = true;
        return;
      }
      // this.file = event.target.files ? event.target.files[0] : null;
      if (this.selectXlsx) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const sheet = wb.Sheets[wsname];
          /* Convert array of arrays */
          // const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

          // this.dataUsers = data;
          // console.log(data);

          var datarow = [];
          for (var row = 2; ; row++) {
            datarow = [];
            // if (sheet["A" + row] == null) {
            //   break;
            // }

            for (var col = 65; col <= 75; col++) {
              var c = String.fromCharCode(col); // get 'A', 'B', 'C' ...
              var key = "" + c + row;
              if (sheet[key] == null) {
                //   console.log(key)
                datarow.push(null); //jika row .. column .. = null
                continue;
              }
              datarow.push(sheet[key]["w"]);
            }

            var _nik = datarow[0] == "" ? null : datarow[0];
            var _name = datarow[1] == "" ? null : datarow[1];
            var _attendance_date = datarow[2] == "" ? null : datarow[2];
            var _time_check_in = datarow[3] == "" ? null : datarow[3];
            var _time_start_for_break = datarow[4] == "" ? null : datarow[4];
            var _time_end_for_break = datarow[5] == "" ? null : datarow[5];
            var _time_check_out = datarow[6] == "" ? null : datarow[6];
            var _time_arrive_home = datarow[7] == "" ? null : datarow[7];
            var _time_start_for_left = datarow[8] == "" ? null : datarow[8];
            var _time_end_for_left = datarow[9] == "" ? null : datarow[9];

            var data = {
              id: _nik,
              name: _name,
              attendance_date: _attendance_date,
              time_check_in: _time_check_in,
              time_start_for_break: _time_start_for_break,
              time_end_for_break: _time_end_for_break,
              time_check_out: _time_check_out,
              time_arrive_home: _time_arrive_home,
              time_start_for_left: _time_start_for_left,
              time_end_for_left: _time_end_for_left,
              attendance_type: _time_arrive_home == null ? 0 : 1,
              week_of_day: -1,
              // work_duration : calculate_work_duration,
            };

            var result = this.checkFormatExcel(data, row);
            if (result == "end_of_excel") {
              // console.log("End Of Excel " + row);
              break;
            }
            if (result != "sukses") {
              this.notif_text = result;
              this.snackbar = true;
              this.datalist = [];
              this.selectXlsx = null;
              return;
            }
          }
        };
        reader.readAsBinaryString(this.selectXlsx);

        reader.onloadend = (e) => {
          // console.log("datalist len = " + this.datalist.length);
          if (this.datalist.length > 0) {
            this.uploadAttendance();
            this.datalist = [];
            this.selectXlsx = null;
          }
        };
      }
    },

    checkFormatExcel(data, index) {
      //check jika 1 baris isi nya kosong
      var getDate = null;
      var _week_of_day = null;
      if (
        data.id == null &&
        data.name == null &&
        data.attendance_date == null &&
        data.time_check_in == null &&
        data.time_start_for_break == null &&
        data.time_end_for_break == null &&
        data.time_check_out == null &&
        data.time_arrive_home == null &&
        data.time_start_for_left == null &&
        data.time_end_for_left == null
      ) {
        return "end_of_excel";
      }
      if (data.id == null) {
        return "Gagal Import, Kolom A pada baris ke " + index + " kosong";
      }

      if (data.name == null) {
        return "Gagal Import, Kolom B pada baris ke " + index + " kosong";
      }

      if (data.attendance_date == null) {
        return "Gagal Import, Kolom C pada baris ke " + index + " kosong";
      } else {
        // console.log(data.attendance_date);
        var date = data.attendance_date.split("/");
        var year = date[2];
        var month = Number.parseInt(date[1]);
        var days = Number.parseInt(date[0]);
        if (year.length == 4) {
          //sementara di check year
          date = month + "-" + days + "-" + year;
          // console.log(date);
          var result = this.formatDateUtils(date);
          if (result == "Invalid date") {
            return (
              "Gagal Import, Format C pada baris ke " + index + " tidak sesuai"
            );
          } else {
            getDate = new Date(date);
            _week_of_day = getDate.getDay() + 1;
            data.week_of_day = _week_of_day;
            var _date = year + "-" + month + "-" + days;
            data.attendance_date = _date;
          }
        } else {
          return (
            "Gagal Import, Format C pada baris ke " + index + " tidak sesuai"
          );
        }
      }

      if (data.time_check_in != null) {
        if (_week_of_day != 7) {
          if (data.time_start_for_break == null) {
            return "Gagal Import, Kolom E pada baris ke " + index + " kosong";
          }

          if (data.time_end_for_break == null) {
            return "Gagal Import, Kolom F pada baris ke " + index + " kosong";
          }
        }

        if (data.time_check_out == null) {
          return "Gagal Import, Kolom G pada baris ke " + index + " kosong";
        }

        if (
          data.time_start_for_left != null &&
          data.time_end_for_left == null
        ) {
          return "Gagal Import, Kolom J pada baris ke " + index + " kosong";
        }

        if (
          data.time_start_for_left == null &&
          data.time_end_for_left != null
        ) {
          return "Gagal Import, Kolom I pada baris ke " + index + " kosong";
        }
      }

      if (data.time_check_in == null) {
        if (
          data.time_start_for_break != null ||
          data.time_end_for_break != null ||
          data.time_check_out
        ) {
          return "Gagal Import, Kolom D pada baris ke " + index + " kosong";
        }
      }

      // console.log(data);
      this.datalist.push(data);
      return "sukses";
    },

    formatDateUtils(val) {
      return formatDate(val, "short-date");
    },

    convertDate(date) {
      return formatDate(date.substring(0, 10), "short-date");
    },

    convertTime(time) {
      if (time == null) {
        return;
      }
      return time.substring(0, 5);
    },

    calculateTotalLeave(data) {
      if (data == null) {
        return data;
      }

      var tempData = data.split(",");
      var sum = 0;
      for (var i = 0; i < tempData.length; i++) {
        sum += parseInt(tempData[i]);
      }
      return sum;
    },

    //time1 = checkin, time2 = schedule
    isLate(time1, time2, type) {
      if (time1 == null || time2 == null) {
        return false;
      }
      // console.log("time1: "+time1);
      // console.log("time2: "+time2);
      time1 = time1.split(":");
      time2 = time2.split(":");

      var calculateTime1 = parseInt(time1[0] * 60) + parseInt(time1[1]);
      var calculateTime2 = parseInt(time2[0] * 60) + parseInt(time2[1]);
      // console.log(calculateTime2 +" == "+calculateTime1)
      if (type == "check_in" || type == "end_break") {
        if (calculateTime2 >= calculateTime1) {
          return false;
        }
      } else if (type == "check_out" || type == "start_break") {
        if (calculateTime2 <= calculateTime1) {
          return false;
        }
      }

      return true;
    },

    splitTime(time) {
      return time;
    },

    getColor(total_leave) {
      if (total_leave > 0) return "#EB212E";
      else return "#77DD77";
    },

    convertToHour(total_leave) {
      return total_leave / 60;
    },

    getTimeColor(time) {
      return "#00ff00";
    },

    confirmOvertime(item, type) {
      this.type_overtime = type;
      this.dialogEditAttendancelocal = true;
      this.dataAttendance = item;
    },

    cancelOvertime(item, type) {
      // console.log(item);
      this.dataAttendance = item;
      this.type_overtime = type;
      this.dialogCancelOvertime = true;
    },

    getUserData(value) {
      // console.log(value);
      // getCheckAttendance();
    },

    handleClick(value) {
      var isSelected = 0;
      this.getCheckAttendance.map((item, index) => {
        item.selected = item === value;

        this.$set(this.getCheckAttendance, index, item);
        if (item.selected == true) {
          isSelected = index;
        }
        // console.log(item);
      });
      // console.log("isSelected " + isSelected);
      // value.total_leave = 100;
      this.dialogEditAttendancelocal = true;
      this.dataAttendance = value.total_leave;
    },

    getResAddAttendance() {
      const status = this.getBulkAttendance;
      // console.log("getResAddAttendance : " + status.data);
      // if (status.actions == 201) {
      //   if (status.status == "Created") {
      //     title = "Sukses Update data";
      //     text = "Data User berhasil diupdate";
      //     icon = "OK";
      //   } else {
      //     title = "Gagal simpan data";
      //     text = "Data personal tidak berhasil ditambahkan";
      //     icon = "error";
      //   }
      // } else if (status.actions == 200) {
      //   if (status.status == "OK") {
      //     title = "Sukses update data";
      //     text = "Data personal berhasil diupdate";
      //     icon = "OK";
      //   } else {
      //     title = "Gagal update data";
      //     text = "Data personal tidak berhasil diupdate";
      //     icon = "error";
      //   }
      // }
    },

    getStatusLoading() {
      const status = this.getLoadingAttendance;
      // console.log(status);
      if (status) {
        this.overlay = true;
      } else {
        this.overlay = false;
      }
    },

    updateStatusAttendance() {
      const status = this.getStatusAttendance;
      console.log("f");
      if (status.actions == 200) {
        if (status.status == "OK") {
          this.getDataAllAttendanceByFilter();
        }
      } else if (status.actions == 201) {
        if (status.status == "duplicate") {
          this.notif_text = "Ada duplikasi data";
          this.snackbar = true;
        }
      }
    },

    getDataAllAttendanceByFilter() {
      const param = new URLSearchParams();
      if (this.startDate != null) {
        if (this.endDate == null) {
          return;
        }
      }

      if (this.keyword != null) {
        if (this.keyword.length > 0) {
          param.append("filter", "employee.name||$cont||" + this.keyword);
        }
      }
      if (this.startDate != null && this.endDate != null) {
        var newdate = this.manipulasiDate(this.startDate, "minus", 1);
        param.append(
          "filter",
          "attendance_date||$between||" + newdate + "," + this.endDate
        );
      }
      if (this.keyword != null) {
        if (this.keyword.length > 0) {
          param.append("join", "employee");
        }
      }
      this.actionGetAllAttendenceByFilter(param);
    },

    searchKeyword() {
      // console.log(this.keyword);
      if (
        this.keyword.length == 0 &&
        this.startDate == null &&
        this.endDate == null
      ) {
        this.getAttendanceCustom();
      } else {
        this.getDataAllAttendanceByFilter();
      }
    },
  },

  computed: {
    ...mapGetters([
      "getStatusAttendance",
      "getBulkAttendance",
      "getDataAllAttendance",
      "getLoadingAttendance",
    ]),
    // getCheckAttendance() {
    //   return this.getStatusAttendance.data;
    // },
  },

  watch: {
    getBulkAttendance: {
      handler() {
        this.getResAddAttendance();
      },
    },
    getDataAllAttendance: {
      handler() {
        this.selected_items = [];
      },
    },
    startDate: {
      handler() {
        // console.log(this.startDate + " - " + this.endDate);
        this.getDataAllAttendanceByFilter();
        // if (this.startDate != null && this.endDate != null) {
        //   console.log("masuk1");
        // }
      },
    },
    endDate: {
      handler() {
        // console.log(this.startDate + " - " + this.endDate);
        this.getDataAllAttendanceByFilter();
        // if (this.startDate != null && this.endDate != null) {
        //   console.log("masuk2");
        // }
      },
    },
    getLoadingAttendance: {
      handler() {
        this.getStatusLoading();
      },
    },
    getStatusAttendance: {
      handler() {
        this.updateStatusAttendance();
      },
    },
  },
};
</script>
    
    <style>
.text-color {
  color: red;
}
</style>