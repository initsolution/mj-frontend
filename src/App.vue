<template>
  <!-- <div id="app">
    <input type="file" @change="onChange" />
    <button @click="uploadAttendance">Upload</button>
    <h1>Users</h1>
    <table>
      <tr>
        <td><b>Employee_ID</b></td>
        <td><b>Name</b></td>
        <td><b>Date</b></td>
        <td><b>Week_OF_Day</b></td>
        <td><b>Type</b></td>
        <td><b>Check_IN</b></td>
        <td><b>Check_OUT</b></td>
        <td><b>Start_Break</b></td>
        <td><b>End_Break</b></td>
        <td><b>Arrive Home</b></td>
        <td><b>Start_Left</b></td>
        <td><b>End_Left</b></td>
        <td><b>Work_Duration</b></td>
        <td><b>Overtime</b></td>
        <td><b>Early_Overtime</b></td>
        <td><b>Total_Leave</b></td>
      </tr>
     
      <tr v-for="user in getCheckAttendance" v-bind:key="user.id">
        <td>{{ user.employee.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.attendance_date }}</td>
        <td>{{ days_label[user.week_of_day - 1] }}</td>
        <td>{{ user.attendance_type }}</td>
        <td>{{ user.time_check_in }}</td>
        <td>{{ user.time_check_out }}</td>
        <td>{{ user.time_start_for_break }}</td>
        <td>{{ user.time_end_for_break }}</td>
        <td>{{ user.time_arrive_home }}</td>
        <td>{{ user.time_start_for_left }}</td>
        <td>{{ user.time_end_for_left }}</td>
        <td>{{ user.work_duration }}</td>
        <td>{{ user.overtime }}</td>
        <td>{{ user.early_overtime }}</td>
        <td>{{ user.total_leave }}</td>
      </tr>
    </table>
    <button @click="save">Save</button>
  </div> -->
  <v-app>
    <v-main class="container align-center px-1">
      <EditAttendance
        :dialogEditAttendance.sync="dialogEditAttendancelocal"
        :dataAttendance="dataAttendance"
        @userInfo="getUserData($event)"
      />
      <v-card class="mx-auto" tile>
        <v-card-title>
          <v-col cols="4" md="10">Attendance</v-col>
          <v-col cols="4" md="4">
            <v-file-input
              accept=".xlsx"
              label="File input"
              outlined
              v-model="selectXlsx"
              show-size
            ></v-file-input>
          </v-col>

          <v-col cols="4" md="20">
            <v-btn @click="onChange" class="mt-3"> Upload </v-btn>
            <v-btn @click="save" class="mt-3"> Save </v-btn>
          </v-col>
          <!-- <v-col cols="4" md="2">
          <v-btn @click="updateUser">Update</v-btn>
        </v-col>
        <v-col cols="4" md="2">
          <v-btn @click="deleteUserFunc">Delete User</v-btn>
        </v-col> -->
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="this.headers"
            :items="this.getCheckAttendance"
            class="elevation-1"
          >
            <!-- <template v-slot:[`item.total_leave`]="{ item }">
              <v-chip :color="getColor(item.total_leave)" dark>
                {{ item.total_leave }}
              </v-chip>
            </template> -->
            <template v-slot:[`item.overtime`]="{ item }">
              <div class="text-center">
                <v-menu open-on-hover top offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Dropdown
                    </v-btn> -->
                    <v-chip v-if="item.overtime > 0">
                      <v-chip
                        :color="getColor(item.overtime)"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ item.overtime }}
                      </v-chip>
                    </v-chip>
                    <v-chip v-else>
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
                          <v-icon small class="mr-2 green--text">check</v-icon>
                          <span class="font-md">Terima</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="confirmOvertime(item, 'late')">
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon small class="mr-2 red--text">cancel</v-icon>
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
                    <v-chip v-if="item.early_overtime > 0">
                      <v-chip
                        :color="getColor(item.early_overtime)"
                        dark
                        v-bind="attrs"
                        v-on="on"
                      >
                        {{ item.early_overtime }}
                      </v-chip>
                    </v-chip>
                    <v-chip v-else>
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
                          <v-icon small class="mr-2 green--text">check</v-icon>
                          <span class="font-md">Terima</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="confirmOvertime(item, 'early')">
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon small class="mr-2 red--text">cancel</v-icon>
                          <span class="font-md">Tolak</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import XLSX from "xlsx";
import { mapActions, mapGetters } from "vuex";
import EditAttendance from "./components/EditAttendance.vue";
export default {
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
        { text: "Nama", value: "name" },
        { text: "Date", value: "attendance_date" },
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
      dataAttendance: null,
      selectedItem: null,
    };
  },
  name: "App",
  components: {
    EditAttendance,
  },
  methods: {
    ...mapActions(["saveAttendance", "saveBulkAttendance", "checkAttendance"]),
    save() {
      // console.log()
      // console.log(this.getCheckAttendance);
      // this.saveBulkAttendance({'bulk' : this.getCheckAttendance});
    },

    uploadAttendance() {
      var bulk = [];
      for (var i = 0; i < this.datalist.length; i++) {
        const data = {
          idx: i,
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
      this.checkAttendance({ bulk: bulk });
    },

    onChange(event) {
      console.log("Upload");
      if (!this.selectXlsx) {
        console.log("Please upload a xlsx file");
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
            if (sheet["A" + row] == null) {
              break;
            }

            for (var col = 65; col <= 75; col++) {
              var c = String.fromCharCode(col); // get 'A', 'B', 'C' ...
              var key = "" + c + row;
              if (sheet[key] == null) {
                datarow.push(null); //jika row .. column .. = null
                continue;
              }
              datarow.push(sheet[key]["w"]);
            }

            var date = datarow[2].split("/");
            var year = 2000 + Number.parseInt(date[2]);
            var month = Number.parseInt(date[0]);
            var days = Number.parseInt(date[1]);
            //date
            datarow[2] = year + "-" + month + "-" + days;

            //get Week Of Day
            var getDate = new Date(datarow[2]);
            var week_of_day = getDate.getDay() + 1;

            // var calculate_work_duration = this.diff(datarow[3],datarow[4],datarow[5],datarow[6],datarow[8],datarow[9]);
            // console.log(calculate_work_duration);

            this.datalist.push({
              id: datarow[0],
              name: datarow[1],
              attendance_date: datarow[2],
              attendance_type: datarow[7] == null ? 0 : 1,
              week_of_day: week_of_day,
              time_check_in: datarow[3],
              time_check_out: datarow[4],
              time_start_for_break: datarow[5],
              time_end_for_break: datarow[6],
              time_arrive_home: datarow[7],
              time_start_for_left: datarow[8],
              time_end_for_left: datarow[9],
              // work_duration : calculate_work_duration,
            });
          }
        };
        reader.readAsBinaryString(this.selectXlsx);

        reader.onloadend = (e) => {
          console.log("datalist len = " + this.datalist.length);
          this.uploadAttendance();
        };
      }
    },

    convertToDate(date) {
      return new Date(date);
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

    confirmOvertime(item, type) {
      // console.log("overtime : "+ this.getCheckAttendance[index].overtime);
      this.selectedItem = item;
      if (type == "early") {
        // console.log("EARLY OVERTIME");
      } else if (type == "late") {
        // console.log("OVERTIME");
        this.dialogEditAttendancelocal = true;
        this.dataAttendance = item.overtime;
      }
    },

    getUserData(value) {
      console.log("getuserdata : "+value)
      this.selectedItem.overtime = value;
      this.$set(this.getCheckAttendance, this.selectedItem.idx, this.selectedItem);
      
      console.log(this.getCheckAttendance);
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
  },

  computed: {
    ...mapGetters(["getStatusAttendance"]),
    getCheckAttendance() {
      return this.getStatusAttendance.data;
    },
  },
};
</script>

<style>
</style>
