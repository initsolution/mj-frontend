<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog v-model="dialogForm" persistent max-width="1000">
    <v-card>
      <v-card-title
        class="
          subheading
          px-8
          d-flex
          flex-row
          grey
          lighten-5
          align-center
          justify-space-between
        "
      >
        <div>
          <div>
            <v-icon color="purple">{{
              dataEmployee.id != null ? 'mdi-account-edit' : 'mdi-account-plus'
            }}</v-icon>
            {{ dataEmployee.id != null ? 'Edit' : 'Tambah' }} Karyawan
          </div>
          <div class="caption ml-8 grey--text darken-3">
            Form {{ dataEmployee.id != null ? 'mengubah' : 'menambahkan' }} data
            karyawan
          </div>
        </div>
        <v-icon @click="closeForm">mdi-close</v-icon>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <div
                  class="font-sm grey--text grey lighten-4 px-3 py-1 mb-3 round"
                >
                  Data Pribadi
                </div>

                <v-row>
                  <v-col class="py-0" cols="7">
                    <v-text-field
                      color="grey darken-2"
                      v-model.trim="name"
                      required
                      label="Nama Lengkap*"
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="5">
                    <v-select
                      :items="employeeType"
                      v-model.trim="type"
                      label="Status Karyawan"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0" cols="12" sm="12" md="12">
                    <v-text-field
                      color="grey darken-2"
                      v-model.trim="id"
                      label="NIK*"
                      :counter="20"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0" cols="12" sm="12" md="6">
                    <v-text-field
                      color="grey darken-2"
                      v-model.trim="bpjs_id"
                      label="ID BPJS*"
                      :counter="20"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="12" md="6">
                    <v-text-field
                      color="grey darken-2"
                      v-model.trim="npwp_id"
                      label="ID NPWP*"
                      :counter="20"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0" cols="12" sm="12" md="12">
                    <v-text-field
                      color="grey darken-2"
                      v-model.trim="address"
                      label="Alamat"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0" cols="12" sm="12" md="12">
                    <v-menu
                      v-model="menu3"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          color="grey darken-2"
                          v-model="date_of_birth"
                          label="Tanggal lahir"
                          readonly
                          v-on="on"
                          prepend-inner-icon="mdi-calendar-today"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date_of_birth"
                        :max="dateNow"
                        @input="menu3 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0" cols="12" sm="12" md="12">
                    <v-text-field
                      color="grey darken-2"
                      v-model.trim="phone_no"
                      label="Nomor Telepon"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <div
                  class="font-sm grey--text grey lighten-4 px-3 py-1 mb-3 round"
                >
                  Data Karyawan
                </div>
                <v-row>
                  <v-col class="py-0" cols="12" sm="6" md="6">
                    <v-select
                      v-model.trim="department_id"
                      :items="listDepartment"
                      item-text="name"
                      item-value="id"
                      v-on:change="getAllAreaByDepartmentId"
                      label="Departemen"
                    ></v-select>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6">
                    <v-select
                      v-model.trim="area_id"
                      :items="listArea"
                      item-text="name"
                      item-value="id"
                      v-on:change="getAllPositionByAreaId"
                      label="Bagian"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0" cols="12" sm="6" md="6">
                    <v-select
                      v-model.trim="position_id"
                      :items="listPosition"
                      item-text="name"
                      item-value="id"
                      label="Jabatan"
                    ></v-select>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6">
                    <v-select
                      v-model.trim="shift_id"
                      :items="listShift"
                      item-text="name"
                      item-value="id"
                      label="Shift"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0" cols="12" sm="6" md="6">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          color="grey darken-2"
                          v-model="active_date"
                          label="Tanggal Mulai Kerja"
                          readonly
                          v-on="on"
                          prepend-inner-icon="mdi-calendar-today"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="active_date"
                        :max="dateNow"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6">
                    <v-row align="center">
                      <v-col class="py-0" cols="12" sm="6" md="6">
                        <v-switch
                          color="primary"
                          v-model="active"
                          :label="`${active ? 'Aktif' : 'Tidak aktif'}`"
                        ></v-switch>
                      </v-col>
                      <v-col class="py-0" cols="12" sm="6" md="6">
                        <div class="subtitle">Status keaktifan karyawan</div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <div
                  class="font-sm grey--text grey lighten-4 px-3 py-1 mb-6 round"
                >
                  Data Komponen Pengajian
                </div>
                <div>
                  <v-row>
                    <v-col class="py-0 mb-5" cols="12" sm="12" md="12">
                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="gaji_pokok"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Gaji Pokok"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="gaji_pokok === ''"
                      >
                        Data insentif harus diisi
                      </div>
                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="extra_full"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Extra Full"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="extra_full === ''"
                      >
                        Extra Full harus diisi
                      </div>
                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="insentif_extra"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Insentif Extra"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="insentif_extra === ''"
                      >
                        Insentif Extra harus diisi
                      </div>
                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="extra_tambahan_kerja"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Extra Tambahan Kerja"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="extra_tambahan_kerja === ''"
                      >
                        Extra Tambahan Kerja harus diisi
                      </div>

                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="tunjangan_kehadiran"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Tunjangan Kehadiran"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="tunjangan_kehadiran === ''"
                      >
                        Tunjangan Kehadiran harus diisi
                      </div>

                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="iuran_bpjs_tk"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Iuran BPJS Ketenagakerjaan"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="iuran_bpjs_tk === ''"
                      >
                        Iuran BPJS Ketenagakerjaan harus diisi
                      </div>
                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="iuran_bpjs_ks"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Iuran BPJS Kesehatan"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="iuran_bpjs_ks === ''"
                      >
                        Iuran BPJS Kesehatan harus diisi
                      </div>
                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="iuran_spsi"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Iuran SPSI"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="iuran_spsi === ''"
                      >
                        Iuran BPJS SPSI harus diisi
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="grey lighten-4 px-8 py-4 d-flex flex-row">
        <v-btn
          min-width="100"
          class="elevation-0"
          color="grey darken-1"
          dark
          @click.native="closeForm"
          >Tutup</v-btn
        >
        <v-btn
          min-width="100"
          class="elevation-0"
          color="primary"
          @click="save"
          >{{ dataEmployee.id != null ? 'Edit' : 'Simpan' }}</v-btn
        >

        <div class="caption grey--text lighten-2 ml-5">
          Sebelum submit silahkan cek kembali inputan anda
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import employee from '@/store/modules/employee';
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'FormKaryawan',
  data() {
    return {
      menu2: null,
      menu3: null,
      dateNow: new Date().toISOString().substring(0, 10),
      // EMPLOYEE FIELDS
      id: null,
      name: null,
      phone_no: null,
      address: null,
      type: null,
      active: null,
      active_date: null,
      bpjs_id: null,
      npwp_id: null,
      date_of_birth: null,
      extra_full: null,
      iuran_bpjs_tk: null,
      iuran_bpjs_ks: null,
      iuran_spsi: null,
      insentif_extra: null,
      extra_tambahan_kerja: null,
      gaji_pokok: null,
      tunjangan_kehadiran: null,
      owner_rate: null,
      owner_bonus_khusus: null,
      owner_overtime_rate: null,
      department_id: null,
      area_id: null,
      position_id: null,
      shift_id: null,
      // ------------------

      name_: null,
      valid: true,
      listDepartment: [],
      listShift: [],
      listArea: [],
      listPosition: [],

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
  props: {
    employeeType: {
      type: Array,
      default() {
        return ['REGULER', 'KHUSUS'];
      },
    },
    dialogForm: {
      default: false,
    },
    dataEmployee: {},
  },
  created() {
    console.log('created');
    this.actionGetAllDepartment();
    this.actionGetAllShift();
  },
  methods: {
    ...mapActions([
      'actionSaveEmployee',
      'actionUpdateEmployee',
      'actionGetAllDepartment',
      'actionGetAllAreaByDepartmentId',
      'actionGetAllPositionByAreaId',
      'actionGetAllShift',
    ]),
    save() {
      const newEmployee = {
        id: this.id,
        name: this.name,
        phone_no: this.phone_no,
        address: this.address,
        type: this.type,
        active: this.active,
        active_date: this.active_date,
        bpjs_id: this.bpjs_id,
        npwp_id: this.npwp_id,
        date_of_birth: this.date_of_birth,
        department: {
          id: this.department_id,
        },
        area: {
          id: this.area_id,
        },
        position: {
          id: this.position_id,
        },
        shift: {
          id: this.shift_id,
        },
        extra_full: this.extra_full,
        iuran_bpjs_tk: this.iuran_bpjs_tk,
        iuran_bpjs_ks: this.iuran_bpjs_ks,
        iuran_spsi: this.iuran_spsi,
        insentif_extra: this.insentif_extra,
        extra_tambahan_kerja: this.extra_tambahan_kerja,
        gaji_pokok: this.gaji_pokok,
        tunjangan_kehadiran: this.tunjangan_kehadiran,
        owner_rate: 0,
        owner_bonus_khusus: 0,
        owner_overtime_rate: 0,
        meta: {},
      };
      console.log(newEmployee);
      if (this.dataEmployee.id != null) {
        // console.log(this.employee);
        this.actionUpdateEmployee(newEmployee);
      } else {
        this.actionSaveEmployee(newEmployee);
      }

      this.closeForm();
    },

    closeForm() {
      this.department_id = null;
      this.area_id = null;
      this.position_id = null;
      this.shift_id = null;
      this.$emit('update:dataEmployee', {});
      this.$emit('update:dialogForm', false);
    },

    getAllAreaByDepartmentId() {
      // console.log(this.department_id);
      if (this.department_id != null) {
        const param = new URLSearchParams();
        param.append('join', 'department');
        param.append('filter', 'department.id||$eq||' + this.department_id);
        this.actionGetAllAreaByDepartmentId(param);
      }
    },

    getAllPositionByAreaId() {
      // console.log(this.area_id);
      if (this.area_id != null) {
        const param = new URLSearchParams();
        param.append('join', 'area');
        param.append('filter', 'area.id||$eq||' + this.area_id);
        this.actionGetAllPositionByAreaId(param);
      }
    },
  },

  watch: {
    dataEmployee: {
      handler() {
        console.log('dataEmployee');
        console.log(this.dataEmployee);
        this.id = this.dataEmployee.id;
        this.name = this.dataEmployee.name;
        this.phone_no = this.dataEmployee.phone_no;
        this.address = this.dataEmployee.address;
        this.type = this.dataEmployee.type;
        this.active = this.dataEmployee.active;
        this.active_date = this.dataEmployee.active_date;
        this.bpjs_id = this.dataEmployee.bpjs_id;
        this.npwp_id = this.dataEmployee.npwp_id;
        this.date_of_birth = this.dataEmployee.date_of_birth;
        this.extra_full = this.dataEmployee.extra_full;
        this.iuran_bpjs_tk = this.dataEmployee.iuran_bpjs_tk;
        this.iuran_bpjs_ks = this.dataEmployee.iuran_bpjs_ks;
        this.iuran_spsi = this.dataEmployee.iuran_spsi;
        this.insentif_extra = this.dataEmployee.insentif_extra;
        this.extra_tambahan_kerja = this.dataEmployee.extra_tambahan_kerja;
        this.gaji_pokok = this.dataEmployee.gaji_pokok;
        this.tunjangan_kehadiran = this.dataEmployee.tunjangan_kehadiran;
        this.owner_rate = this.dataEmployee.owner_rate;
        this.owner_bonus_khusus = this.dataEmployee.owner_bonus_khusus;
        this.owner_overtime_rate = this.dataEmployee.owner_overtime_rate;
        if (this.dataEmployee.department != null) {
          this.department_id = this.dataEmployee.department.id;
          this.getAllAreaByDepartmentId();
        }

        if (this.dataEmployee.area != null) {
          this.area_id = this.dataEmployee.area.id;
          this.getAllPositionByAreaId();
        }
        if (this.dataEmployee.position != null)
          this.position_id = this.dataEmployee.position.id;
        if (this.dataEmployee.shift != null)
          this.shift_id = this.dataEmployee.shift.id;
      },
    },
    getDataAllDepartement: {
      handler() {
        console.log('department_id');
        console.log(this.department_id);
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
        this.listPosition = [];
        if (this.getDataAllPosition.length > 0) {
          for (var i = 0; i < this.getDataAllPosition.length; i++) {
            this.listPosition.push({
              name: this.getDataAllPosition[i].name,
              id: this.getDataAllPosition[i].id,
            });
          }
        }
      },
    },
  },

  computed: {
    ...mapGetters([
      'getDataAllDepartement',
      'getDataAllArea',
      'getDataAllPosition',
      'getAllDataShift',
    ]),
  },
};
</script>
