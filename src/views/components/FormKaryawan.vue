<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog v-model="dialogForm" persistent max-width="1200">
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
            <!-- <v-icon color="primary">{{
              getEmployee.id != null ? 'assessment' : 'mdi-add-circle'
            }}</v-icon>
            {{ getEmployee.id != null ? 'Edit' : 'Tambah' }} Karyawan -->
          </div>
          <div class="caption ml-8 grey--text darken-3">
            Form {{ dataEmployee.id != null ? 'mengubah' : 'menambahkan' }} data
            karyawan
          </div>
        </div>
        <!-- <v-icon @click="closeForm">close</v-icon> -->
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="5" md="5">
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
                      label="Departemen"
                    ></v-select>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6">
                    <v-select
                      v-model.trim="shift_id"
                      :items="listShift"
                      item-text="name"
                      item-value="id"
                      label="Golongan"
                    ></v-select>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0" cols="12" sm="6" md="6">
                    <v-select
                      v-model.trim="area_id"
                      :items="listArea"
                      item-text="name"
                      item-value="id"
                      label="Area"
                    ></v-select>
                  </v-col>
                  <v-col class="py-0" cols="12" sm="6" md="6">
                    <v-select
                      v-model.trim="position_id"
                      :items="listPosition"
                      item-text="name"
                      item-value="id"
                      label="Posisi"
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
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="gaji_pokok"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Insentif / Lembur Extra"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="gaji_pokok === ''"
                      >
                        Data insentif harus diisi
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
      // employee: {
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
      iuran_bjs_ks: null,
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
      // },
      name_: null,
      valid: true,
      listDepartment: ['Produksi', 'Office', 'Helper'],
      listShift: ['Shift Pagi', 'Shift Siang', 'Shift Sore', 'Shift Malam'],
      listArea: ['Cat', 'Kayu', 'Staff'],
      listPosition: ['Junior', 'Senior', 'Mandor'],

      currency_config: {
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
  methods: {
    ...mapActions(['actionSaveEmployee', 'actionUpdateEmployee']),
    save() {
      const newEmployee = {
        id: this.id,
        name: this.name,
        phone_no: this.phone_no,
        address: this.eddress,
        type: this.type,
        active: this.active,
        active_date: this.active_date,
        bpjs_id: this.bpjs_id,
        npwp_id: this.npwp_id,
        date_of_birth: this.date_of_birth,
        extra_full: this.extra_full,
        iuran_bpjs_tk: this.iuran_bpjs_tk,
        iuran_bjs_ks: this.iuran_bjs_ks,
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
      // console.log(newEmployee);
      if (this.dataEmployee.id != null) {
        console.log(this.employee);
        this.actionUpdateEmployee(newEmployee);
      } else {
        this.actionSaveEmployee(newEmployee);
      }

      this.closeForm();
    },

    closeForm() {
      this.$emit('update:dialogForm', false);
    },
  },

  watch: {
    dataEmployee: {
      handler() {
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
        this.iuran_bjs_ks = this.dataEmployee.iuran_bjs_ks;
        this.iuran_spsi = this.dataEmployee.iuran_spsi;
        this.insentif_extra = this.dataEmployee.insentif_extra;
        this.extra_tambahan_kerja = this.dataEmployee.extra_tambahan_kerja;
        this.gaji_pokok = this.dataEmployee.gaji_pokok;
        this.tunjangan_kehadiran = this.dataEmployee.tunjangan_kehadiran;
        this.owner_rate = this.dataEmployee.owner_rate;
        this.owner_bonus_khusus = this.dataEmployee.owner_bonus_khusus;
        this.owner_overtime_rate = this.dataEmployee.owner_overtime_rate;
      },
    },
    getDataAllDepartement: {
      handler() {
        for (var i = 0; i < this.getDataAllDepartement.length; i++) {
          this.listDepartment = [
            {
              text: this.getDataAllDepartement[i].name,
              value: this.getDataAllDepartement,
            },
          ];
        }
      },
    },
    getDataAllShift: {
      handler() {
        for (var i = 0; i < this.getDataAllShift.length; i++) {
          this.listShift = [
            {
              text: this.getDataAllShift[i].name,
              value: this.getDataAllShift,
            },
          ];
        }
      },
    },
    getDataAllArea: {
      handler() {
        for (var i = 0; i < this.getDataAllArea.length; i++) {
          this.listArea = [
            {
              text: this.getDataAllArea[i].name,
              value: this.getDataAllArea,
            },
          ];
        }
      },
    },
    getDataAllPosition: {
      handler() {
        for (var i = 0; i < this.getDataAllPosition.length; i++) {
          this.listPosition = [
            {
              text: this.getDataAllPosition[i].name,
              value: this.getDataAllPosition,
            },
          ];
        }
      },
    },
  },

  computed: {
    ...mapGetters([
      'getDataAllDepartement',
      'getDataAllArea',
      'getDataAllPosition',
      'getDataAllShift',
    ]),
  },
};
</script>
