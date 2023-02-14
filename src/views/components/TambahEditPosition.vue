<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogTambahEditPosition" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="type == 'add'" headline>Tambah Jabatan</span>
          <span v-else-if="type == 'update'" headline>Edit Jabatan</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nama Jabatan"
                  v-model.trim="getDataPosition.name"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click="close">Tutup</v-btn>
          <v-btn v-if="type == 'add'" color="blue darken-1" @click="addArea"
            >Tambah</v-btn
          >
          <v-btn
            v-if="type == 'update'"
            color="blue darken-1"
            @click="updateArea"
            >Edit</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
    
    <script>
import { mapActions } from "vuex";
export default {
  name: "TambahEditPosition",
  props: {
    dialogTambahEditPosition: {
      default: false,
    },
    getDataPosition: {},
    type: null,
    areaId: null,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["actionUpdatePosition", "actionSavePosition"]),
    addArea() {
      const data = {
        name: this.getDataPosition.name,
        area: {
          id: this.areaId,
        },
      };
      // console.log(data);
      this.actionSavePosition(data);
      this.close();
    },
    updateArea() {
      const data = {
        id: this.getDataPosition.id,
        name: this.getDataPosition.name,
      };
      // console.log(data);
      this.actionUpdatePosition(data);
      this.close();
    },

    close() {
      this.$emit("update:dialogTambahEditPosition", false);
      //   this.$emit("update:getDataPosition", {});
      //   this.$emit("update:type", null);
    },
  },
};
</script>
    
    <style>
</style>