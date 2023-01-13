<template>
  <div fluid class="mt-4">
    <v-row>
      <v-col class="py-0">
        <v-card class="round relative card-detail elevation-1">
          <v-card-text>
            <div class="black--text">Shift</div>
            <v-row>
              <v-col>
                <v-combobox
                  :items="label_shift"
                  label="Pilih Shift"
                  outlined
                  dense
                >
                </v-combobox>
              </v-col>

              <v-col>
                <v-row>
                  <v-btn
                    color="blue"
                    class="elevation-0"
                    dark
                    @click="editShift()"
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
                    @click="addShift()"
                    >Add
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
                    @click="deleteShift()"
                    >Del
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
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text>
            <v-data-table :headers="this.headers" class="elevation-1">
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {},
  name: "DetailShift",
  data() {
    return {
      dialogUpdateDepartemen: false,
      headers: [
        { text: "Nama Departemen", value: "name", width: "40%" },
        { text: "UMR", value: "umr", width: "40%" },
        { text: "Pilihan", value: "action", width: "20%" },
      ],
      label_shift: [],
      selected_item: null,
      multiLine: false,
      snackbar: false,
      notif_text: "",
    };
  },

  created() {
    this.actionGetDetailShiftById();
  },

  methods: {
    ...mapActions(["actionGetDetailShiftById"]),
  },
  computed: {
    ...mapGetters(["getAllDataDetailShiftById"]),
  },
};
</script>