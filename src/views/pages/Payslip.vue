<template>
  <v-container class="pa-7" fluid>
    <dialog-generate-payslip
      :dialogGeneratePayslip.sync="dialogGeneratePayslip"
      :departementId="departementId"
      :dataPayslip="dataPayslip"
    >
    </dialog-generate-payslip>
    <v-card class="mb-3">
      <v-card-text>
        <!-- <div class="d-flex flex-row align-start justify-space-between mt-5">
            <img src="../../../src/assets/logo-payslip.svg" style="width: 10%;" />
          </div>-->
        <div class="d-flex flex-row align-center justify-space-between mb-10">
          <div class="flex-grow-1"></div>
          <v-col cols="8">
            <div class="text-center mt-5 mb-2">
              <div class="title black--text">Pilih kategori payslip</div>
              <div>
                Silahkan pilih departemen, tanggal mulai dan tanggal selesai
                untuk membuat payslip karyawan
              </div>
            </div>
          </v-col>
          <div class="flex-grow-1"></div>
        </div>

        <div class="d-flex flex-row align-center justify-space-between">
          <v-row align="start">
            <v-col cols="2"></v-col>
            <v-col cols="3">
              <div>Data departemen</div>
              <strong class="title black--text">{{
                choosenDepartment != null ? choosenDepartment.name : "-"
              }}</strong>
            </v-col>
            <v-col cols="3"> </v-col>
            <v-col cols="3"></v-col>
            <v-col cols="1"></v-col>
          </v-row>
        </div>
        <v-row>
          <v-col cols="2"></v-col>
          <v-divider class="my-5"></v-divider>
          <v-col cols="2"></v-col>
        </v-row>
        <div class="d-flex flex-row align-center justify-space-between">
          <v-row align="start">
            <v-col cols="2"></v-col>
            <v-col cols="3">
              <div>Hari Kerja / Hari Libur</div>
              <strong class="title black--text">{{
                getWorkDays_and_Holidays()
              }}</strong>
            </v-col>
            <v-col cols="3">
              <div>Tanggal Mulai</div>
              <strong class="title black--text">{{
                start_date != null ? convertDate(start_date) : "-"
              }}</strong>
            </v-col>
            <v-col cols="3">
              <div>Tanggal Selesai</div>
              <strong class="title black--text">{{
                end_date != null ? convertDate(end_date) : "-"
              }}</strong>
            </v-col>
            <v-col cols="1"></v-col>
          </v-row>
        </div>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <div class="text-center">
          <v-row class="text-center">
            <v-col cols="12" sm="10" style="margin: auto">
              <div class="d-flex flex-row align-start">
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="primary"
                      dark
                      v-on="on"
                      large
                      class="elevation-0 mr-3"
                    >
                      <span>Pilih Departemen</span>
                      <v-icon>mdi-arrow-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in getDataAllDepartement"
                      :key="index"
                      @click="selectDepartment(item)"
                    >
                      <v-list-item-title>{{ item.name }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
                <div v-if="choosenDepartment != null">
                  <div v-if="choosenDepartment.id == 1">
                    <v-menu
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          color="primary"
                          dark
                          v-on="on"
                          large
                          class="elevation-0 mr-3"
                        >
                          <span>Pilih Tanggal</span>
                          <v-icon small class="ml-2">mdi-calendar</v-icon>
                        </v-btn>
                      </template>
                      <v-date-picker
                        v-model="picker"
                        @input="getNewDate()"
                        :allowed-dates="allowedDatesProduksi"
                      >
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <div v-else-if="choosenDepartment.id == 2">
                    <v-menu
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          color="primary"
                          dark
                          v-on="on"
                          large
                          class="elevation-0 mr-3"
                        >
                          <span>Pilih Bulan</span>
                          <v-icon small class="ml-2">mdi-calendar</v-icon>
                        </v-btn>
                      </template>
                      <v-date-picker
                        v-model="select_month"
                        type="month"
                        @input="getNewMonth()"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div v-if="choosenDepartment.id == 3">
                    <v-menu
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-btn
                          color="primary"
                          dark
                          v-on="on"
                          large
                          class="elevation-0 mr-3"
                        >
                          <span>Pilih Tanggal</span>
                          <v-icon small class="ml-2">mdi-calendar</v-icon>
                        </v-btn>
                      </template>
                      <v-date-picker
                        v-model="picker"
                        @input="getNewDate()"
                        :allowed-dates="allowedDatesCs"
                      >
                      </v-date-picker>
                    </v-menu>
                  </div>
                </div>
                <v-menu
                  v-if="start_date != null && end_date != null"
                  ref="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="green"
                      dark
                      v-on="on"
                      large
                      class="elevation-0 mr-3"
                    >
                      <span>Pilih Hari Libur</span>
                      <v-icon small class="ml-2">mdi-calendar</v-icon>
                    </v-btn>
                  </template>
                  <v-date-picker
                    v-model="holidays"
                    multiple
                    color="green"
                    :min="start_date"
                    :max="end_date"
                  ></v-date-picker>
                </v-menu>
                <div class="flex-grow-1"></div>
                <v-btn
                  large
                  class="elevation-0"
                  dark
                  color="blue"
                  @click="payslip"
                >
                  <span>Lanjutkan</span>
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
              </div>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DialogGeneratePayslip from "@/views/components/DialogGeneratePayslip.vue";

export default {
  name: "Payslip",
  components: {
    DialogGeneratePayslip,
  },
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substring(0, 10),
      isNewDateSelected: true,
      select_month: null,
      select_date: null,
      holidays: [],
      menu: false,
      start_date: null,
      end_date: null,
      choosenDepartment: null,
      total_days: 0,
      multiLine: false,
      snackbar: false,
      notif_text: "",
      dialogGeneratePayslip: false,
      departementId: null,
      dataPayslip: null,
    };
  },

  created() {
    this.actionGetAllDepartment();
  },

  methods: {
    ...mapActions([
      "savePayslip",
      "savePayslipCs",
      "actionGetAllDepartment",
    ]),

    //enable hari Jumat saja
    allowedDatesProduksi: (val) => [5].includes(new Date(val).getDay()),
    allowedDatesCs: (val) => [1].includes(new Date(val).getDay()),

    selectDepartment(item) {
      console.log("select department " + this.picker);
      this.select_date = null;
      this.select_month = null;
      this.start_date = null;
      this.end_date = null;
      this.holidays = [];
      this.total_days = 0;
      this.choosenDepartment = this.getDataAllDepartement.find((el) => {
        return el.id === item.id;
      });
    },

    payslip() {
      //generate payslip
      if (
        this.choosenDepartment == null ||
        this.start_date == null ||
        this.end_date == null
      ) {
        this.notif_text =
          "Anda harus memilih departemen, tanggal mulai dan tanggal selesai!";
        this.snackbar = true;
        return;
      }
      const data = {
        departemen: this.choosenDepartment.name,
        periode_start: this.start_date,
        periode_end: this.end_date,
        day_off: this.holidays,
      };

      this.departementId = this.choosenDepartment.id;
      this.dataPayslip = data;
      this.dialogGeneratePayslip = true;
      // if (this.choosenDepartment.id == 1) {
      //   this.savePayslip(data);
      // } else if (this.choosenDepartment.id == 2) {
      //   // this.savePayslip(data)
      // } else if (this.choosenDepartment.id == 3) {
      //   this.savePayslipCs(data);
      // }
    },

    getNewDate() {
      //hitung tanggal mulai & tanggal selesai untuk 1 minggu
      console.log("getnewdate");
      if (!this.isNewDateSelected) {
        this.isNewDateSelected = true;
        return;
      }
      this.total_days = 7;
      this.holidays = [];
      this.select_date = this.picker;
      this.start_date = new Date(new Date(this.select_date).getTime())
        .toISOString()
        .substring(0, 10);
      this.end_date = this.getDate_OneWeek();
    },

    getNewMonth() {
      //hitung tanggal mulai & tanggal selesai untuk 1 bulan
      console.log("getNewMonth");
      this.isNewDateSelected = false;
      this.holidays = [];
      var selectedMonth = this.select_month.split("-");
      // 1 bulan ada berapa hari
      this.total_days = this.daysInMonth(selectedMonth[1], selectedMonth[0]);

      // 1 hari = 86400000 milidetik
      // menghitung tanggal 1 bulan x dan tahun x
      this.start_date = new Date(
        new Date(selectedMonth[0], selectedMonth[1]).getTime() -
          (this.total_days - 1) * 86400000
      )
        .toISOString()
        .substring(0, 10);

      this.end_date = new Date(selectedMonth[0], selectedMonth[1])
        .toISOString()
        .substring(0, 10);
    },

    daysInMonth(month, year) {
      //mendapatkan jumlah tanggal dalam 1 bulan
      return new Date(year, month, 0).getDate();
    },

    getDate_OneWeek() {
      //mendapatkan jumlah tanggal dalam 1 minggu
      if (this.select_date == null) {
        return "";
      }
      return new Date(new Date(this.select_date).getTime() + 518400000)
        .toISOString()
        .substring(0, 10);
    },

    isLoadingFinish() {
      const status = this.geStatusLoading;
      console.log(status);
      if (status.loading == false) {
        if (this.choosenDepartment.id == 1) {
          this.$router.push("/viewPayslip").catch(() => {});
        } else if (this.choosenDepartment.id == 2) {
          // this.$router.push("/viewPayslip").catch(() => {});
        } else if (this.choosenDepartment.id == 3) {
          this.$router.push("/viewPayslipCs").catch(() => {});
        }
      }
    },

    getWorkDays_and_Holidays() {
      //menghitung jumlah hari dan jumlah libur
      return (
        this.total_days -
        this.holidays.length +
        " hari / " +
        this.holidays.length +
        " hari"
      );
    },

    convertDate(date) {
      const month = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      date = date.split("-");
      return date[2] + " " + month[parseInt(date[1]) - 1] + " " + date[0];
    },
  },
  watch: {
    geStatusLoading: {
      handler() {
        this.isLoadingFinish();
      },
    },
  },
  computed: {
    ...mapGetters([
      "getDataAllPayslip",
      "getStatusPayslip",
      "geStatusLoading",
      "getDataAllDepartement",
    ]),

    // picker :{
    //   get(){
    //     return this.select_date;
    //   },
    //   set(newDate){
    //     this.select_date = newDate;
    //   },
    // }
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
