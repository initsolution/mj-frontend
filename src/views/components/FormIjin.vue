<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogIjin" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span class="headline">Form Ijin</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span>Apakah Anda yakin untuk tetapkan sebagai izin?</span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-4 px-8 py-4 d-flex flex-row">
          <v-btn
            min-width="100"
            class="elevation-0"
            color="grey darken-1"
            @click.native="close"
            dark
            >Tidak</v-btn
          >
          <v-btn
            min-width="100"
            class="elevation-0"
            color="primary"
            @click="update"
            >Ya</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
      
      <script>
import { mapActions } from 'vuex';
export default {
  name: 'FormIjin',
  props: {
    dialogIjin: {
      default: false,
    },
    idEmployee: null,
  },
  data() {
    return {
      overtime_value: null,
    };
  },
  methods: {
    ...mapActions(['updateIjin']),
    update() {
      const data = {
        id: this.idEmployee,
        status_shift: 'ijin',
      };
      this.updateIjin(data);
      this.close();
    },

    close() {
      this.$emit('update:dialogIjin', false);
    },
  },
};
</script>
      
      <style>
</style>