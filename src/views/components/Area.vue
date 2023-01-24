<template>
  <div fluid class="mt-4">
    <TambahEditArea
      :dialogArea.sync="dialogArea"
      :getDataArea="selected_area"
      :departemenId="departemenId"
      :type="type"
    />
    <v-row>
      <v-col class="py-0">
        <v-card class="round relative card-detail elevation-1">
          <v-card-text>
            <div class="title">Area</div>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col
                ><v-autocomplete
                  v-model.trim="select"
                  :items="this.getDataAllArea"
                  color="white"
                  item-text="name"
                  label="Area"
                  return-object
                ></v-autocomplete
              ></v-col>
              <v-col>
                <v-row align="center" class="fill-height">
                  <v-btn
                    color="blue"
                    class="elevation-0"
                    dark
                    @click="updateArea()"
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

                  <div class="white--text mx-2"></div>
                  <v-btn
                    color="blue"
                    class="elevation-0"
                    dark
                    @click="addArea()"
                    >Tambah
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div v-if="this.selected_area.id != null" fluid class="mt-4">
      <Position :getDataPositionByArea="this.selected_area"></Position>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TambahEditArea from "@/views/components/TambahEditArea.vue";
import Position from "@/views/components/Position.vue";
export default {
  name: "Area",
  components: {
    TambahEditArea,
    Position,
  },
  props: {
    getDataAreaByDepartemen: null,
  },
  data() {
    return {
      dialogArea: false,
      departemenId: null,
      selected_area: {},
      type: null,
      multiLine: false,
      snackbar: false,
      notif_text: "",
      depaId: null,
      dialogArea: false,
    };
  },

  created() {
    this.getAllAreaByDepartmentId();
  },

  methods: {
    ...mapActions(["actionGetAllAreaByDepartmentId"]),
    getAllAreaByDepartmentId() {
      if (this.getDataAreaByDepartemen != null) {
        this.departemenId = this.getDataAreaByDepartemen.id;
        const param = new URLSearchParams();
        param.append("join", "department");
        param.append("filter", "department.id||$eq||" + this.departemenId);
        this.actionGetAllAreaByDepartmentId(param);
        this.selected_area = {};
      }
    },

    updateArea() {
      if (this.selected_area.id == null) {
        this.snackbar = true;
        this.notif_text = "Pilih Data Area!";
        return;
      }
      this.type = "update";
      this.dialogArea = true;
    },

    addArea() {
      this.selected_area = {};
      this.type = "add";
      this.dialogArea = true;
      this.departemenId = this.getDataAreaByDepartemen.id;
    },
  },

  computed: {
    ...mapGetters(["getDataAllArea", "getStatusArea"]),
    select: {
      get: function () {
        return this.selected_area;
      },
      // setter
      set: function (newValue) {
        this.selected_area = newValue;
        // this.departemenId = newValue.id;
      },
    },
  },

  watch: {
    getDataAreaByDepartemen: {
      handler() {
        this.getAllAreaByDepartmentId();
      },
    },
    getStatusArea :{
      handler() {
        this.getAllAreaByDepartmentId();
      },
    },
  },
};
</script>