<template>
  <v-container class="pa-8" fluid>
    <tambah-edit-shift
      :dialogTambahEditShift.sync="dialogTambahEditShift"
      :getDataShift.sync="getDataShift"
      :type="type"
    >
    </tambah-edit-shift>
    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-calendar-check</v-icon>
                <div>Data Shift</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
        </div>
        <v-divider class="my-6"></v-divider>
        <v-card class="mx-auto" tile>
          <v-card-text>
            <v-row>
              <v-col>
                <v-autocomplete
                  v-model.trim="selected_shift"
                  :items="getAllDataShift"
                  color="white"
                  item-text="name"
                  label="Shift"
                  return-object
                ></v-autocomplete>
              </v-col>

              <v-col>
                <v-row align="center" class="fill-height">
                  <v-btn
                    color="blue"
                    class="elevation-0"
                    dark
                    @click="editShift()"
                  >
                    <v-icon color="white">mdi-pencil</v-icon> Ubah
                  </v-btn>
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

                  <div class="white--text mx-2"></div>
                  <v-btn
                    color="error elevation-0"
                    class="my-3 icon-box"
                    dark
                    @click="addShift()"
                  >
                    <v-icon color="white">mdi-plus</v-icon> Tambah
                  </v-btn>
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
                </v-row>
              </v-col>
            </v-row>
            <div v-if="selected_shift != null">
              <v-divider></v-divider>
              <div class="d-flex flex-row align-center justify-space-between">
                <div class="d-flex flex-row">
                  <v-icon color="grey" class="mr-2" small>mdi-calendar</v-icon>
                  <div class="black--text">Data Jadwal</div>
                </div>
              </div>
              <div
                v-if="
                  detailShift[0].start_break == null ||
                  detailShift[0].end_break == null
                "
              >
                <v-data-table
                  :headers="headers_istirahat_bebas"
                  :sort-by.sync="sortBy"
                  class="elevation-1"
                  :items="detailShift"
                >
                  <template v-slot:[`item.days`]="{ item }"
                    >{{ convertToDay(item.days - 1) }}
                  </template>
                  <template v-slot:[`item.break_duration_m`]="{ item }"
                    >{{ item.break_duration_m }} menit
                  </template>
                  <template v-slot:[`item.start`]="{ item }"
                    >{{ convertTime(item.start) }}
                  </template>
                  <template v-slot:[`item.end`]="{ item }"
                    >{{ convertTime(item.end) }}
                  </template>
                </v-data-table>
              </div>
              <div v-else>
                <v-data-table
                  :headers="headers_istirahat_tetap"
                  :sort-by.sync="sortBy"
                  class="elevation-1"
                  :items="detailShift"
                >
                  <template v-slot:[`item.days`]="{ item }"
                    >{{ convertToDay(item.days - 1) }}
                  </template>
                  <template v-slot:[`item.start`]="{ item }"
                    >{{ convertTime(item.start) }}
                  </template>
                  <template v-slot:[`item.start_break`]="{ item }"
                    >{{ convertTime(item.start_break) }}
                  </template>
                  <template v-slot:[`item.end_break`]="{ item }"
                    >{{ convertTime(item.end_break) }}
                  </template>
                  <template v-slot:[`item.end`]="{ item }"
                    >{{ convertTime(item.end) }}
                  </template>
                </v-data-table>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import TambahEditShift from '@/views/components/TambahEditShift.vue';
export default {
  name: 'Shift',
  components: {
    TambahEditShift,
  },
  data() {
    return {
      getDataShift: null,
      type: null,
      dialogTambahEditShift: false,
      headers_istirahat_tetap: [
        { text: 'Hari', value: 'days' },
        { text: 'Jam Masuk', value: 'start' },
        { text: 'Mulai Istirahat', value: 'start_break' },
        { text: 'Selesai Istirahat', value: 'end_break' },
        { text: 'Jam Pulang', value: 'end' },
      ],
      headers_istirahat_bebas: [
        { text: 'Hari', value: 'days' },
        { text: 'Jam Masuk', value: 'start' },
        { text: 'Durasi Istirahat', value: 'break_duration_m' },
        { text: 'Jam Pulang', value: 'end' },
      ],
      sortBy: 'days',
      label_day: [
        'Minggu',
        'Senin',
        'Selasa',
        'Rabu',
        'Kamis',
        'Jumat',
        'Sabtu',
      ],
      label_shift: [],
      selected_item: null,
      selected_shift: null,
      selected_id: null,
      multiLine: false,
      snackbar: false,
      detailShift: [],
      notif_text: '',
    };
  },

  created() {
    this.actionGetAllShift();
  },

  methods: {
    ...mapActions(['actionGetAllShift']),

    convertToDay(day) {
      return this.label_day[day];
    },

    convertTime(time) {
      return time.substring(0, 5);
    },

    editShift() {
      if (this.selected_shift == null) {
        this.notif_text = 'Pilih Shift dahulu!';
        this.snackbar = true;
        return;
      }
      this.getDataShift = this.selected_shift;
      this.type = 'edit';
      this.dialogTambahEditShift = true;
    },

    addShift() {
      this.getDataShift = {};
      this.type = 'tambah';
      this.dialogTambahEditShift = true;
    },
  },
  computed: {
    ...mapGetters(['getAllDataShift']),
  },

  watch: {
    selected_shift: {
      handler() {
        this.detailShift = [];
        if (this.selected_shift != null) {
          this.selected_id = this.selected_shift.id;
          for (var i = 0; i < this.selected_shift.detailShift.length; i++) {
            this.detailShift.push(this.selected_shift.detailShift[i]);
          }
        }
      },
    },
    getAllDataShift: {
      handler() {
        if (this.selected_shift == null) {
          return;
        }

        for (var i = 0; i < this.getAllDataShift.length; i++) {
          var id = this.getAllDataShift[i].id;
          if (this.selected_id == id) {
            this.selected_shift = this.getAllDataShift[i];
          }
        }
      },
    },
  },
};
</script>
