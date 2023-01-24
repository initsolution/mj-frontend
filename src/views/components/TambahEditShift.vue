<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogTambahEditShift" persistent max-width="1000px">
      <v-card>
        <v-card-title>
          <span v-if="getDataShift == 'tambah'" class="headline"
            >Tambah Shift</span
          >
          <span v-else class="headline">Edit Shift</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="py-0" cols="12" sm="5" md="5">
                <v-text-field
                  color="grey darken-2"
                  label="Nama Shift"
                  v-model="shift_name"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="12" sm="5" md="5">
                <v-row>
                  <div class="font-sm">Dapat Ditukar</div>
                </v-row>
                <v-row
                  ><v-switch
                    class="pt-0 mt-0"
                    color="primary"
                    inset
                    v-model="switchable"
                  ></v-switch
                ></v-row>
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-row>
              <v-col class="py-0" cols="10" sm="6" md="6">
                <span><v-icon>mdi-calendar</v-icon>Jadwal Kerja</span>
              </v-col>
              <v-col class="py-0" cols="10" sm="6" md="6">
                <v-select
                  class="mt-0 pt-0"
                  :items="schedules"
                  v-model.trim="selected_schedule"
                  hide-details
                  item-text="name"
                  item-value="id"
                  single-line
                  label="Tipe Jadwal"
                ></v-select>
              </v-col>
            </v-row>
            <v-divider class="my-5"></v-divider>
            <v-card-text></v-card-text>
            <div v-for="(v, index) in list_detailshift" :key="index">
              <div
                :class="{
                  'py-6 px-5 round': true,
                  'grey lighten-4': index % 2 !== 0,
                }"
              >
                <v-row>
                  <v-col class="py-0" cols="10" sm="4" md="4">
                    <v-row> Status hari </v-row>
                    <v-row>
                      <v-switch
                        class="pt-0 mt-0"
                        color="primary"
                        inset
                        v-model="v.active"
                      ></v-switch>
                    </v-row>
                  </v-col>
                  <v-col class="py-0" cols="10" sm="4" md="4">
                    <v-row>
                      <v-text-field
                        color="grey darken-2"
                        label="Hari"
                        :value="label_day[index]"
                        readonly
                        required
                      ></v-text-field>
                    </v-row>
                  </v-col>

                  <v-col class="py-0" cols="10" sm="4" md="4">
                    <v-row>
                      <v-col
                        ><v-text-field
                          label="Jam Masuk"
                          required
                          hide-details
                          v-mask="mask"
                          v-model.trim="v.start"
                      /></v-col>
                      <v-col
                        ><v-text-field
                          label="Mulai Istirahat"
                          hide-details
                          required
                          v-mask="mask"
                          v-model.trim="v.start_break"
                      /></v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        ><v-text-field
                          label="Selesai Istirahat"
                          required
                          hide-details
                          v-mask="mask"
                          v-model.trim="v.end_break"
                      /></v-col>
                      <v-col
                        ><v-text-field
                          label="Jam Pulang"
                          required
                          hide-details
                          v-mask="mask"
                          v-model.trim="v.end"
                      /></v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click.native="close">Close</v-btn>

          <v-btn
            v-if="getDataShift == 'tambah'"
            color="blue darken-1"
            @click="add_edit_Shift"
            >Tambah</v-btn
          >
          <v-btn v-else color="blue darken-1" @click="add_edit_Shift"
            >Edit</v-btn
          >
          <v-snackbar
            v-model="snackbar"
            :multi-line="multiLine"
            top
            color="orange"
          >
            {{ notif_text }}

            <template v-slot:action="{ attrs }">
              <v-btn
                color="white"
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </template>
          </v-snackbar>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
      
  <script>
import { mapActions, mapGetters } from "vuex";
import { mask } from "vue-the-mask";
export default {
  name: "TambahEditShift",
  props: {
    dialogTambahEditShift: {
      default: false,
    },
    getDataShift: null,
  },

  directives: {
    mask,
  },

  created() {
    // this.actionGetAllEmployee();
    // console.log(this.list_detailshift);
  },

  data() {
    return {
      schedules: ["Jadwal Tetap", "Jadwal Shift"],
      label_day: [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ],
      shift_id: null,
      shift_name: null,
      switchable: false,
      selected_schedule: null,
      list_detailshift: [],
      mask: "##:##",
      check_in: "",
      check_out: "",
      start_for_break: "",
      end_for_break: "",
      start_for_left: "",
      end_for_left: "",
      arrive_home: "",
      multiLine: false,
      snackbar: false,
      notif_text: "",
    };
  },
  methods: {
    ...mapActions([
      "actionSaveShift",
      "actionUpdateShift",
      "actionUpdateDetailShift",
    ]),
    add_edit_Shift() {
      console.log("selected_schedule : " + this.selected_schedule);
      var is_flexible = -1;

      if (this.shift_name == null) {
        this.notif_text = "Nama Shift kosong!";
        this.snackbar = true;
        return;
      }

      if (this.selected_schedule == null) {
        this.notif_text = "Tipe jadwal kosong!";
        this.snackbar = true;
        return;
      }

      for (var i = 0; i < this.schedules.length; i++) {
        if (this.selected_schedule == this.schedules[i]) {
          is_flexible = i;
        }
      }

      console.log("is flexible : " + is_flexible);
      this.switchable = this.switchable == true ? 1 : 0;

      for (var i = 0; i < this.list_detailshift.length; i++) {
        this.list_detailshift[i].active =
          this.list_detailshift[i].active == true ? 1 : 0;
        this.list_detailshift[i].is_flexible = is_flexible;

        if (
          this.list_detailshift[i].start == null ||
          this.list_detailshift[i].start_break == null ||
          this.list_detailshift[i].end_break == null ||
          this.list_detailshift[i].end == null
        ) {
          console.log("babi kecil");
          this.notif_text =
            "Format waktu tidak sesuai, harap cek kembali. contoh: 17:00";
          this.snackbar = true;
          return;
        } else {
          console.log("babi gede");
          if (
            this.list_detailshift[i].start.length != 5 ||
            this.list_detailshift[i].start_break.length != 5 ||
            this.list_detailshift[i].end_break.length != 5 ||
            this.list_detailshift[i].end.length != 5
          ) {
            this.notif_text =
              "Format waktu tidak sesuai, harap cek kembali. contoh: 17:00";
            this.snackbar = true;
            return;
          } else {
            if (
              this.checkTime(
                this.list_detailshift[i].start.split(":")[0],
                this.list_detailshift[i].start.split(":")[1]
              ) != "" ||
              this.checkTime(
                this.list_detailshift[i].start_break.split(":")[0],
                this.list_detailshift[i].start_break.split(":")[1]
              ) != "" ||
              this.checkTime(
                this.list_detailshift[i].end_break.split(":")[0],
                this.list_detailshift[i].end_break.split(":")[1]
              ) != "" ||
              this.checkTime(
                this.list_detailshift[i].end.split(":")[0],
                this.list_detailshift[i].end.split(":")[1]
              ) != ""
            ) {
              this.notif_text =
                "Format waktu tidak sesuai, harap cek kembali. contoh: 17:00";
              this.snackbar = true;
              return;
            }
          }
        }
        this.list_detailshift[i].work_hours =
          this.list_detailshift[i].start + "-" + this.list_detailshift[i].end;
        this.list_detailshift[i].break_hours =
          this.list_detailshift[i].start_break +
          "-" +
          this.list_detailshift[i].end_break;
        var mulaiIstirahat = this.list_detailshift[i].start_break.split(":");
        var selesaiIstirahat = this.list_detailshift[i].end_break.split(":");

        var hasil =
          60 * (selesaiIstirahat[0] - mulaiIstirahat[0]) +
          (selesaiIstirahat[1] - mulaiIstirahat[1]);

        console.log("hasil : " + hasil);

        this.list_detailshift[i].break_duration_h = hasil / 60;
        this.list_detailshift[i].break_duration_m = hasil;
      }
      const dataShift = {
        id: this.shift_id,
        name: this.shift_name,
        switchable: this.switchable,
        shiftDetail: this.list_detailshift,
      };
      console.log(dataShift);
      if (this.getDataShift == null) {
        this.actionSaveShift(dataShift);
      } else {
        this.actionUpdateShift(dataShift);
        console.log("====");
        console.log(dataShift);
        for (var i = 0; i < dataShift.shiftDetail.length; i++) {
          var shiftDetail = dataShift.shiftDetail[i];
          this.actionUpdateDetailShift(shiftDetail);
        }
      }
      this.close();
    },

    checkTime(hour, minute) {
      if (hour > 23 || minute > 59) {
        return "Format Jam Salah";
      }
      return "";
    },

    close() {
      this.$emit("update:dialogTambahEditShift", false);
      this.$emit("update:getDataShift", null);
      this.shift_id = null;
      this.shift_name = null;
      this.switchable = false;
      this.selected_schedule = null;
      this.list_detailshift = [];
      this.check_in = "";
      this.check_out = "";
      this.start_for_break = "";
      this.end_for_break = "";
      this.start_for_left = "";
      this.end_for_left = "";
      this.arrive_home = "";
      this.multiLine = false;
      this.snackbar = false;
      this.notif_text = "";
    },
  },

  watch: {
    getDataShift: {
      handler() {
        //tambah shift
        if (this.getDataShift != null) {
          if (this.getDataShift == "tambah") {
            for (var i = 0; i < this.label_day.length; i++) {
              const shift = {
                active: false, //0 & 1
                break_duration_h: null, //1 atau 1.5 jam
                break_duration_m: null, //satuan menit konversi break_duration_h
                break_hours: null, //hasil join start-break dan end-break
                days: i + 1,
                start: null,
                start_break: null,
                end_break: null,
                end: null,
                is_flexible: null, //0 & 1
                work_hours: null, //hasil join start dan end
              };
              this.list_detailshift.push(shift);
            }
          } else {
            this.shift_id = this.getDataShift.id;
            this.shift_name = this.getDataShift.name;
            this.switchable = 1;
            this.list_detailshift = this.getDataShift.detailShift;
            var is_flexible = this.getDataShift.detailShift[0].is_flexible;
            this.selected_schedule = this.schedules[is_flexible];
            console.log(this.list_detailshift);
            this.list_detailshift = this.list_detailshift
              .map((item) => item)
              .sort((a, b) => a.days - b.days);
            console.log(this.list_detailshift);
          }
        }
      },
    },
  },
};
</script>