<template>
  <v-container class="pa-8" fluid>
    <DetailPinjaman
      :dialogDetailPinjaman.sync="dialogDetailPinjaman"
      :getAllDataLoan="getAllDataLoan"
      :employee="employee"
    />
    <v-dialog v-model="dialogLoan" max-width="600">
      <v-card>
        <v-card-title>
          <div>Buat Pinjaman</div>
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
    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-calendar-check</v-icon>
                <div>Data Pinjaman</div>
                <div>
                  <v-btn color="primary elevation-0" @click="openBuatPinjaman"
                    >Tambah Pinjaman</v-btn
                  >
                </div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-card class="mb-5">
            <v-card-text>
              <div class="black--text mb-3 body-1">
                Rincian Pinjaman Per Departemen
              </div>
              <v-divider></v-divider>
              <v-row align="start" class="mt-2">
                <v-col
                  class="py-0"
                  cols="3"
                  v-for="(item, index) in totalLoanByDepartment"
                  :key="index"
                >
                  <div>{{ item.department_name }}</div>
                  <div class="black--text mt-3" style="font-size: 24px">
                    {{ item.total_loan ? formatPrice(item.total_loan) : "-" }}
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-data-table :headers="headers" :items="getAllData">
            <template v-slot:[`item.sisa_pinjaman`]="{ item }">
              {{ checkLoan(item.loan) }}
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { formatPrice } from "@/utils/utils";
import DetailPinjaman from "@/views/components/DetailPinjaman.vue";
export default {
  name: "Pinjaman",
  components: {
    DetailPinjaman,
  },
  data() {
    return {
      dialogDetailPinjaman: false,
      dialogLoan: false,
      loan: {},
      getAllDataLoan: [],
      headers: [
        { text: "Employee_ID", value: "id" },
        { text: "Nama", value: "name" },
        { text: "Departemen", value: "department.name" },
        { text: "Sisa Pinjaman", value: "sisa_pinjaman" },
        { text: "Pilihan", value: "action" },
      ],
      employee: {},
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
  created() {
    this.getDataLoan();
  },
  methods: {
    ...mapActions([
      "actionGetAllEmployeeByFilter",
      "inputLoan",
      "getTotalLoanPerDepartment",
    ]),
    getDataLoan() {
      const params = new URLSearchParams();
      params.append("join", "loan");
      params.append("join", "department");
      params.append("sort", "loan.created_at,DESC");
      // this.actionGetAllEmployee(params);
      this.actionGetAllEmployeeByFilter(params);
      this.getTotalLoanPerDepartment();
    },
    formatPrice(value) {
      return formatPrice(value);
    },
    checkLoan(loan) {
      if (loan.length != 0) {
        return "Rp. " + this.formatPrice(loan[0].total_loan_current);
      } else {
        return "-";
      }
    },
    openDetail(emp) {
      this.dialogDetailPinjaman = true;
      this.getAllDataLoan = emp.loan;
      this.employee = emp;
    },
    openBuatPinjaman() {
      this.dialogLoan = true;
    },
    dismisDialog() {
      this.dialogLoan = false;
    },
    saveLoan() {
      const data = {
        type: "pinjam",
        employee: { id: this.loan.employee.id },
        nominal: this.loan.nominal,
        note: this.loan.description,
      };
      this.inputLoan(data);
    },

    watchStatusLoan() {
      const status = this.getStatusLoan;
      if (status.status == 201) {
        if (status.statusText == "Created") {
          this.getDataLoan();
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
    ...mapGetters(["getDataEmployees", "getStatusLoan", "getDataLoanByDept"]),
    getAllData() {
      return this.getDataEmployees.filter(function (val) {
        return val.loan.length > 0;
      });
    },
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
    totalLoanByDepartment() {
      return this.getDataLoanByDept;
    },
  },
};
</script>