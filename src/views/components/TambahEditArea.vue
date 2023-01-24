<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogArea" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="type == 'add'" headline>Tambah Area</span>
          <span v-else-if="type == 'update'" headline>Edit Area</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nama Area"
                  v-model.trim="getDataArea.name"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click.native="close">Tutup</v-btn>
          <v-btn  v-if="type == 'add'" color="blue darken-1" @click="addArea">Tambah</v-btn>
          <v-btn  v-if="type == 'update'" color="blue darken-1" @click="updateArea">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
  
  <script>
import { mapActions } from "vuex";
export default {
  name: "TambahEditArea",
  props: {
    dialogArea: {
      default: false,
    },
    getDataArea: {},
    type: null,
    departemenId : null,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["actionUpdateArea", "actionSaveArea"]),
    addArea() {
      const data = {
        name: this.getDataArea.name,
        department : {
            id : this.departemenId,
        }
      };
      this.actionSaveArea(data);
      this.close();
    },
    updateArea() {
      const data = {
        id: this.getDataArea.id,
        name: this.getDataArea.name,
      };
      this.actionUpdateArea(data);
      this.close();
    },

    close() {
      this.$emit("update:dialogArea", false);
    //   this.$emit("update:getDataArea", {});
    //   this.$emit("update:type", null);
    },
  },
};
</script>
  
  <style>
</style>