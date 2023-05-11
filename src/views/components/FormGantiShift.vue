<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogGantiShift" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span v-if="this.selectAttendance != null" class="headline"
            >Form Ganti Jadwal
            {{ label_days[this.selectAttendance.week_of_day - 1] }}</span
          >
        </v-card-title>
        <v-divider></v-divider>
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
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-4 px-8 py-4 d-flex flex-row">
          <v-btn
            min-width="100"
            class="elevation-0"
            color="grey darken-1"
            @click.native="close"
            dark
            >Tidak</v-btn
          >
          <v-btn
            min-width="100"
            class="elevation-0"
            color="primary"
            @click="update"
            >Ya</v-btn
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
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'FormGantiShift',
  props: {
    dialogGantiShift: {
      default: false,
    },
    selectAttendance: null,
    departementId: null,
  },
  data() {
    return {
      label_days: [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
      ],
      selected_shift: null,
      current_shiftName: null,
      current_detailShift: null,
      new_detailShift: null,
      multiLine: false,
      snackbar: false,
      notif_text: '',
    };
  },
  methods: {
    ...mapActions([
      'updateIjin',
      'actionGetAllShiftByDays',
      'actionSwitchShiftCs',
      'actionSwitchShiftBulanan',
    ]),
    update() {
      if (this.selected_shift == null) {
        this.snackbar = true;
        this.notif_text = 'Pilih Data Shift!';
        return;
      }
      const data = {
        attendance_id: this.selectAttendance.id,
        shift_id: this.selected_shift.id,
        detail_shift_id: this.selected_shift.detailShift[0].id,
      };
      // console.log(data);
      if (this.departementId == 1) {
      } else if (this.departementId == 2) {
        this.actionSwitchShiftBulanan(data);
      } else if (this.departementId == 3) {
        this.actionSwitchShiftCs(data);
      }
      this.close();
    },

    close() {
      this.$emit('update:dialogGantiShift', false);
      this.selected_shift = null;
      this.current_shiftName = null;
      this.current_detailShift = null;
      this.new_detailShift = null;
    },
  },

  computed: {
    ...mapGetters(['getAllDataShift']),
  },

  watch: {
    dialogGantiShift: {
      handler() {
        // console.log(this.selectAttendance);
        if (this.dialogGantiShift) {
          if (this.selectAttendance != null) {
            this.current_shiftName = this.selectAttendance.shift.name;
            const param = new URLSearchParams();
            param.append('filter', 'switchable||$eq||1');
            param.append(
              'filter',
              'detailShift.days||$eq||' + this.selectAttendance.week_of_day,
            );
            param.append('join', 'detailShift');
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