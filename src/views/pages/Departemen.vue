<template>
  <v-container class="pa-8" fluid>
    <div>
      <UpdateDepartemen
        :dialogUpdateDepartemen.sync="dialogUpdateDepartemen"
        :getDataDepartemen="getDataDepartemen"
      />
      <TambahEditArea
        :dialogArea.sync="dialogArea"
        :type="type"
        :departemenId="departemenId"
        :getDataArea="getDetailDataArea"
      ></TambahEditArea>
      <Position
        :dialogPosition.sync="dialogPosition"
        :getDetailDataArea="getDetailDataArea"
      ></Position>

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
                  <v-autocomplete
                    v-model.trim="select"
                    :items="this.getDataAllDepartement"
                    color="white"
                    item-text="name"
                    label="Departemen"
                    return-object
                  ></v-autocomplete>
                </v-col>
                <v-col>
                  <v-btn
                    color="blue"
                    class="elevation-0"
                    dark
                    @click="editDepartemen()"
                    >Ubah
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

              <v-row v-if="this.selected_departemen != null">
                <v-col class="py-0 d-flex flex-row align-start">
                  <v-icon
                    class="mr-3 box-icon blue lighten-5"
                    color="primary lighten-2"
                    >mdi-information</v-icon
                  >
                  <div>
                    <div>UMR</div>
                    <div class="title font-weight-regular black--text">
                      Rp. {{ formatPrice(selected_departemen.umr) }}
                    </div>
                  </div>
                </v-col>

                <v-col class="py-0 d-flex flex-row align-start">
                  <v-icon
                    class="mr-3 box-icon blue lighten-5"
                    color="primary lighten-2"
                    >mdi-calendar</v-icon
                  >
                  <div>
                    <div>Jumlah Bagian</div>
                    <div class="title font-weight-regular black--text">
                      {{ selected_departemen.area.length }}
                    </div>
                  </div>
                </v-col>

                <v-col class="py-0 d-flex flex-row align-start">
                  <v-icon
                    class="mr-3 box-icon blue lighten-5"
                    color="primary lighten-2"
                    >mdi-calendar</v-icon
                  >
                  <div>
                    <div>Tanggal dibuat</div>
                    <div class="title font-weight-regular black--text">
                      {{ formatDate(selected_departemen.created_at) }}
                    </div>
                  </div>
                </v-col>

                <v-col class="py-0 d-flex flex-row align-start">
                  <v-icon
                    class="mr-3 box-icon blue lighten-5"
                    color="primary lighten-2"
                    >mdi-calendar</v-icon
                  >
                  <div>
                    <div>Tanggal Diubah</div>
                    <div class="title font-weight-regular black--text">
                      {{ formatDate(selected_departemen.created_at) }}
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-card class="mx-auto" tile>
        <v-divider class="my-3"></v-divider>
        <v-row class="pb-3">
          <v-col
            class="py-0 d-flex flex-row align-center"
            cols="12"
            sm="12"
            md="12"
            style="margin: 20px"
          >
            <v-icon class="mr-2" small>mdi-information</v-icon>
            <div class="black--text">Detail Bagian</div>
          </v-col>
          <v-col cols="4" class="py-0">
            <v-btn
              style="margin-left: 20px"
              class="elevation-0 my-3"
              @click="addArea()"
              color="blue"
              dark
              >Tambah Bagian</v-btn
            >
          </v-col>
        </v-row>
        <template v-if="selected_departemen != null">
          <div
            :class="{
              'box-icon px-5': true,
              'grey lighten-4': index % 2 !== 0,
            }"
            v-for="(item, index) in selected_departemen.area"
            :key="index"
          >
            <v-row align="center" style="margin: 2px">
              <v-col class="d-flex flex-row">
                <v-icon
                  class="box-icon blue lighten-4 px-3 mr-5"
                  color="blue darken-2"
                  >mdi-calendar</v-icon
                >
                <div>
                  <div style="font-size: 12px; color: grey">Nama Bagian</div>
                  <div class="subtitle-1 black--text">{{ item.name }}</div>
                </div>
              </v-col>
              <v-col>
                <div style="font-size: 12px; color: grey">Jumlah Posisi</div>
                <div class="subtitle-1 black--text">
                  {{ item.position.length }}
                </div>
              </v-col>
              <v-col>
                <div style="font-size: 12px; color: grey">
                  Tanggal Ditambahkan
                </div>
                <div class="subtitle-1 black--text">
                  {{ formatDate(item.created_at) }}
                </div>
              </v-col>
              <v-col>
                <div style="font-size: 12px; color: grey">Tanggal Diubah</div>
                <div class="subtitle-1 black--text">
                  {{ formatDate(item.updated_at) }}
                </div>
              </v-col>
              <v-col cols="1">
                <v-menu
                  class="elevation-10"
                  open-on-hover
                  bottom
                  left
                  transition="slide-y-transition"
                  offset-x
                  :position-y="200"
                >
                  <template v-slot:activator="{ on }">
                    <div v-on="on">
                      <v-icon>mdi-menu</v-icon>
                    </div>
                  </template>

                  <v-list class="py-0">
                    <v-list-item @click="detailPosition(item)">
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon small class="mr-2">mdi-note</v-icon>
                          <span class="font-md">Detail</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="editArea(item)">
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-icon small class="mr-2">mdi-book-edit</v-icon>
                          <span class="font-md">Ubah</span>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-col>
            </v-row>
          </div>
        </template>
      </v-card>
    </div>
    <!-- <DetailShift></DetailShift> -->
    <!-- <div v-if="this.selected_departemen != null">
      <Area :getDataAreaByDepartemen="this.selected_departemen"></Area>
    </div> -->
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatPrice } from "@/utils/utils";
import UpdateDepartemen from "@/views/components/UpdateDepartemen.vue";
import TambahEditArea from "@/views/components/TambahEditArea.vue";
import Position from "@/views/components/Position.vue";
export default {
  name: "Departemen",
  components: {
    UpdateDepartemen,
    TambahEditArea,
    Position,
  },
  data() {
    return {
      dialogUpdateDepartemen: false,
      dialogArea: false,
      dialogPosition: false,
      type: null,
      getDataDepartemen: {},
      headers: [
        { text: "Nama Departemen", value: "name", width: "40%" },
        { text: "UMR", value: "umr", width: "40%" },
        { text: "Pilihan", value: "action", width: "20%" },
      ],
      label_departemen: [],
      selected_departemen: null,
      getDetailDataArea: {},
      multiLine: false,
      snackbar: false,
      notif_text: "",
      departemenId: null,
    };
  },

  created() {
    this.getDataDepartement();
  },

  methods: {
    ...mapActions(["actionGetAllDepartment"]),
    formatPrice(value) {
      return formatPrice(value);
    },

    getDataDepartement() {
      const param = new URLSearchParams();
      param.append("join", "area");
      param.append("join", "area.position");
      this.actionGetAllDepartment(param);
    },

    getUpdateDataDepartemen() {
      if (this.selected_departemen != null) {
        // this.selected_departemen = this.getDataAllDepartement[0];
        for (var i = 0; i < this.getDataAllDepartement.length; i++) {
          if (this.selected_departemen.id == this.getDataAllDepartement[i].id) {
            this.selected_departemen = this.getDataAllDepartement[i];
          }
        }
      }
    },

    openDetail(item) {
      this.getDataDepartemen = item;
      this.dialogUpdateDepartemen = true;
    },

    editDepartemen() {
      if (this.selected_departemen == null) {
        this.snackbar = true;
        this.notif_text = "Pilih Data Departemen!";
        return;
      }
      this.getDataDepartemen = this.selected_departemen;
      this.dialogUpdateDepartemen = true;
    },

    addArea() {
      if (this.selected_departemen == null) {
        this.notif_text = "Pilih Departemen!";
        this.snackbar = true;
        return;
      }
      this.departemenId = this.selected_departemen.id;
      this.type = "add";
      this.dialogArea = true;
      this.getDetailDataArea = {};
    },

    editArea(item) {
      if (this.selected_departemen == null) {
        this.notif_text = "Pilih Departemen!";
        this.snackbar = true;
        return;
      }
      this.departemenId = this.selected_departemen.id;
      this.type = "update";
      this.dialogArea = true;
      this.getDetailDataArea = item;
    },

    detailPosition(item) {
      // console.log(item);
      this.getDetailDataArea = item;
      this.dialogPosition = true;
    },

    formatDate(date) {
      return date.substring(0, 10);
    },
  },

  computed: {
    ...mapGetters([
      "getDataAllDepartement",
      "getStatusDepartement",
      "getStatusArea",
    ]),
    select: {
      get: function () {
        return this.selected_departemen;
      },
      // setter
      set: function (newValue) {
        this.selected_departemen = newValue;
        this.departemenId = newValue.id;
      },
    },
  },

  watch: {
    //untuk refresh data pada tabel jika di close
    dialogUpdateDepartemen: {
      handler() {
        if (!this.dialogUpdateDepartemen) {
          this.getDataDepartement();
        }
      },
    },

    dialogArea: {
      handler() {
        if (!this.dialogArea) {
          this.getDataDepartement();
        }
      },
    },

    dialogPosition: {
      handler() {
        if (!this.dialogPosition) {
          this.getDataDepartement();
        }
      },
    },

    getStatusArea: {
      handler() {
        if (
          this.getStatusArea.status == "Created" ||
          this.getStatusArea.status == "OK"
        ) {
          this.getDataDepartement();
        }
      },
    },

    getStatusDepartement: {
      handler() {
        if (this.getStatusDepartement.status == "OK") {
          this.getDataDepartement();
        }
      },
    },

    getDataAllDepartement: {
      handler() {
        this.getUpdateDataDepartemen();
      },
    },
  },
};
</script>
