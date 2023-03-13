<template>
  <v-container class="pa-8" fluid>
    <form-karyawan
      :dialogForm.sync="dialogForm"
      :dataEmployee.sync="employee"
    ></form-karyawan>
    <hapus-karyawan
      :dialogHapusKaryawan.sync="dialogHapusKaryawan"
      :deleteItems="selected_items"
    >
    </hapus-karyawan>

    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-account-box</v-icon>
                <div>Data Karyawan</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-row>
            <v-col cols="8">
              <v-file-input
                accept=".xlsx"
                label="File input"
                v-model="selectXlsx"
                density="compact"
                show-size
              ></v-file-input>
            </v-col>

            <v-col cols="4">
              <v-btn
                color="primary elevation-0"
                @click="onUpload"
                class="mt-3 mr-2 icon-box"
              >
                <v-icon>mdi-file-upload-outline</v-icon>
              </v-btn>

              <v-btn color="success elevation-0" class="mt-3 mr-2 icon-box">
                <v-icon>mdi-file-download-outline</v-icon>
              </v-btn>

              <v-btn
                @click="addFunction"
                color="error elevation-0"
                class="mt-3 icon-box"
              >
                <v-icon color="white">mdi-plus</v-icon> Tambah
              </v-btn>
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
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Filter Departemen</div>
                <div class="flex-grow-1"></div>
                <v-btn
                  @click="clearFilter"
                  text
                  color="indigo"
                  class="py-0"
                  small
                  style="text-transform: capitalize"
                  >Hapus</v-btn
                >
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
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Filter Bagian</div>
              </div>
              <div>
                <v-select
                  v-model.trim="filterAreaId"
                  :items="listArea"
                  item-text="name"
                  item-value="id"
                  v-on:change="getAllPositionByAreaId"
                  label="Bagian"
                ></v-select>
              </div>
            </v-col>
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Filter Jabatan</div>
              </div>
              <div>
                <v-select
                  v-model.trim="filterPositionId"
                  :items="listPosition"
                  v-on:change="filterEmployee"
                  item-text="name"
                  item-value="id"
                  label="Jabatan"
                ></v-select>
              </div>
            </v-col>
          </v-row>
          <v-row v-if="filter">
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Filter Shift</div>
              </div>
              <div>
                <v-select
                  v-model.trim="filterShiftId"
                  :items="listShift"
                  v-on:change="filterEmployee"
                  item-text="name"
                  item-value="id"
                  label="Shift"
                ></v-select>
              </div>
            </v-col>
            <v-col cols="4" class="py-0">
              <div class="d-flex flex-row align-center mb-1">
                <div class="font-md mb-1">Filter Aktif/Tidak Aktif</div>
              </div>
              <div>
                <v-select
                  v-model.trim="filterIsActive"
                  :items="listIsActive"
                  v-on:change="filterEmployee"
                  item-text="name"
                  item-value="value"
                  label="Aktif/Tidak Aktif"
                ></v-select>
              </div>
            </v-col>
            <v-col cols="4" class="py-0">
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
              ></v-text-field>
              <!-- <span class="red--text font-md mt-2"
                  >Cek kembali kata kunci anda</span
                > -->
            </v-col>
          </v-row>

          <v-row>
            <v-col md="12">
              <div class="py2" v-if="selected_items.length > 0">
                <div class="d-flex flex-row align-center justify-space-between">
                  <div>
                    <span>Data yang ditandai</span>
                    <v-chip color="blue" class="ml-3" dark>
                      <strong>Total: {{ selected_items.length }}</strong>
                    </v-chip>
                  </div>
                  <v-btn
                    dark
                    color="blue"
                    class="mr-2 icon-box"
                    @click="deleteEmployee"
                  >
                    <v-icon>mdi-delete</v-icon>Hapus data terpilih
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-data-table
                v-model="selected_items"
                :headers="this.headers"
                :items="getDataEmployees"
                class="elevation-1"
                show-select
              >
                <!-- <template v-slot:[`item.id`]="{ item }">
                  <v-btn
                    color="blue"
                    class="elevation-0"
                    dark
                    @click="editFunction(item)"
                    >{{ item.id }}
                  </v-btn>
                </template> -->
                <template v-slot:[`item.id`]="{ item }">
                  <a @click="editFunction(item)">{{ item.id }}</a>
                </template>
                <template v-slot:[`item.date_of_birth`]="{ item }">
                  {{ convertDate(item.date_of_birth, 'long') }}
                </template>
                <template v-slot:[`item.active_date`]="{ item }">
                  {{ convertDate(item.active_date, 'short-date') }}
                </template>
                <template v-slot:[`item.lama_kerja`]="{ item }">
                  {{ hitungLamaKerja(item.active_date) }}
                </template>
                <template v-slot:[`item.active`]="{ item }">
                  {{ item.active ? 'Aktif' : 'Tidak aktif' }}
                  <!-- <v-switch
                    color="primary"
                    inset
                    v-model="item.active"
                    :label="`${item.active ? 'Aktif' : 'Tidak aktif'}`"
                  ></v-switch> -->
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
import XLSX from 'xlsx';
import { formatDate, getDiffDates } from '@/utils/utils';
import { mapActions, mapGetters } from 'vuex';
import HapusKaryawan from '@/views/components/HapusKaryawan.vue';
import FormKaryawan from '@/views/components/FormKaryawan.vue';

export default {
  name: 'Karyawan',
  data() {
    return {
      filter: false,
      filterDepartmentId: null,
      filterAreaId: null,
      filterPositionId: null,
      filterShiftId: null,
      filterIsActive: null,
      listDepartment: [],
      listShift: [],
      listArea: [],
      listPosition: [],
      listIsActive: [
        { name: 'Aktif', value: 1 },
        { name: 'Tidak Aktif', value: 0 },
      ],
      selectXlsx: null,
      selected_items: [],
      headers: [
        {
          text: 'NIK',
          align: 'right',
          // sortable: false,
          value: 'id',
        },
        { text: 'Nama', value: 'name' },
        { text: 'Tgl Lahir', value: 'date_of_birth' },
        { text: 'Thn Bergabung', value: 'active_date' },
        { text: 'Lama Kerja', value: 'lama_kerja' },
        { text: 'Departemen', value: 'department.name' },
        // { text: "Shift", value: "shift.name" },
        // { text: "Bagian", value: "area.name" },
        // { text: "Jabatan", value: "position.name" },
        { text: 'BPJS', value: 'bpjs_id' },
        // { text: 'NPWP', value: 'npwp_id' },
        { text: 'Aktif', value: 'active' },
      ],
      datalist: [],
      employee: {},
      dialogHapusKaryawan: false,
      dialogForm: false,
      keyword: null,
    };
  },
  components: { HapusKaryawan, FormKaryawan },
  created() {
    this.actionGetAllEmployee();
    this.actionGetAllDepartment();
    this.actionGetAllShift();
  },

  methods: {
    ...mapActions([
      'actionGetAllEmployee',
      'saveBulkEmployee',
      'saveCustomBulkEmployee',
      'actionGetAllEmployeeByFilter',
      'actionGetAllDepartment',
      'actionGetAllAreaByDepartmentId',
      'actionGetAllPositionByAreaId',
      'actionGetAllShift',
    ]),

    showFilter() {
      this.filter = !this.filter;
    },

    clearFilter() {
      this.filterDepartmentId = null;
      this.filterAreaId = null;
      this.filterPositionId = null;
      this.filterShiftId = null;
      this.filterIsActive = null;
      this.keyword = null;
      this.listArea = [];
      this.listPosition = [];
      this.filterEmployee();
    },

    hitungLamaKerja(tahunKerja) {
      // console.log(getDiffDates(tahunKerja));
      return getDiffDates(tahunKerja);
    },

    convertDate(date, format) {
      return formatDate(date, format);
    },

    convertTime(time) {
      if (time == null) {
        return;
      }
      return time.substring(0, 5);
    },

    addFunction() {
      this.dialogForm = true;
      this.employee = {};
    },

    editFunction(item) {
      if (item != null) {
        // console.log(item);
        this.employee = item;
        this.dialogForm = true;
      }
    },

    onUpload(event) {
      console.log('Upload');
      if (!this.selectXlsx) {
        console.log('Please upload a xlsx file');
        return;
      }

      if (this.selectXlsx) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: 'binary' });
          /* Get first worksheet */
          var datarow = [];

          const wsname = wb.SheetNames[0];
          const sheet = wb.Sheets[wsname];

          for (let row = 2; ; row++) {
            datarow = [];

            if (sheet['A' + row] == null) {
              break;
            }

            for (var col = 65; col <= 85; col++) {
              var c = String.fromCharCode(col); // get 'A', 'B', 'C' ... 'U'
              var key = '' + c + row;
              if (sheet[key] == null) {
                datarow.push(null); //jika row .. column .. = null
                continue;
              }
              // console.log(sheet[key]["w"]);
              datarow.push(sheet[key]['w']);
            }

            // reformat active_date
            if (datarow[2] != null) {
              var date = datarow[2].split('/');
              // console.log(datarow[2]);
              var year = date[2];
              var month = date[1];
              var days = date[0];
              datarow[2] = year + '-' + month + '-' + days;
            }
            // reformat date_of_birth
            if (datarow[8] != null) {
              date = datarow[8].split('/');
              year = date[2];
              month = date[1];
              days = date[0];
              datarow[8] = year + '-' + month + '-' + days;
            }

            this.datalist.push({
              id: datarow[0],
              name: datarow[1],
              active_date: datarow[2],
              type: datarow[3],
              department: { name: datarow[4] },
              area: { name: datarow[5] },
              position: { name: datarow[6] },
              shift: { name: datarow[7] },
              date_of_birth: datarow[8],
              address: datarow[9],
              phone_no: datarow[10],
              npwp_id: datarow[11],
              bpjs_id: datarow[12],
              gaji_pokok: datarow[13],
              insentif_extra: datarow[14],
              extra_tambahan_kerja: datarow[15],
              tunjangan_kehadiran: datarow[16],
              extra_full: datarow[17],
              iuran_bpjs_tk: datarow[18],
              iuran_bpjs_ks: datarow[19],
              iuran_spsi: datarow[20],
            });
          }
        };

        reader.readAsBinaryString(this.selectXlsx);

        reader.onloadend = (e) => {
          console.log('datalist len = ' + this.datalist.length);
          console.log(this.datalist);
          // this.saveBulkEmployee({ bulk: this.datalist });
          this.saveCustomBulkEmployee({ bulk: this.datalist });
        };
      }
    },

    deleteEmployee() {
      this.dialogHapusKaryawan = true;
    },

    getDataAllEmployeeByFilter() {
      const param = new URLSearchParams();
      param.append('join', 'department');
      param.append('join', 'area');
      param.append('join', 'position');
      param.append('join', 'shift');
      if (this.keyword != null && this.keyword.length > 0) {
        param.append('filter', 'name||$cont||' + this.keyword);
      }
      if (this.filterDepartmentId != null) {
        param.append(
          'filter',
          'department.id||$eq||' + this.filterDepartmentId,
        );
      }
      if (this.filterAreaId != null) {
        param.append('filter', 'area.id||$eq||' + this.filterAreaId);
      }
      if (this.filterPositionId != null) {
        param.append('filter', 'position.id||$eq||' + this.filterPositionId);
      }
      if (this.filterShiftId != null) {
        param.append('filter', 'shift.id||$eq||' + this.filterShiftId);
      }
      if (this.filterIsActive != null) {
        console.log(this.filterIsActive);
        param.append('filter', 'active||$eq||' + this.filterIsActive);
      }
      this.actionGetAllEmployeeByFilter(param);
    },

    filterEmployee() {
      if (
        (this.keyword != null && this.keyword.length > 0) ||
        this.filterDepartmentId != null ||
        this.filterAreaId != null ||
        this.filterPositionId != null ||
        this.filterShiftId != null ||
        this.filterIsActive != null
      )
        this.getDataAllEmployeeByFilter();
      else this.actionGetAllEmployee();
    },

    getAllAreaByDepartmentId() {
      this.listArea = [];
      this.listPosition = [];
      this.filterAreaId = null;
      this.filterPositionId = null;
      if (this.filterDepartmentId != null) {
        const param = new URLSearchParams();
        param.append('join', 'department');
        param.append(
          'filter',
          'department.id||$eq||' + this.filterDepartmentId,
        );
        this.actionGetAllAreaByDepartmentId(param);

        this.filterEmployee();
      }
    },

    getAllPositionByAreaId() {
      // console.log(this.area_id);
      this.filterPositionId = null;
      if (this.filterAreaId != null) {
        const param = new URLSearchParams();
        param.append('join', 'area');
        param.append('filter', 'area.id||$eq||' + this.filterAreaId);
        this.actionGetAllPositionByAreaId(param);

        this.filterEmployee();
      }
    },
  },

  computed: {
    ...mapGetters([
      'getDataEmployees',
      'getDataAllDepartement',
      'getDataAllArea',
      'getDataAllPosition',
      'getAllDataShift',
    ]),
  },

  watch: {
    getDataEmployees: {
      handler() {
        // console.log(this.getDataEmployees);
        this.selected_items = [];
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
    getAllDataShift: {
      handler() {
        for (var i = 0; i < this.getAllDataShift.length; i++) {
          this.listShift.push({
            name: this.getAllDataShift[i].name,
            id: this.getAllDataShift[i].id,
          });
        }
      },
    },
    getDataAllArea: {
      handler() {
        this.listArea = [];
        if (this.getDataAllArea.length > 0) {
          for (var i = 0; i < this.getDataAllArea.length; i++) {
            this.listArea.push({
              name: this.getDataAllArea[i].name,
              id: this.getDataAllArea[i].id,
            });
          }
          this.getAllPositionByAreaId();
        }
      },
    },
    getDataAllPosition: {
      handler() {
        if (this.filterAreaId != null) {
          this.listPosition = [];
          if (this.getDataAllPosition.length > 0) {
            for (var i = 0; i < this.getDataAllPosition.length; i++) {
              this.listPosition.push({
                name: this.getDataAllPosition[i].name,
                id: this.getDataAllPosition[i].id,
              });
            }
          }
        }
      },
    },
  },
};
</script>
