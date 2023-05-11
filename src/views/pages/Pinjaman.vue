<template>
  <v-container class="pa-8" fluid>
    <DetailPinjaman
      :dialogDetailPinjaman.sync="dialogDetailPinjaman"
      :getAllDataLoan="getAllDataLoan"
      :employee="employee"
    />
    <tambah-pinjaman :dialogLoan.sync="dialogLoan"> </tambah-pinjaman>
    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-calendar-check</v-icon>
                <div>Data Pinjaman</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-row align="center" justify="space-between">
            <v-col>
              <div>
                <v-btn color="primary elevation-0" @click="openBuatPinjaman"
                  >Tambah Pinjaman</v-btn
                >
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12"
              ><v-btn
                :outlined="!filter"
                class="elevation-0"
                :color="filter ? 'primary' : 'grey darken-1'"
                @click="showFilter"
              >
                <v-icon>mdi-filter</v-icon>
                <span>Filter</span>
              </v-btn></v-col
            >
          </v-row>
          <v-row v-if="filter">
            <v-col cols="6" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Filter Departemen</div>
                <div class="flex-grow-1"></div>
              </div>
              <div>
                <v-select
                  v-model.trim="filterDepartmentId"
                  :items="listDepartment"
                  v-on:change="getAllAreaByDepartmentId"
                  item-text="name"
                  item-value="id"
                  label="Departemen"
                ></v-select>
              </div>
            </v-col>
            <v-col cols="6" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Pencarian Nama Karyawan</div>
              </div>
              <v-text-field
                single-line
                v-model="keyword"
                class="white elevation-0"
                dense
                hide-details
                outlined
                prepend-inner-icon="mdi-select-search"
                color="grey darken-2"
                @keyup.enter="filterEmployee"
                label="Tekan enter untuk mencari"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col md="12">
              <div>
                <v-card class="mb-5">
                  <v-card-text>
                    <v-row>
                      <v-col>
                        <div class="black--text mb-3 body-1">
                          Rincian Pinjaman Per Departemen
                        </div>
                      </v-col>
                    </v-row>
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
                          {{
                            item.total_loan ? formatPrice(item.total_loan) : '-'
                          }}
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
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import { formatPrice } from '@/utils/utils';
import DetailPinjaman from '@/views/components/DetailPinjaman.vue';
import TambahPinjaman from '@/views/components/TambahPinjaman.vue';

export default {
  name: 'Pinjaman',
  components: {
    DetailPinjaman,
    TambahPinjaman,
  },
  data() {
    return {
      filter: false,
      dialogDetailPinjaman: false,
      dialogLoan: false,
      loan: {},
      getAllDataLoan: [],
      headers: [
        { text: 'Employee_ID', value: 'id' },
        { text: 'Nama', value: 'name' },
        { text: 'Departemen', value: 'department.name' },
        { text: 'Sisa Pinjaman', value: 'sisa_pinjaman' },
        { text: 'Pilihan', value: 'action' },
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
      filterDepartmentId: null,
      listDepartment: [],
      keyword: null,
    };
  },
  created() {
    this.getDataLoan();
    this.actionGetAllDepartment();
  },
  methods: {
    ...mapActions([
      'actionGetAllEmployeeByFilter',
      'inputLoan',
      'getTotalLoanPerDepartment',
      'actionGetAllDepartment',
    ]),
    showFilter() {
      this.filter = !this.filter;
    },

    filterEmployee() {
      const params = new URLSearchParams();
      params.append('join', 'loan');
      params.append('join', 'department');
      params.append('sort', 'loan.created_at,DESC');
      params.append('filter', 'loan.khusus||$eq||0');
      if (this.keyword != null && this.keyword.length > 0) {
        params.append('filter', 'name||$cont||' + this.keyword);
      }
      this.actionGetAllEmployeeByFilter(params);
    },
    getAllAreaByDepartmentId() {
      if (this.filterDepartmentId != null) {
        const params = new URLSearchParams();
        params.append('join', 'loan');
        params.append('join', 'department');
        params.append('sort', 'loan.created_at,DESC');
        params.append('filter', 'loan.khusus||$eq||0');
        if (this.filterDepartmentId != 0)
          params.append(
            'filter',
            'department.id||$eq||' + this.filterDepartmentId,
          );

        this.actionGetAllEmployeeByFilter(params);
      }
    },
    getDataLoan() {
      const params = new URLSearchParams();
      params.append('join', 'loan');
      params.append('join', 'department');
      params.append('sort', 'loan.created_at,DESC');
      params.append('filter', 'loan.khusus||$eq||0');
      // this.actionGetAllEmployee(params);
      this.actionGetAllEmployeeByFilter(params);
      this.getTotalLoanPerDepartment();
    },
    formatPrice(value) {
      return formatPrice(value);
    },
    checkLoan(loan) {
      if (loan.length != 0) {
        return 'Rp. ' + this.formatPrice(loan[0].total_loan_current);
      } else {
        return '-';
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
          this.getDataLoan();
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
    dialogLoan: {
      handler() {
        if (!this.dialogLoan) {
          this.getDataLoan();
        }
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
        this.listDepartment.push({
          name: 'Semua',
          id: 0,
        });
      },
    },
  },
  computed: {
    ...mapGetters([
      'getDataEmployees',
      'getStatusLoan',
      'getDataLoanByDept',
      'getDataAllDepartement',
    ]),
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