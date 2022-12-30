<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="4">
        <v-btn @click="printPayslip" class="mt-3"> Print PaySlip </v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>
      
  <script>
import { mapActions, mapGetters } from "vuex";
import { jsPDF } from "jspdf";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["savePayslip", "actionGetPayslip"]),
    printPayslip() {
      const doc = new jsPDF();

      doc.text("Hello world!", 10, 10);
      doc.save("a4.pdf");
    },
  },

  computed: {
    ...mapGetters(["getDataAllPayslip", "getStatusPayslip"]),
  },
};
</script>
      
      <style>
</style>