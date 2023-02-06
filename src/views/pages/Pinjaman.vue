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
          <v-text-field
            color="grey darken-2"
            prefix="Rp"
            v-model.trim="loan.nominal"
            label="Nominal Pinjaman"
            required
          ></v-text-field>
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
                  <v-btn @click="openBuatPinjaman">Tambah Pinjaman</v-btn>
                </div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
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
    };
  },
  created() {
    this.getDataLoan();
  },
  methods: {
    ...mapActions(["actionGetAllEmployee", "inputLoan"]),
    getDataLoan() {
      const params = new URLSearchParams();
      params.append("join", "loan");
      params.append("join", "department");
      params.append("sort", "loan.created_at,DESC");
      this.actionGetAllEmployee(params);
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
    ...mapGetters(["getDataEmployees", "getStatusLoan"]),
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
  },
};
</script>