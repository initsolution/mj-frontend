<template>
  <v-container class="pa-8" fluid>
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <v-data-table :headers="headers" :items.sync="getAllData">
          <template v-slot:[`item.attendance_date`]="{ item }">
            {{ formatDateUtils(item.attendance_date) }}
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script lang="js">
import { mapActions, mapGetters } from "vuex";
import {  formatDate } from "@/utils/utils";
export default {
  name: "AbsensiMingguan",
  data(){
    return {
      headers: [
          { text: "Employee_ID", value: "employee.id" },
          { text: "Nama", value: "employee.name" },
          { text: "Tanggal", value: "attendance_date" },
          
        ],
        
    }
  },
  created() {
    this.getAttendanceAbsen();
  },
  methods: {
    ...mapActions(['actionGetAllAttendenceByFilter']),
    formatDateUtils(val){
        return  formatDate(val, 'short-date')
      },
    getAttendanceAbsen(){
      const params = new URLSearchParams();
    params.append("filter", "time_check_in||isnull")
    params.append("filter", "time_check_out||isnull")
    params.append("sort", "employee.name,ASC")
    this.actionGetAllAttendenceByFilter(params)
    }  
  },
  computed: {
      ...mapGetters(["getDataAllAttendance"]),
      getAllData() {
        return this.getDataAllAttendance
      },
    },
}
</script>