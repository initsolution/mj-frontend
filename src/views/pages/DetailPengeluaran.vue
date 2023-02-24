<template>
  <v-container class="pa-8" fluid>
    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-account-box</v-icon>
                <div>Detail Pengeluaran</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-row>
            <v-col md="12">
              <v-data-table :headers="headers" :items="getDataDetailPengeluaran">
                <template v-slot:[`item.pendapatan_gaji`]="{ item }">
                  {{ formatPrice(item.pendapatan_gaji) }}
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
import {  mapGetters } from "vuex";
import { formatPrice } from "@/utils/utils";
export default {
  data() {
    return {
      headers: [
        { text: "NIK", value: "id" },
        { text: "Name", value: "name" },
        { text: "Departemen", value: "department" },
        { text: "Area", value: "area" },
        { text: "Posisi", value: "position" },
        { text: "Nominal", value: "pendapatan_gaji" },
      ],
    };
  },
  methods : {
    formatPrice(value) {
      return formatPrice(value);
    },
  },
  computed: {
    ...mapGetters(["getDataDetailPengeluaran"]),
    // getTotalPengeluaran() {},
    getPengeluaranProduksi() {
      return this.getDataPengeluaranProduksi;
    },
  },
};
</script>

<style>
</style>