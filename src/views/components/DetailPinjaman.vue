<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogDetailPinjaman" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="d-flex flex-row align-center justify-space-between"
        >
          <span>Detail Informasi Pinjaman</span>
          <v-btn
            fab
            x-small
            class="elevation-0 grey darken-2"
            dark
            @click="close"
          >
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-divider></v-divider>
          <div class="d-flex flex-row align-center justify-space-between">
            <div class="black--text my-3">
              Sisa Pinjaman :
              {{
                getAllDataLoan.length > 0
                  ? formatPrice(getAllDataLoan[0].total_loan_current)
                  : "Rp0"
              }}
              <v-btn
                v-if="
                  getAllDataLoan.length > 0 &&
                  getAllDataLoan[0].total_loan_current > 0
                "
                color="green"
                class="ml-3 elevation-0"
                dark
                small
                @click="showPay(1)"
                >Bayar</v-btn
              >
              <v-btn small class="mr-3 elevation-0" v-else disabled
                >Bayar</v-btn
              >
            </div>

            <div>Data teratas merupakan data terbaru</div>
          </div>
          <v-divider></v-divider>
          <v-data-table :headers="headers" :items="getAllDataLoan">
            <template v-slot:[`item.nominal`]="{ item }">
              <span v-if="item.type === 'pinjam'"
                >+ {{ formatPrice(item.nominal) }}</span
              >
              <span v-else-if="item.type === 'bayar'"
                >- {{ formatPrice(item.nominal) }}</span
              >
            </template>
            <template v-slot:[`item.tgl_transaksi`]="{ item }">
              {{ formatDateTime(item.created_at) }}
            </template>
            <template v-slot:[`item.jenis`]="{ item }">
              <v-chip v-if="item.type === 'pinjam'" dark color="red">
                {{ item.type.toUpperCase() }}
              </v-chip>
              <v-chip v-else-if="item.type === 'bayar'" dark color="green">
                {{ item.type.toUpperCase() }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { formatPrice, formatDate } from "@/utils/utils";
export default {
  name: "DetailPinjaman",
  props: {
    dialogDetailPinjaman: {
      default: false,
    },
    getAllDataLoan: [],
  },
  data() {
    return {
      headers: [
        { text: "Keterangan", value: "note" },
        { text: "Tanggal Transaksi", value: "tgl_transaksi" },
        { text: "Jenis", value: "jenis" },
        { text: "Nominal", value: "nominal" },
      ],
    };
  },
  methods: {
    formatPrice(value) {
      return formatPrice(value);
    },
    formatDateTime(tanggal) {
      return formatDate(tanggal, "short-dateTime");
    },
    close() {
      this.$emit("update:dialogDetailPinjaman", false);
    },
    showPay(val){
        console.log(val)
    }
  },
};
</script>

<style>
</style>