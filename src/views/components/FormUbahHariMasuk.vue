<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogUbahHariMasuk" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span headline>Ubah Hari Masuk</span>
          <v-icon @click="close">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="nHari" label="Hari" required />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Jam" v-model.trim="nJam" required />
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
            dark
            @click="ubahHariMasuk"
            >Ubah</v-btn
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
    dialogUbahHariMasuk: {
      default: false,
    },
    dataPayslip: null,
  },
  data() {
    return {
      nHari: 0,
      nJam: 0,
    };
  },
  methods: {
    ...mapActions(["ubahHariMasukOwner"]),
    ubahHariMasuk() {
      const totalHariMasuk = this.nHari + this.nJam / 8;
      const data = {
        idPayslip: this.dataPayslip.id,
        total_hari_masuk: totalHariMasuk,
      };
      // console.log(data);
      this.ubahHariMasukOwner(data);
      this.close();
    },

    close() {
      this.$emit("update:dialogUbahHariMasuk", false);
      //   this.$emit("update:getDataPosition", {});
      //   this.$emit("update:type", null);
    },
  },

  watch: {
    dialogUbahHariMasuk: {
      handler() {
        if (this.dialogUbahHariMasuk) {
          this.nHari = Math.floor(this.dataPayslip.total_hari_masuk);
          this.nJam = (this.dataPayslip.total_hari_masuk % 1) * 8;
        }
      },
    },
  },
};
</script>
      
      <style>
</style>