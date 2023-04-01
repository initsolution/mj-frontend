<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogGeneratePayslip" persistent max-width="600px">
      <v-card>
        <v-card-title> Form Payslip </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <span>Apakah anda ingin membuat Payslip ?</span>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click.native="close">Batal</v-btn>
          <v-btn color="blue darken-1" @click="generatePayslip">Ya</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
        
        <script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "FormGantiShift",
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
    ...mapActions(["savePayslip", "savePayslipCs", "savePayslipBulananOffice"]),
    generatePayslip() {
      console.log(this.departementId);
      console.log(this.dataPayslip);
      if (this.departementId == 1) {
        this.savePayslip(this.dataPayslip);
      } else if (this.departementId == 2) {
        // this.savePayslipBulananOffice(data)
        console.log("bulanan - office")
        console.log(this.dataPayslip)
      } else if (this.departementId == 3) {
        this.savePayslipCs(this.dataPayslip);
      }
      this.close();
    },

    close() {
      this.$emit("update:dialogGeneratePayslip", false);
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