<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogGeneratePayslip" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          Form Payslip
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span>Apakah anda ingin membuat Payslip ?</span>
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
            dark
            @click.native="close"
            >Batal</v-btn
          >
          <v-btn
            min-width="100"
            class="elevation-0"
            color="primary"
            @click="generatePayslip"
            >Ya</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
        
        <script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'FormGantiShift',
  props: {
    dialogGeneratePayslip: {
      default: false,
    },
    departementId: null,
    dataPayslip: null,
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions([
      'savePayslip',
      'savePayslipCs',
      'savePayslipBulananOffice',
      'savePayslipOwner',
    ]),
    generatePayslip() {
      // console.log(this.departementId);
      // console.log(this.dataPayslip);
      if (this.departementId == 1) {
        this.savePayslip(this.dataPayslip);
      } else if (
        this.departementId == 2 ||
        this.departementId == 4 ||
        this.departementId == 5
      ) {
        this.savePayslipBulananOffice(this.dataPayslip);
        // console.log("bulanan - office - office semarang")
        // console.log(this.dataPayslip)
      } else if (this.departementId == 3) {
        this.savePayslipCs(this.dataPayslip);
      } else if (this.departementId == 10) {
        console.log(this.dataPayslip);
        this.savePayslipOwner(this.dataPayslip);
      }
      this.close();
    },

    close() {
      this.$emit('update:dialogGeneratePayslip', false);
      this.selected_shift = null;
      this.current_shiftName = null;
      this.current_detailShift = null;
      this.new_detailShift = null;
    },
  },
};
</script>
        
        <style>
</style>