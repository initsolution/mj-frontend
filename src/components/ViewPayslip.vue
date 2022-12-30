<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogViewPayslip" persistent max-width="1200px">
      <v-card>
        <v-card-title></v-card-title>
        <v-card-text>
          <v-data-table
            v-model="selected"
            show-select
            :headers="headers"
            :items="getAllData"
          >
            <template v-slot:[`item.gaji_pokok`]="{ item }">
              {{ formatPrice(Math.round(item.gaji_pokok)) }}
            </template>
            <template v-slot:[`item.bonus_lama_kerja`]="{ item }">
              {{ formatPrice(Math.round(item.bonus_lama_kerja)) }}
            </template>
            <template v-slot:[`item.upah_1_hari`]="{ item }">
              {{ formatPrice(Math.round(item.upah_1_hari)) }}
            </template>
            <template v-slot:[`item.total_tunjangan_kehadiran`]="{ item }">
              {{ formatPrice(Math.round(item.total_tunjangan_kehadiran)) }}
            </template>
            <template v-slot:[`item.upah_n_hari`]="{ item }">
              {{ formatPrice(Math.round(item.upah_n_hari)) }}
            </template>
            <template v-slot:[`item.extra_full`]="{ item }">
              {{ formatPrice(Math.round(item.extra_full)) }}
            </template>
            <template v-slot:[`item.lembur`]="{ item }">
              {{ formatPrice(Math.round(item.lembur)) }}
            </template>
            <template v-slot:[`item.upah_minggu`]="{ item }">
              {{ formatPrice(Math.round(item.upah_minggu)) }}
            </template>
            <template v-slot:[`item.premi_hari_besar`]="{ item }">
              {{ formatPrice(Math.round(item.premi_hari_besar)) }}
            </template>
            <template v-slot:[`item.total_pendapatan`]="{ item }">
              {{ formatPrice(Math.round(item.total_pendapatan)) }}
            </template>
            <template v-slot:[`item.potongan_terlambat_ijin`]="{ item }">
              {{ formatPrice(Math.round(item.potongan_terlambat_ijin)) }}
            </template>
            <template v-slot:[`item.potongan_bpjs_tk`]="{ item }">
              {{ formatPrice(Math.round(item.potongan_bpjs_tk)) }}
            </template>
            <template v-slot:[`item.potongan_bpjs_ks`]="{ item }">
              {{ formatPrice(Math.round(item.potongan_bpjs_ks)) }}
            </template>
            <template v-slot:[`item.potongan_spsi`]="{ item }">
              {{ formatPrice(Math.round(item.potongan_spsi)) }}
            </template>
            <template v-slot:[`item.potongan_bon`]="{ item }">
              {{ formatPrice(Math.round(item.potongan_bon)) }}
            </template>
            <template v-slot:[`item.potongan_lain`]="{ item }">
              {{ formatPrice(Math.round(item.potongan_lain)) }}
            </template>
            <template v-slot:[`item.total_potongan`]="{ item }">
              {{ formatPrice(Math.round(item.total_potongan)) }}
            </template>
            <template v-slot:[`item.pendapatan_gaji`]="{ item }">
              {{ formatPrice(Math.round(item.pendapatan_gaji)) }}
            </template>
            <template v-slot:[`item.sisa_bon`]="{ item }">
              {{ formatPrice(Math.round(item.sisa_bon)) }}
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click.native="close">Close</v-btn>
        <v-btn color="green darken-1" @click="print">Print</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { formatPrice } from "@/utils/utils";
import { jsPDF } from "jspdf";
export default {
  props: {
    dialogViewPayslip: {
      default: false,
    },
  },
  data() {
    return {
      selected : [],
      headers: [
        { text: "Employee_ID", value: "employee.id" },
        { text: "Nama", value: "employee.name" },
        { text: "Periode awal", value: "periode_start" },
        { text: "Periode akhir", value: "periode_end" },
        { text: "Total hari kerja", value: "total_hari_kerja" },
        { text: "Total hari masuk", value: "total_hari_masuk" },
        { text: "Total hari off", value: "total_hari_off" },
        { text: "Total hari libur", value: "total_hari_libur" },
        { text: "Lama kerja", value: "lama_kerja", align: "right" },
        { text: "Gaji Pokok", value: "gaji_pokok", align: "right" },
        { text: "Bonus lama kerja", value: "bonus_lama_kerja", align: "right" },
        { text: "Upah 1 hari", value: "upah_1_hari", align: "right" },
        {
          text: "Total tunjangan kehadiran",
          value: "total_tunjangan_kehadiran",
          align: "right",
        },
        { text: "Upah (n) hari", value: "upah_n_hari", align: "right" },
        { text: "Extra full", value: "extra_full", align: "right" },
        { text: "Lembur", value: "lembur", align: "right" },
        { text: "Upah hari minggu", value: "upah_minggu", align: "right" },
        { text: "Premi hari besar", value: "premi_hari_besar", align: "right" },
        { text: "Total pendapatan", value: "total_pendapatan", align: "right" },
        {
          text: "Potongan terlambat dan ijin",
          value: "potongan_terlambat_ijin",
          align: "right",
        },
        {
          text: "Potongan BPJS tenaga kerja",
          value: "potongan_bpjs_tk",
          align: "right",
        },
        {
          text: "Potongan BPJS kesehatan",
          value: "potongan_bpjs_ks",
          align: "right",
        },
        { text: "Potongan SPSI", value: "potongan_spsi", align: "right" },
        { text: "Potongan bon", value: "potongan_bon", align: "right" },
        { text: "Potongan lain", value: "potongan_lain", align: "right" },
        { text: "Total potongan", value: "total_potongan", align: "right" },
        { text: "Pendapatan gaji", value: "pendapatan_gaji", align: "right" },
        { text: "Sisa bon", value: "sisa_bon", align: "right" },
      ],
    };
  },
  methods: {
    formatPrice(value) {
      return formatPrice(value);
    },
    close() {
      this.$emit("update:dialogViewPayslip", false);
    },
    print(){
      console.log(this.selected)
      const doc = new jsPDF({orientation: "landscape"});
      for(var i=0; i<this.selected.length; i++) {
        let pageWidth = doc.internal.pageSize.getWidth();
        doc.text("SLIP GAJI KARYAWAN",pageWidth / 2, 20, 'center');
        doc.text("Nama : "+ this.selected[i].employee.name, 40, 40);
        if(i < this.selected.length-1){
          doc.addPage();
        }
      }
      doc.save("a4.pdf");
    }
  },
  computed: {
    ...mapGetters(["getStatusPayslip"]),
    getAllData() {
      return this.getStatusPayslip.data;
    },
  },
};
</script>

<style>
</style>