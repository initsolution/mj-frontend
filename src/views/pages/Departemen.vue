<template>
  <v-container class="pa-8" fluid>
    <UpdateDepartemen
      :dialogUpdateDepartemen.sync="dialogUpdateDepartemen"
      :getDataDepartemen="getDataDepartemen"
    />

    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-calendar-check</v-icon>
                <div>Data Departemen</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
        </div>
        <v-divider class="my-3"></v-divider>
        <v-card class="mx-auto" tile>
          <v-card-text>
            <v-row>
              <v-col>
                <v-combobox
                  v-model="select"
                  :items="label_departemen"
                  label="Pilih Departemen"
                  outlined
                  dense
                >
                </v-combobox>
              </v-col>
              <v-col>
                <v-btn
                  color="blue"
                  class="elevation-0"
                  dark
                  @click="editDepartemen()"
                  >Edit
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
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row v-if="this.selected_item != null">
              <v-col>
                <div class="black--text">Nama</div>
              </v-col>
              <v-col>
                <div class="black--text">Periode Penggajian</div>
              </v-col>
              <v-col>
                <div class="black--text">UMR</div>
              </v-col>
              <v-col>
                <div class="black--text">Jumlah Area</div>
              </v-col>
            </v-row>
            <v-row v-if="this.selected_item != null">
              <v-col>
                <span v-if="this.selected_item != null">{{
                  this.selected_item.name
                }}</span>
              </v-col>
              <v-col>
                <span>-</span>
              </v-col>
              <v-col>
                <span v-if="this.selected_item != null">Rp.{{
                  this.formatPrice(this.selected_item.umr)
                }}</span>
              </v-col>
              <v-col>
                <span>0</span>
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-card-text>
            <v-data-table
              :headers="this.headers"
              :items="getDataAllDepartement"
              class="elevation-1"
            >
              <template v-slot:[`item.umr`]="{ item }">
                Rp. {{ formatPrice(item.umr) }}
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-btn
                  color="blue"
                  class="elevation-0"
                  dark
                  small
                  @click="openDetail(item)"
                  >Edit</v-btn
                >
              </template>
            </v-data-table>
          </v-card-text> -->
        </v-card>
      </v-col>
    </v-row>
    <!-- <DetailShift></DetailShift> -->
    <div v-if="this.selected_item != null"><DetailShift></DetailShift></div>
    <div v-if="this.selected_item != null"><DetailArea></DetailArea></div>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatPrice } from "@/utils/utils";
import UpdateDepartemen from "@/views/components/UpdateDepartemen.vue";
import DetailShift from "./DetailShift.vue";
import DetailArea from "./DetailArea.vue";

export default {
  name: "Departemen",
  components: {
    UpdateDepartemen,
    DetailShift,
    DetailArea,
  },
  data() {
    return {
      dialogUpdateDepartemen: false,
      getDataDepartemen: {},
      headers: [
        { text: "Nama Departemen", value: "name", width: "40%" },
        { text: "UMR", value: "umr", width: "40%" },
        { text: "Pilihan", value: "action", width: "20%" },
      ],
      label_departemen: [],
      selected_item: null,
      multiLine: false,
      snackbar: false,
      notif_text: "",
    };
  },

  created() {
    this.actionGetAllDepartment();
  },

  methods: {
    ...mapActions(["actionGetAllDepartment"]),
    formatPrice(value) {
      return formatPrice(value);
    },

    addDepartemen() {},

    openDetail(item) {
      console.log(item.id);
      this.getDataDepartemen = item;
      this.dialogUpdateDepartemen = true;
    },

    editDepartemen() {
      if (this.selected_item == null) {
        this.snackbar = true;
        this.notif_text = "Pilih Data Departemen!"
        return;
      }
      this.getDataDepartemen = this.selected_item;
      this.dialogUpdateDepartemen = true;
    },
  },

  computed: {
    ...mapGetters(["getDataAllDepartement"]),
    select: {
      get: function () {},
      // setter
      set: function (newValue) {
        console.log("new value : " + newValue.value[0].name);
        this.selected_item = newValue.value[0];
      },
    },
  },

  watch: {
    //untuk refresh data pada tabel jika di close
    dialogUpdateDepartemen: {
      handler() {
        if (!this.dialogUpdateDepartemen) {
          this.actionGetAllDepartment();
        }
      },
    },

    getDataAllDepartement: {
      handler() {
        for (var i = 0; i < this.getDataAllDepartement.length; i++) {
          this.label_departemen = [
            {
              text: this.getDataAllDepartement[i].name,
              value: this.getDataAllDepartement,
            },
          ];
        }
      },
    },
  },
};
</script>
