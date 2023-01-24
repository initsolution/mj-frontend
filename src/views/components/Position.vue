<template>
  <div fluid class="mt-4">
    <TambahEditPosition
      :dialogPosition.sync="dialogPosition"
      :getDataPosition="selected_position"
      :areaId="areaId"
      :type="type"
    />
    <v-row>
      <v-col class="py-0">
        <v-card class="round relative card-detail elevation-1">
          <v-card-text>
            <div class="title">Position</div>
          </v-card-text>
          <v-card-text>
            <v-row>
              <v-col
                ><v-autocomplete
                  v-model.trim="selected_position"
                  :items="this.getDataAllPosition"
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
                    @click="updatePosition()"
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
                    @click="addPosition()"
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import TambahEditPosition from "@/views/components/TambahEditPosition.vue";
export default {
  name: "Position",
  components: {
    TambahEditPosition,
  },
  props: {
    getDataPositionByArea: null,
  },
  data() {
    return {
      dialogPosition: false,
      areaId: null,
      selected_position: {},
      type: null,
      multiLine: false,
      snackbar: false,
      notif_text: "",
    };
  },

  created() {
    this.getAllPositionByAreaId();
  },

  methods: {
    ...mapActions(["actionGetAllPositionByAreaId"]),
    getAllPositionByAreaId() {
      if (this.getDataPositionByArea != null) {
        this.areaId = this.getDataPositionByArea.id;
        const param = new URLSearchParams();
        param.append("join", "area");
        param.append("filter", "area.id||$eq||" + this.areaId);
        this.actionGetAllPositionByAreaId(param);
        this.selected_position = {};
      }
    },

    updatePosition() {
      if (this.selected_position.id == null) {
        this.snackbar = true;
        this.notif_text = "Pilih Data Position!";
        return;
      }
      this.type = "update";
      this.dialogPosition = true;
    },

    addPosition() {
      this.selected_position = {};
      this.type = "add";
      this.dialogPosition = true;
      this.areaId = this.getDataPositionByArea.id;
    },
  },

  computed: {
    ...mapGetters(["getDataAllPosition", "getStatusPosition"]),
  },

  watch: {
    getDataPositionByArea: {
      handler() {
        this.getAllPositionByAreaId();
      },
    },
    getStatusPosition: {
      handler() {
        this.getAllPositionByAreaId();
      },
    },
  },
};
</script>