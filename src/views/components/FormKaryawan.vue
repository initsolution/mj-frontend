<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-dialog v-model="dialogForm" persistent max-width="1000">
    <v-card>
      <v-card-title
        class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
      >
        <div>
          <div>
            <v-icon>{{
              dataEmployee.id != null ? 'mdi-account-edit' : 'mdi-account-plus'
            }}</v-icon>
            {{ dataEmployee.id != null ? 'Ubah' : 'Tambah' }} Karyawan {{ id }}
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
              <v-form ref="form">
                <v-row>
                  <v-col class="py-0" cols="12" sm="12" md="12">
                    <div
                      class="font-sm grey--text grey lighten-4 px-3 py-1 mb-3 mt-6 round"
                    >
                      Data Pribadi
                    </div>

                    <v-row>
                      <v-col class="py-0" cols="7">
                        <v-text-field
                          color="grey darken-2"
                          v-model.trim="name"
                          label="Nama Lengkap*"
                          :error-messages="nameErrors"
                          :counter="100"
                          @input="$v.name.$touch()"
                          @blur="$v.name.$touch()"
                          required
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
                          :error-messages="idErrors"
                          :counter="100"
                          disabled
                          @input="$v.id.$touch()"
                          @blur="$v.id.$touch()"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col class="py-0" cols="12" sm="12" md="6">
                        <v-text-field
                          color="grey darken-2"
                          v-model.trim="bpjs_id"
                          label="ID BPJS"
                          :error-messages="bpjsIdErrors"
                          :counter="30"
                          @input="$v.bpjs_id.$touch()"
                          @blur="$v.bpjs_id.$touch()"
                        ></v-text-field>
                      </v-col>
                      <v-col class="py-0" cols="12" sm="12" md="6">
                        <v-text-field
                          color="grey darken-2"
                          v-model.trim="npwp_id"
                          label="ID NPWP"
                          :error-messages="npwpIdErrors"
                          :counter="30"
                          @input="$v.npwp_id.$touch()"
                          @blur="$v.npwp_id.$touch()"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col class="py-0" cols="12" sm="12" md="12">
                        <v-text-field
                          color="grey darken-2"
                          v-model.trim="address"
                          label="Alamat"
                          :error-messages="addressErrors"
                          :counter="100"
                          @input="$v.address.$touch()"
                          @blur="$v.address.$touch()"
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
                          :error-messages="phoneNoErrors"
                          :counter="20"
                          @input="$v.phone_no.$touch()"
                          @blur="$v.phone_no.$touch()"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col class="py-0" cols="12" sm="12" md="12">
                    <div
                      class="font-sm grey--text grey lighten-4 px-3 py-1 mb-3 mt-6 round"
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
                        <!-- <v-select
                          v-model.trim="selectedShift"
                          :items="listShift"
                          item-text="name"
                          item-value="id"
                          label="Shift"
                        ></v-select> -->
                        <v-autocomplete
                          v-model.trim="selectedShift"
                          :items="listShift"
                          color="white"
                          item-text="name"
                          label="Shift"
                          return-object
                        ></v-autocomplete>
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
                            <div class="subtitle">
                              Status keaktifan karyawan
                            </div>
                          </v-col>
                        </v-row>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0 mb-5 mt-6" cols="12" sm="12" md="12">
                    <div
                      class="font-sm grey--text grey lighten-4 px-3 py-1 mb-6 round"
                    >
                      Detail Shift
                    </div>
                    <v-data-table
                      :headers="this.headers"
                      :items="listDetailShift"
                      class="elevation-1"
                    >
                      <template v-slot:[`item.days`]="{ item }"
                        >{{ convertToDay(item.days - 1) }}
                      </template>
                      <template v-slot:[`item.start`]="{ item }">
                        {{ convertTime(item.start) }}
                      </template>
                      <template v-slot:[`item.start_break`]="{ item }">
                        {{ convertTime(item.start_break) }}
                      </template>
                      <template v-slot:[`item.end`]="{ item }">
                        {{ convertTime(item.end) }}
                      </template>
                      <template v-slot:[`item.end_break`]="{ item }">
                        {{ convertTime(item.end_break) }}
                      </template>
                    </v-data-table>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0 mt-6" cols="12" sm="12" md="12">
                    <div
                      class="font-sm grey--text grey lighten-4 px-3 py-1 mb-6 round"
                    >
                      Data Komponen Pengajian
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0 mb-5" cols="6" sm="6" md="6">
                    <!-- <v-currency-field
                      color="grey darken-2"
                      :decimal-length="0"
                      prefix="Rp"
                      filled
                      v-bind="currency_config"
                      v-model.trim="gaji_pokok"
                      class="currency-input pa-0 ma-0 font-md"
                      label="Gaji Pokok"
                      :error-messages="gajiPokokErrors"
                      @input="$v.gaji_pokok.$touch()"
                      @blur="$v.gaji_pokok.$touch()"
                      required
                    ></v-currency-field> -->
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
                  </v-col>

                  <v-col class="py-0 mb-5" cols="6" sm="6" md="6">
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
                      v-model.trim="tunjangan_jabatan"
                      class="currency-input pa-0 ma-0 font-md"
                      label="Tunjangan Jabatan"
                    ></v-currency-field>
                    <div
                      style="color: red; font-size: 12px"
                      v-if="tunjangan_kehadiran === ''"
                    >
                      Tunjangan Jabatan harus diisi
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
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0" cols="12" sm="12" md="12">
                    <div
                      class="font-sm grey--text grey lighten-4 px-3 py-1 mb-6 round"
                    >
                      Data Komponen Pengajian : Potongan/Iuran
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col class="py-0" cols="6" sm="6" md="6">
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
                <div v-if="isOwner">
                  <v-row>
                    <v-col class="py-0 mt-6" cols="12" sm="12" md="12">
                      <div
                        class="font-sm white--text purple px-3 py-1 mb-6 round"
                      >
                        Data Komponen Pengajian Owner
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="py-0 mb-5" cols="6" sm="6" md="6">
                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="owner_rate"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Tambahan"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="owner_rate === ''"
                      >
                        Tambahan harus diisi
                      </div>
                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="owner_overtime_rate"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Lembur"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="owner_overtime_rate === ''"
                      >
                        Lembur harus diisi
                      </div>
                    </v-col>

                    <v-col class="py-0 mb-5" cols="6" sm="6" md="6">
                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="owner_bonus_khusus"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Bonus Khusus"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="owner_bonus_khusus === ''"
                      >
                        Bonus Khusus harus diisi
                      </div>

                      <v-currency-field
                        color="grey darken-2"
                        :decimal-length="0"
                        prefix="Rp"
                        filled
                        v-bind="currency_config"
                        v-model.trim="owner_astek_plus"
                        class="currency-input pa-0 ma-0 font-md"
                        label="Potongan Astek Plus"
                      ></v-currency-field>
                      <div
                        style="color: red; font-size: 12px"
                        v-if="owner_astek_plus === ''"
                      >
                        Potongan Astek Plus harus diisi
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
          >{{ dataEmployee.id != null ? 'Ubah' : 'Simpan' }}</v-btn
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
import { formatDate, parseJwt } from '@/utils/utils';
import { mapActions, mapGetters } from 'vuex';
import {
  required,
  minLength,
  maxLength,
  email,
} from 'vuelidate/lib/validators';

export default {
  name: 'FormKaryawan',
  data() {
    return {
      isOwner: false,
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
      extra_full: 0,
      iuran_bpjs_tk: 0,
      iuran_bpjs_ks: 0,
      iuran_spsi: 0,
      insentif_extra: 0,
      extra_tambahan_kerja: 0,
      gaji_pokok: 0,
      tunjangan_jabatan: 0,
      tunjangan_kehadiran: 0,
      owner_rate: 0,
      owner_bonus_khusus: 0,
      owner_overtime_rate: 0,
      owner_astek_plus: 0,
      department_id: null,
      area_id: null,
      position_id: null,
      shift_id: null,
      selectedShift: null,
      // ------------------

      name_: null,
      listDepartment: [],
      listShift: [],
      listArea: [],
      listPosition: [],
      listDetailShift: [],

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

      selected_shift: null,
      headers: [
        { text: 'Hari', value: 'days' },
        { text: 'Jam Masuk', value: 'start' },
        { text: 'Mulai Istirahat', value: 'start_break' },
        { text: 'Selesai Istirahat', value: 'end_break' },
        { text: 'Durasi Istirahat(menit)', value: 'break_duration_m' },
        { text: 'Jam Pulang', value: 'end' },
      ],
      label_day: [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
      ],
    };
  },
  validations: {
    id: {
      required,
      maxLength: maxLength(20),
    },
    name: {
      required,
      maxLength: maxLength(100),
    },
    phone_no: {
      maxLength: maxLength(20),
    },
    address: {
      maxLength: maxLength(100),
    },
    bpjs_id: {
      maxLength: maxLength(30),
    },
    npwp_id: {
      maxLength: maxLength(30),
    },
    // gaji_pokok: {
    //   required,
    // },
    // extra_full: {
    //   required,
    // },

    // insentif_extra: {
    //   required,
    // },
    // extra_tambahan_kerja: {
    //   required,
    // },

    // tunjangan_kehadiran: {
    //   required,
    // },
    // iuran_bpjs_tk: {
    //   required,
    // },

    // iuran_bpjs_ks: {
    //   required,
    // },
    // iuran_spsi: {
    //   required,
    // },
  },

  props: {
    employeeType: {
      type: Array,
      default() {
        return ['REGULER', 'KHUSUS', 'FLAT'];
      },
    },
    dialogForm: {
      default: false,
    },
    dataEmployee: {},
  },

  created() {
    const token = localStorage.getItem('token');
    const parsedToken = this.parsingJwt(token);
    this.email = parsedToken.user.email;
    if (parsedToken.user.role == 'owner') {
      console.log('owner');
      this.isOwner = true;
    } else {
      console.log('admin');
      this.isOwner = false;
    }
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
      'actionGetAllDetailShiftByShiftId',
    ]),

    parsingJwt(token) {
      return parseJwt(token);
    },

    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const newEmployee = {
        id: this.id,
        name: this.name,
        phone_no: this.phone_no,
        address: this.address,
        type: this.type,
        active: this.active ? 1 : 0,
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
          id: this.selectedShift != null ? this.selectedShift.id : null,
        },
        extra_full: this.extra_full,
        iuran_bpjs_tk: this.iuran_bpjs_tk,
        iuran_bpjs_ks: this.iuran_bpjs_ks,
        iuran_spsi: this.iuran_spsi,
        insentif_extra: this.insentif_extra,
        extra_tambahan_kerja: this.extra_tambahan_kerja,
        gaji_pokok: this.gaji_pokok,
        tunjangan_jabatan: this.tunjangan_jabatan,
        tunjangan_kehadiran: this.tunjangan_kehadiran,
        owner_rate: this.owner_rate,
        owner_bonus_khusus: this.owner_bonus_khusus,
        owner_overtime_rate: this.owner_overtime_rate,
        owner_astek_plus: this.owner_astek_plus,
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

    convertTime(date, format) {
      if (date != null) {
        return date.substring(0, 5);
      } else {
        return '-';
      }
    },

    convertToDay(day) {
      return this.label_day[day];
    },

    closeForm() {
      this.department_id = null;
      this.area_id = null;
      this.position_id = null;
      this.selectedShift = null;
      this.listDetailShift = [];
      this.$emit('update:dataEmployee', {});
      this.$emit('update:dialogForm', false);
      this.$v.$reset();
    },

    getAllAreaByDepartmentId() {
      // console.log('dept' + this.department_id);
      this.listArea = [];
      this.listPosition = [];
      this.area_id = null;
      this.position_id = null;
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

    getAllDetailShiftByShiftId() {
      if (this.selectedShift != null) {
        const param = new URLSearchParams();
        param.append('join', 'shift');
        param.append('filter', 'shift.id||$eq||' + this.selectedShift.id);
        this.actionGetAllDetailShiftByShiftId(param);
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
        this.active = this.dataEmployee.active == 1 ? true : false;
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
        this.tunjangan_jabatan = this.dataEmployee.tunjangan_jabatan;
        this.tunjangan_kehadiran = this.dataEmployee.tunjangan_kehadiran;
        this.owner_rate = this.dataEmployee.owner_rate;
        this.owner_bonus_khusus = this.dataEmployee.owner_bonus_khusus;
        this.owner_overtime_rate = this.dataEmployee.owner_overtime_rate;
        this.owner_astek_plus = this.dataEmployee.owner_astek_plus;
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
          this.selectedShift = this.dataEmployee.shift;
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

    selectedShift: {
      handler() {
        if (this.selectedShift != null) this.getAllDetailShiftByShiftId();
      },
    },

    getAllDetailShift: {
      handler() {
        this.listDetailShift = [];
        console.log(this.getAllDetailShift);
        for (var i = 0; i < this.getAllDetailShift.length; i++) {
          this.listDetailShift.push(this.getAllDetailShift[i]);
        }
      },
    },

    getDataAllArea: {
      handler() {
        this.listArea = [];
        if (this.getDataAllArea.length > 0) {
          for (var i = 0; i < this.getDataAllArea.length; i++) {
            console.log(
              'Bagian:' +
                this.getDataAllArea[i].id +
                ' ' +
                this.getDataAllArea[i].name,
            );
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
            console.log(
              'Jabatan:' +
                this.getDataAllPosition[i].id +
                ' ' +
                this.getDataAllPosition[i].name,
            );
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
      'getAllDetailShift',
    ]),
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.maxLength && errors.push('Panjang Nama Max 50 Karakter');
      !this.$v.name.required && errors.push('Nama harus diisi.');
      return errors;
    },
    idErrors() {
      const errors = [];
      if (!this.$v.id.$dirty) return errors;
      !this.$v.id.maxLength && errors.push('NIK Max 20 Karakter');
      !this.$v.id.required && errors.push('NIK harus diisi.');
      return errors;
    },
    bpjsIdErrors() {
      const errors = [];
      if (!this.$v.bpjs_id.$dirty) return errors;
      !this.$v.bpjs_id.maxLength && errors.push('BPJS ID Max 30 Karakter');
      return errors;
    },
    npwpIdErrors() {
      const errors = [];
      if (!this.$v.npwp_id.$dirty) return errors;
      !this.$v.npwp_id.maxLength && errors.push('NPWP ID Max 30 Karakter');
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.maxLength && errors.push('Alamat Max 100 Karakter');
      return errors;
    },
    phoneNoErrors() {
      const errors = [];
      if (!this.$v.phone_no.$dirty) return errors;
      !this.$v.phone_no.maxLength && errors.push('No Telepon 20 Karakter');
      return errors;
    },
    // gajiPokokErrors() {
    //   const errors = [];
    //   if (!this.$v.gaji_pokok.$dirty) return errors;
    //   !this.$v.gaji_pokok.required && errors.push('Gaji pokok harus diisi.');
    //   return errors;
    // },

    // extraFullErrors() {
    //   const errors = [];
    //   if (!this.$v.extra_full.$dirty) return errors;
    //   !this.$v.extra_full.required && errors.push('Extra full harus diisi.');
    //   return errors;
    // },

    // insentifExtraErrors() {
    //   const errors = [];
    //   if (!this.$v.insentif_extra.$dirty) return errors;
    //   !this.$v.insentif_extra.required && errors.push('Insentif extra harus diisi.');
    //   return errors;
    // },
    // extraTambahanKerjaErrors() {
    //   const errors = [];
    //   if (!this.$v.extra_tambahan_kerja.$dirty) return errors;
    //   !this.$v.extra_tambahan_kerja.required && errors.push('Extra tambahan kerja harus diisi.');
    //   return errors;
    // },
    // tunjanganKehadiranErrors() {
    //   const errors = [];
    //   if (!this.$v.tunjangan_kehadiran.$dirty) return errors;
    //   !this.$v.tunjangan_kehadiran.required && errors.push('Tunjangan kehadiran harus diisi.');
    //   return errors;
    // },

    // iuranBpjsTkErrors() {
    //   const errors = [];
    //   if (!this.$v.iuran_bpjs_tk.$dirty) return errors;
    //   !this.$v.iuran_bpjs_tk.required && errors.push('Iuran BPJS TK harus diisi.');
    //   return errors;
    // },
    // iuranBpjsKsErrors() {
    //   const errors = [];
    //   if (!this.$v.iuran_bpjs_ks.$dirty) return errors;
    //   !this.$v.iuran_bpjs_ks.required && errors.push('Iuran BPJS KS harus diisi.');
    //   return errors;
    // },
    // iuranSpsiErrors() {
    //   const errors = [];
    //   if (!this.$v.iuran_spsi.$dirty) return errors;
    //   !this.$v.iuran_spsi.required && errors.push('Iuran SPSI harus diisi.');
    //   return errors;
    // },
  },
};
</script>
