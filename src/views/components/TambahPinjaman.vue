<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogLoan" max-width="600">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <div>Buat Pinjaman</div>
          <v-icon @click="dismisDialog">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-autocomplete
            v-model.trim="loan.employee"
            :items="getEmployee"
            color="white"
            item-text="name"
            label="Nama"
            return-object
          ></v-autocomplete>
          <v-currency-field
            color="grey darken-2"
            :decimal-length="0"
            prefix="Rp"
            filled
            v-bind="currency_config"
            v-model.trim="loan.nominal"
            class="currency-input pa-0 ma-0 font-md"
            label="Nominal Pinjaman"
          />

          <v-text-field
            color="grey darken-2"
            v-model.trim="loan.description"
            label="Deskripsi"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn class="elevation-0 grey darken-2" dark @click="dismisDialog"
            >Batal</v-btn
          >
          <v-btn class="elevation-0 primary" @click.stop="saveLoan"
            >Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { formatPrice } from '@/utils/utils';
export default {
  props: {
    dialogLoan: {
      default: false,
    },
  },
  data() {
    return {
      loan: {},
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
    ...mapActions(['inputLoan']),

    dismisDialog() {
      this.$emit('update:dialogLoan', false);
    },
    saveLoan() {
      const data = {
        type: 'pinjam',
        employee: { id: this.loan.employee.id },
        nominal: this.loan.nominal,
        note: this.loan.description,
      };
      this.inputLoan(data);
    },
    watchStatusLoan() {
      const status = this.getStatusLoan;
      if (status.status == 201) {
        if (status.statusText == 'Created') {
          this.dismisDialog();
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
    ...mapGetters(['getDataEmployees', 'getStatusLoan']),
    getEmployee() {
      return this.getDataEmployees.sort((a, b) => {
        let fa = a.name.toLowerCase();
        let fb = b.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    },
  },
};
</script>

<style>
</style>