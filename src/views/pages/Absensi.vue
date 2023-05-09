<template>
  <v-container class="pa-8" fluid>
    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-account-box</v-icon>
                <div>Data Absensi</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-card>
            <v-card-title></v-card-title>
            <v-card-text>
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
                    v-model="keyword"
                    class="white elevation-0"
                    dense
                    hide-details
                    outlined
                    prepend-inner-icon="mdi-select-search"
                    color="grey darken-2"
                    @keyup.enter="filterEmployee"
                    label="Tekan enter untuk mencari"
                  />
                </v-col>
              </v-row>
              <div style="margin: 20px"></div>
              <v-data-table :headers="headers" :items.sync="getAllData">
                <template v-slot:[`item.attendance_date`]="{ item }">
                  {{ formatDateUtils(item.attendance_date) }}
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="js">
import { mapActions, mapGetters } from "vuex";
import {  formatDate, manipulateDate } from "@/utils/utils";
export default {
  name: "AbsensiMingguan",
  data(){
    return {
      menuStartDate: false,
      menuEndDate: false,
      startDate: null,
      endDate: null,
      headers: [
          { text: "Employee_ID", value: "employee.id" },
          { text: "Nama", value: "employee.name" },
          { text: "Tanggal", value: "attendance_date" },
          
        ],
        keyword: null,  
    }
  },
  created() {
    this.getAttendanceAbsen();
  },
  watch :{
    startDate : {
      handler(){
        this.getDataAttendanceAbsenByFilter()
      }
    },
    
    endDate : {
      handler(){
        this.getDataAttendanceAbsenByFilter()
      }
    }
  },
  methods: {
    ...mapActions(['actionGetAllAttendenceByFilter']),
    manipulasiDate(tgl, operator, val) {
      // console.log(tgl + "-" + operator + "-" + val);
      return manipulateDate(tgl, operator, val);
    },
    formatDateUtils(val){
        return  formatDate(val, 'short-date')
      },
    getAttendanceAbsen(){
      const params = new URLSearchParams();
      params.append("filter", "time_check_in||isnull")
      params.append("filter", "time_check_out||isnull")
      params.append("sort", "employee.name,ASC")
      this.actionGetAllAttendenceByFilter(params)
    },
    
    filterEmployee(){
      const params = new URLSearchParams();
      params.append("filter", "time_check_in||isnull")
      params.append("filter", "time_check_out||isnull")
      params.append("sort", "employee.name,ASC")
      if (this.keyword != null && this.keyword.length > 0) {
        params.append('filter', 'employee.name||$cont||' + this.keyword);
      }
      this.actionGetAllAttendenceByFilter(params)
    },
    
    getDataAttendanceAbsenByFilter() {
      const params = new URLSearchParams();
      if (this.startDate != null) {
        if (this.endDate == null) {
          return;
        }
      }
      if (this.startDate != null && this.endDate != null) {
        var newdate = this.manipulasiDate(this.startDate, "minus", 1);
        params.append(
          "filter",
          "attendance_date||$between||" + newdate + "," + this.endDate
        );
        params.append("filter", "time_check_in||isnull")
        params.append("filter", "time_check_out||isnull")
        params.append("sort", "employee.name,ASC")
      }
     
      this.actionGetAllAttendenceByFilter(params);
    },
  },
  computed: {
      ...mapGetters(["getDataAllAttendance"]),
      getAllData() {
        return this.getDataAllAttendance
      },
    },
}
</script>