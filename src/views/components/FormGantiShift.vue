<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogGantiShift" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="this.selectAttendance != null" class="headline"
            >Form Ganti Jadwal
            {{ label_days[this.selectAttendance.week_of_day - 1] }}</span
          >
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  color="grey darken-2"
                  label="Nama Shift Sekarang"
                  :value="current_shiftName"
                  readonly
                  required
                ></v-text-field>
                <v-text-field
                  color="grey darken-2"
                  label="Detail Shift Sekarang"
                  :value="current_detailShift"
                  readonly
                  required
                ></v-text-field>
                <v-autocomplete
                  v-model.trim="selected_shift"
                  :items="getAllDataShift"
                  color="white"
                  item-text="name"
                  label="Edit Shift"
                  return-object
                ></v-autocomplete>
                <v-text-field
                  color="grey darken-2"
                  label="Detail Shift Baru"
                  :value="
                    selected_shift != null
                      ? selected_shift.detailShift[0].work_hours
                      : ''
                  "
                  readonly
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click.native="close">Batal</v-btn>
          <v-btn color="blue darken-1" @click="update">Ya</v-btn>
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
export default {
  name: "FormGantiShift",
  props: {
    dialogGantiShift: {
      default: false,
    },
    selectAttendance: null,
  },
  data() {
    return {
      label_days: [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu",
      ],
      selected_shift: null,
      current_shiftName: null,
      current_detailShift: null,
      new_detailShift: null,
      multiLine: false,
      snackbar: false,
      notif_text: "",
    };
  },
  methods: {
    ...mapActions([
      "updateIjin",
      "actionGetAllShiftByDays",
      "actionSwitchShift",
    ]),
    update() {
      if (this.selected_shift == null) {
        this.snackbar = true;
        this.notif_text = "Pilih Data Shift!";
        return;
      }
      const data = {
        attendance_id: this.selectAttendance.id,
        shift_id: this.selected_shift.id,
        detail_shift_id: this.selected_shift.detailShift[0].id,
      };
      // console.log(data);
      this.actionSwitchShift(data);
      this.close();
    },

    close() {
      this.$emit("update:dialogGantiShift", false);
      this.selected_shift = null;
      this.current_shiftName = null;
      this.current_detailShift = null;
      this.new_detailShift = null;
    },
  },

  computed: {
    ...mapGetters(["getAllDataShift"]),
  },

  watch: {
    dialogGantiShift: {
      handler() {
        // console.log(this.selectAttendance);
        if (this.dialogGantiShift) {
          if (this.selectAttendance != null) {
            this.current_shiftName = this.selectAttendance.shift.name;
            const param = new URLSearchParams();
            param.append("filter","switchable||$eq||1");
            param.append(
              "filter",
              "detailShift.days||$eq||" + this.selectAttendance.week_of_day
            );
            param.append("join", "detailShift");
            this.actionGetAllShiftByDays(param);
          }
        }
      },
    },

    getAllDataShift: {
      handler() {
        var shiftId = this.selectAttendance.shift.id;
        for (var i = 0; i < this.getAllDataShift.length; i++) {
          var dataShift = this.getAllDataShift[i];
          if (dataShift.id == shiftId) {
            this.current_detailShift = dataShift.detailShift[0].work_hours;
            break;
          }
        }
      },
    },
  },
};
</script>
      
      <style>
</style>