<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogDetailPinjaman" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span>Detail Informasi Pinjaman</span>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="d-flex flex-row align-center justify-space-between">
            <div class="black--text my-3">
              Sisa Pinjaman :
              {{
                getAllDataLoan.length > 0
                  ? formatPrice(getAllDataLoan[0].total_loan_current)
                  : 'Rp0'
              }}
              <v-btn
                v-if="
                  getAllDataLoan.length > 0 &&
                  getAllDataLoan[0].total_loan_current > 0
                "
                class="ml-3 elevation-0 primary"
                dark
                small
                @click="showPay"
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
    <v-dialog v-model="dialogPay" max-width="600">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <div>
            Bayar Pinjaman
            <strong>({{ employee.name }})</strong>
          </div>
          <v-icon @click="dismisDialog">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-currency-field
            color="grey darken-2"
            :decimal-length="0"
            prefix="Rp"
            v-bind="currency_config"
            v-model.trim="loan.nominal"
            label="Nominal Pinjaman"
            required
          ></v-currency-field>
          <v-text-field
            color="grey darken-2"
            v-model.trim="loan.description"
            label="Deskripsi"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="grey lighten-4 px-8 py-4 d-flex flex-row">
          <v-btn
            min-width="100"
            class="elevation-0"
            color="primary"
            @click.stop="saveLoan"
            >Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { formatPrice, formatDate } from '@/utils/utils';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'DetailPinjaman',
  props: {
    dialogDetailPinjaman: {
      default: false,
    },
    getAllDataLoan: [],
    employee: {},
  },
  data() {
    return {
      dialogPay: false,
      loan: {
        description: null,
        nominal: 0,
      },
      headers: [
        { text: 'Keterangan', value: 'note' },
        { text: 'Tanggal Transaksi', value: 'tgl_transaksi' },
        { text: 'Jenis', value: 'jenis' },
        { text: 'Nominal', value: 'nominal' },
      ],
      currency_config: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp',
        precision: 0,
        masked: false,
        allowBlank: false,
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
      },
    };
  },
  methods: {
    ...mapActions(['inputLoan', 'actionGetAllEmployeeByFilter']),
    formatPrice(value) {
      return formatPrice(value);
    },
    formatDateTime(tanggal) {
      return formatDate(tanggal, 'short-dateTime');
    },
    close() {
      this.$emit('update:dialogDetailPinjaman', false);
    },
    showPay() {
      console.log(this.employee);
      this.dialogPay = true;
    },
    dismisDialog() {
      this.dialogPay = false;
    },
    saveLoan() {
      const data = {
        employee: { id: this.employee.id },
        nominal: this.loan.nominal,
        note: this.loan.description,
        type: 'bayar',
      };
      this.inputLoan(data);
    },
    watchStatusLoan() {
      const status = this.getStatusLoan;
      if (status.status == 201) {
        if (status.statusText == 'Created') {
          const params = new URLSearchParams();
          params.append('join', 'loan');
          params.append('join', 'department');
          params.append('sort', 'loan.created_at,DESC');
          this.actionGetAllEmployeeByFilter(params);
          this.dismisDialog();
          this.close();
        }
      }
    },
  },

  watch: {
    getStatusLoan: {
      handler() {
        this.watchStatusLoan();
      },
    },
  },
  computed: {
    ...mapGetters(['getStatusLoan']),
  },
};
</script>

<style>
</style>