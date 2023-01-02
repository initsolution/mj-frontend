<template>
  <v-app>
    <ViewPayslip :dialogViewPayslip.sync="dialogViewPayslip" />
    <v-row justify="center">
      <v-date-picker v-model="picker" @input="getNewDate()"> </v-date-picker>
      <v-col cols="12" sm="6">
        <v-date-picker
          v-model="dates"
          multiple
          :min="start_date"
          :max="end_date"
        ></v-date-picker>
      </v-col>
      <v-col cols="12" sm="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-combobox
              v-model="dates"
              multiple
              chips
              small-chips
              label="Multiple picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-combobox>
          </template>
          <v-date-picker v-model="dates" multiple no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dates)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row justify="center">
      <div class="black--text">
        Start :
        <strong>{{ select_date == null ? "" : select_date }}</strong>
      </div>
      <div class="black--text">
        <strong>-</strong>
      </div>
      <div class="black--text">
        END :
        <strong>{{ getDate_OneWeek() }}</strong>
      </div>
    </v-row>
    <v-row justify="center">
      <v-col cols="4">
        <v-btn @click="payslip" class="mt-3"> PlaySlip </v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>
    
<script>
import { mapActions, mapGetters } from "vuex";
import ViewPayslip from "./ViewPayslip.vue";
export default {
  components : {
    ViewPayslip
  },
  data() {
    return {
      dialogViewPayslip : false,
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      select_date: null,
      dates: [],
      menu: false,
      start_date: null,
      end_date: null,
    };
  },
  methods: {
    ...mapActions([
      "savePayslip",
      "actionGetPayslip",
    ]),
    payslip() {
      // console.log(this.dates);
      // console.log(this.start_date);
      // console.log(this.end_date);
      const data = {
        departemen : "PRODUKSI",
        periode_start : this.start_date,
        periode_end : this.end_date,
        day_off : this.dates,
      };
      console.log(data);
      this.savePayslip(data);
    },

    getNewDate() {
      this.dates = [];
      this.select_date = this.picker;
      this.start_date = new Date(new Date(this.select_date).getTime())
        .toISOString()
        .substr(0, 10);
      this.end_date = this.getDate_OneWeek();
    },

    getDate_OneWeek() {
      if (this.select_date == null) {
        return "";
      }
      return new Date(new Date(this.select_date).getTime() + 518400000)
        .toISOString()
        .substr(0, 10);
    },
    isLoadingFinish(){
      const status = this.geStatusLoading
      console.log(status)
      if(status.loading == false){
        this.dialogViewPayslip = true
      }
    }
  },
  watch : {
    geStatusLoading :{
      handler(){
        this.isLoadingFinish()
      }
    }
  },
  computed: {
    ...mapGetters([
      "getDataAllPayslip",
      "getStatusPayslip",
      "geStatusLoading"
    ]),
    // getCheckAttendance() {
    //   return this.getStatusAttendance.data;
    // },
  },
  //   watch: {
  //     select_date: {
  //       handler() {

  //         console.log(this.start_date);
  //         console.log(this.end_date);
  //       },
  //     },
  //   }
  // data: () => ({
  //   date: '2018-03-02',
  // }),

  // methods: {
  //   allowedDates: val => parseInt(val.split('-')[2], 10) % 2 === 0,
  // },

  // computed: {
  //     date: {
  //       get: function () {
  //         return this.hasil;
  //       },
  //       // setter
  //       set: function (newValue) {
  //         // your setter here
  //         console.log("new value : " + newValue.value);
  //         this.hasil = newValue.value;
  //       },
  //     },
  //   },
};
</script>
    
    <style>
</style>