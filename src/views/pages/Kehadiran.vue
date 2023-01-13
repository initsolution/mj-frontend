<template>
  <v-container class="pa-8" fluid>
    <edit-attendance
      :dialogEditAttendance.sync="dialogEditAttendancelocal"
      :dataAttendance="dataAttendance"
      :type_overtime="type_overtime"
    >
    </edit-attendance>

    <tambah-kehadiran :dialogTambahKehadiran.sync="dialogTambahKehadiran">
    </tambah-kehadiran>
    <hapus-kehadiran
      :dialogHapusKehadiran.sync="dialogHapusKehadiran"
      :deleteItems="selected_items"
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
            <v-col cols="4" md="4">
              <v-file-input
                accept=".xlsx"
                label="File input"
                outlined
                v-model="selectXlsx"
                show-size
              ></v-file-input>
            </v-col>

            <v-col cols="4" md="4">
              <v-btn @click="importAttendance" class="mt-3"> Upload </v-btn>
              <span class="white--text mx-2"></span>
              <v-btn @click="addAttendance" class="mt-3"> Tambah </v-btn>
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
          <v-divider></v-divider>
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
                      )
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
                        <v-chip v-if="item.overtime != null">
                          <v-chip
                            :color="getColor(item.overtime)"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            {{ item.overtime }}
                          </v-chip>
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
                        <v-list-item @click="confirmOvertime(item, 'late')">
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
                        <v-chip v-if="item.early_overtime != null">
                          <v-chip
                            :color="getColor(item.early_overtime)"
                            dark
                            v-bind="attrs"
                            v-on="on"
                          >
                            {{ item.early_overtime }}
                          </v-chip>
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
                        <v-list-item @click="confirmOvertime(item, 'early')">
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
  </v-container>
</template>
  
  <script>
import XLSX from "xlsx";
import { mapActions, mapGetters } from "vuex";
import EditAttendance from "@/components/EditAttendance.vue";
import { formatPrice, formatDate } from "@/utils/utils";
import TambahKehadiran from "@/views/components/TambahKehadiran.vue";
import HapusKehadiran from "@/views/components/HapusKehadiran.vue";
export default {
  name: "Kehadiran",

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
          text: "Employee_ID",
          align: "right",
          sortable: false,
          value: "employee.id",
        },
        { text: "Nama", value: "employee.name", width: 200 },
        { text: "Date", value: "attendance_date", width: 130 },
        { text: "CheckIn", value: "time_check_in" },
        { text: "CheckOut", value: "time_check_out" },
        { text: "Start_break", value: "time_start_for_break" },
        { text: "End_break", value: "time_end_for_break" },
        { text: "Arrive_Home", value: "time_arrive_home" },
        { text: "Start_Left", value: "time_start_for_left" },
        { text: "End_Left", value: "time_end_for_left" },
        { text: "OT", value: "overtime" },
        { text: "Early_OT", value: "early_overtime" },
        { text: "Total Leave", value: "total_leave" },
      ],
      dialogEditAttendancelocal: false,
      dialogTambahKehadiran: false,
      dialogHapusKehadiran: false,
      dataAttendance: null,
      // selectedItem: null,
      type_overtime: null,
      multiLine: false,
      snackbar: false,
      notif_text: "",
      selected_items: [],
    };
  },

  components: {
    EditAttendance,
    HapusKehadiran,
    TambahKehadiran,
  },

  created() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + "/" + mm + "/" + dd;
    // today = "18/11/2022"
    // console.log(today);
    this.actionGetAllAttendence(today);
  },

  methods: {
    ...mapActions([
      "saveAttendance",
      "saveBulkAttendance",
      "checkAttendance",
      "actionGetAllAttendence",
    ]),

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
      console.log(bulk);
      // this.checkAttendance({ bulk: bulk });
      this.saveBulkAttendance({ bulk: bulk });
    },

    importAttendance(event) {
      console.log("Upload");
      if (!this.selectXlsx) {
        console.log("Please upload a xlsx file");
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

            // var calculate_work_duration = this.diff(datarow[3],datarow[4],datarow[5],datarow[6],datarow[8],datarow[9]);
            // console.log(calculate_work_duration);
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
              console.log("End Of Excel " + row);
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
          console.log("datalist len = " + this.datalist.length);
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
        if (year.length == 4) { //sementara di check year 
          date = month + "-" + days + "-" + year;
          console.log(date);
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
      return date.substring(0, 10);
    },

    convertTime(time) {
      if (time == null) {
        return;
      }
      return time.substring(0, 5);
    },

    calculateTotalLeave(data){
      if(data == null) {
        return data
      }

      var tempData = data.split(",");
      var sum = 0
      for(var i=0; i<tempData.length; i++) {
        sum = parseInt(sum + tempData[i]);
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

    diff(
      time_check_in,
      time_check_out,
      time_start_for_break,
      time_end_for_break,
      time_start_for_left,
      time_end_for_left
    ) {
      time_check_in = time_check_in == null ? "0:0" : time_check_in;
      time_check_out = time_check_out == null ? "0:0" : time_check_out;
      time_start_for_break =
        time_start_for_break == null ? "0:0" : time_start_for_break;
      time_end_for_break =
        time_end_for_break == null ? "0:0" : time_end_for_break;
      time_start_for_left =
        time_start_for_left == null ? "0:0" : time_start_for_left;
      time_end_for_left = time_end_for_left == null ? "0:0" : time_end_for_left;
      time_check_in = time_check_in.split(":");
      time_check_out = time_check_out.split(":");
      time_start_for_break = time_start_for_break.split(":");
      time_end_for_break = time_end_for_break.split(":");
      time_start_for_left = time_start_for_left.split(":");
      time_end_for_left = time_end_for_left.split(":");

      var date_check_in = new Date(
        0,
        0,
        0,
        time_check_in[0],
        time_check_in[1],
        0
      );
      var date_check_out = new Date(
        0,
        0,
        0,
        time_check_out[0],
        time_check_out[1],
        0
      );
      var date_start_for_break = new Date(
        0,
        0,
        0,
        time_start_for_break[0],
        time_start_for_break[1],
        0
      );
      var date_end_for_break = new Date(
        0,
        0,
        0,
        time_end_for_break[0],
        time_end_for_break[1],
        0
      );
      var date_start_for_left = new Date(
        0,
        0,
        0,
        time_start_for_left[0],
        time_start_for_left[1],
        0
      );
      var date_end_for_left = new Date(
        0,
        0,
        0,
        time_end_for_left[0],
        time_end_for_left[1],
        0
      );

      //calculate work duration
      var diff =
        date_check_out.getTime() -
        date_check_in.getTime() -
        (date_end_for_break.getTime() - date_start_for_break.getTime()) -
        (date_end_for_left.getTime() - date_start_for_left.getTime());
      console.log(diff / 1000 / 60);
      var minutes = diff / 1000 / 60;
      return minutes;

      // var hours = Math.floor(diff / 1000 / 60 / 60);
      // diff -= hours * 1000 * 60 * 60;
      // var minutes = Math.floor(diff / 1000 / 60);

      // // If using time pickers with 24 hours format, add the below line get exact hours
      // if (hours < 0) hours = hours + 24;

      // return (
      //   (hours <= 9 ? "0" : "") +
      //   hours +
      //   ":" +
      //   (minutes <= 9 ? "0" : "") +
      //   minutes
      // );
    },

    getColor(total_leave) {
      if (total_leave > 0) return "#ff0000";
      else return "#00ff00";
    },

    getTimeColor(time) {
      return "#00ff00";
    },

    confirmOvertime(item, type) {
      // console.log("overtime : "+ this.getCheckAttendance[index].overtime);
      // this.selectedItem = item;
      // if (type == "early") {
      //   // console.log("EARLY OVERTIME");
      // } else if (type == "late") {
      //   // console.log("OVERTIME");
      //   this.dialogEditAttendancelocal = true;
      //   this.dataAttendance = item;
      // }
      this.type_overtime = type;
      this.dialogEditAttendancelocal = true;
      this.dataAttendance = item;
    },

    getUserData(value) {
      console.log(value);
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
        console.log(item);
      });
      console.log("isSelected " + isSelected);
      // value.total_leave = 100;
      this.dialogEditAttendancelocal = true;
      this.dataAttendance = value.total_leave;
    },

    getResAddAttendance() {
      const status = this.getBulkAttendance;
      console.log("getResAddAttendance : " + status.data);
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
  },

  computed: {
    ...mapGetters([
      "getStatusAttendance",
      "getBulkAttendance",
      "getDataAllAttendance",
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
  },
};
</script>
  
  <style>
.text-color {
  color: red;
}
</style>