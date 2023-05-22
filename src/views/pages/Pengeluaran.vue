<template>
  <v-container class="pa-8" fluid>
    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-account-box</v-icon>
                <div>Data Pengeluaran</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-divider class="my-6"></v-divider>
          <v-row>
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Filter Departemen</div>
                <div class="flex-grow-1"></div>
              </div>
              <div>
                <v-select
                  v-model.trim="filterDepartmentId"
                  :items="listDepartment"
                  return-object
                  item-text="name"
                  item-value="id"
                  label="Departemen"
                ></v-select>
              </div>
            </v-col>
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Pilih Bulan</div>
              </div>
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
                    <v-icon small class="ml-2">mdi-calendar</v-icon>
                  </v-btn>
                </template>
                <v-date-picker
                  v-model="getMonth"
                  type="month"
                  @input="getPengeluaranMonth()"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Departemen {{ nameDepartment }}</div>
                
              </div>
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Rp. {{ formatPrice(pengeluaranDepartment) }}</div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
            <v-data-table
              :headers="headers"
              :items="getPengeluaranDepartemen"
            >
              <template v-slot:[`item.pendapatan_gaji`]="{ item }">
                {{ formatPrice(item.pendapatan_gaji) }}
              </template>
              <template v-slot:[`item.periode_start`]="{ item }">
                {{ formatDateUtils(item.periode_start) }}
              </template>
              <template v-slot:[`item.periode_end`]="{ item }">
                {{ formatDateUtils(item.periode_end) }}
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-btn
                  color="blue"
                  class="elevation-0"
                  dark
                  small
                  @click="openDetail(item)"
                  >Detail</v-btn
                >
              </template>
            </v-data-table>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { formatPrice, formatDate } from "@/utils/utils";
export default {
  data() {
    return {
      getMonth: null,
      startDate: null,
      filterDepartmentId: null,
      listDepartment: [],
      nameDepartment : '',
      pengeluaranDepartment: 0,
      headers: [
        { text: "Periode Awal", value: "periode_start" },
        { text: "Periode Akhir", value: "periode_end" },
        { text: "Total Pengeluaran", value: "pendapatan_gaji" },
        { text: "Detail Pengeluaran", value: "action" },
      ],
    };
  },
  watch: {
    startDate: {
      handler() {
        this.getPengeluaranMonth();
        
      },
    },
    getDataAllDepartement: {
      handler() {
        for (var i = 0; i < this.getDataAllDepartement.length; i++) {
          this.listDepartment.push({
            name: this.getDataAllDepartement[i].name,
            id: this.getDataAllDepartement[i].id,
          });
        }
        
      },
    },
    getStatusDetailPengeluaran :{
      handler(){
        this.getDetailPengeluaran()
      }
    },
    getPengeluaranDepartemen : {
      handler(){
        console.log(this.getdataPengeluaranDepartemen)
        this.nameDepartment = this.getdataPengeluaranDepartemen[0].department_name
        this.pengeluaranDepartment = this.getTotalPengeluaranDepartemen(this.getdataPengeluaranDepartemen)
      }
    }
    
  },
  created() {
    this.actionGetAllDepartment();
  },
  methods: {
    ...mapActions(["actionGetAllDepartment",  'pengeluaranDepartemenBulanan', 'pengeluaranDetailBulanan']),
    formatPrice(value) {
      return formatPrice(value);
    },
    formatDateUtils(val) {
      return formatDate(val, "short-date");
    },
    openDetail(pengeluaran){
      console.log(pengeluaran)
      const periode_awal = formatDate(pengeluaran.periode_start, 'input')
      const periode_akhir = formatDate(pengeluaran.periode_end, 'input')
      const param = {
        departmentId : pengeluaran.department_id,
        periodeAwal : periode_awal,
        periodeAkhir :periode_akhir
      }
      this.pengeluaranDetailBulanan(param)
      // console.log(param)
    },
    getPengeluaranMonth() {
      console.log(this.getMonth);
      if (this.filterDepartmentId != null) {
        
       
        this.pengeluaranDepartemenBulanan({
          bulantahun : this.getMonth,
          departmentId : this.filterDepartmentId.id
        })
      }
    },
    getDetailPengeluaran() {
      const status = this.getStatusDetailPengeluaran
      if(status.status == 200){
        if(status.statusText == 'OK'){
          this.$router.push("/detail_pengeluaran").catch(() => {});
        }
      }
    },
    getTotalPengeluaranDepartemen(item){
      const sum = item.reduce((accumulator, object)=>{
        return accumulator + parseInt( object.pendapatan_gaji)
      }, 0)
      return sum
    }
  },
  computed: {
    ...mapGetters(["getdataPengeluaranDepartemen", "getDataAllDepartement", "getStatusDetailPengeluaran"]),
    // getTotalPengeluaran() {},
    getPengeluaranDepartemen() {
      
      return this.getdataPengeluaranDepartemen;
    },
  },
};
</script>