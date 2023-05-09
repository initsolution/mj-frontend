<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogArea" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span v-if="type == 'add'" headline>Tambah Bagian</span>
          <span v-else-if="type == 'update'" headline>Ubah Bagian</span>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nama Bagian"
                  v-model.trim="getDataArea.name"
                  required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-4 px-8 py-4 d-flex flex-row">
          <v-btn
            v-if="type == 'add'"
            min-width="100"
            class="elevation-0"
            color="primary"
            dark
            @click="addArea"
            >Tambah</v-btn
          >
          <v-btn
            v-if="type == 'update'"
            min-width="100"
            class="elevation-0"
            color="primary"
            dark
            @click="updateArea"
            >Ubah</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
  
  <script>
import { mapActions } from 'vuex';
export default {
  name: 'TambahEditArea',
  props: {
    dialogArea: {
      default: false,
    },
    getDataArea: {},
    type: null,
    departemenId: null,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(['actionUpdateArea', 'actionSaveArea']),
    addArea() {
      const data = {
        name: this.getDataArea.name,
        department: {
          id: this.departemenId,
        },
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
      this.$emit('update:dialogArea', false);
      //   this.$emit("update:getDataArea", {});
      //   this.$emit("update:type", null);
    },
  },
};
</script>
  
  <style>
</style>