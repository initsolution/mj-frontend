<template>
  <v-container>
    <DetailPinjaman
      :dialogDetailPinjaman.sync="dialogDetailPinjaman"
      :getAllDataLoan="getAllDataLoan"
    />
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
          @click="openDetail(item.loan)"
          >Detail</v-btn
        >
      </template>
    </v-data-table>
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
      getAllDataLoan: [],
      headers: [
        { text: "Employee_ID", value: "id" },
        { text: "Nama", value: "name" },
        { text: "Departemen", value: "department.name" },
        { text: "Sisa Pinjaman", value: "sisa_pinjaman" },
        { text: "Pilihan", value: "action" },
      ],
    };
  },
  created() {
    const params = new URLSearchParams();
    params.append("join", "loan");
    params.append("join", "department");
    params.append("sort", "loan.created_at,DESC");
    this.getAllEmployee(params);
  },
  methods: {
    ...mapActions(["getAllEmployee"]),
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
    openDetail(loan) {
      this.dialogDetailPinjaman = true;
      this.getAllDataLoan = loan;
    },
  },
  computed: {
    ...mapGetters(["getDataEmployees"]),
    getAllData() {
      return this.getDataEmployees.filter(function (val) {
        return val.loan.length > 0;
      });
    },
  },
};
</script>