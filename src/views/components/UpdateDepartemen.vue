<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogUpdateDepartemen" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <div>
            <div>
              <v-icon>mdi-pencil</v-icon>
              Ubah Departemen
            </div>
            <div class="caption ml-8 grey--text darken-3">
              Form mengubah data Departemen
            </div>
          </div>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nama Departemen"
                  v-model.trim="getDataDepartemen.name"
                  required
                />
              </v-col>
              <v-col cols="12">
                <v-currency-field
                  :decimal-length="0"
                  prefix="Rp"
                  filled
                  v-bind="currency_config"
                  v-model.trim="getDataDepartemen.umr"
                  class="currency-input pa-0 ma-0 font-md"
                  label="UMR"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-4 px-8 py-4 d-flex flex-row">
          <v-btn
            min-width="100"
            class="elevation-0"
            color="primary"
            @click="update"
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
  name: 'UpdateDepartemen',
  props: {
    dialogUpdateDepartemen: {
      default: false,
    },
    getDataDepartemen: {},
  },
  data() {
    return {
      currency_config: {
        decimal: ',',
        thousands: '.',
        prefix: 'Rp',
        precision: 0,
        masked: false,
        allowBlank: false,
        min: Number.MIN_SAFE_INTEGER,
        max: Number.MAX_SAFE_INTEGER,
      },
    };
  },
  methods: {
    ...mapActions(['actionUpdateDepartement']),
    update() {
      const data = {
        id: this.getDataDepartemen.id,
        name: this.getDataDepartemen.name,
        umr: this.getDataDepartemen.umr,
      };
      this.actionUpdateDepartement(data);
      this.close();
    },

    close() {
      this.$emit('update:dialogUpdateDepartemen', false);
    },
  },
};
</script>

<style>
</style>