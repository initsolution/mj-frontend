<template>
  <v-container>
    <div>
      <v-menu
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on" large class="elevation-0 mr-3">
            <span>Pilih Bulan</span>
            <v-icon small class="ml-2">mdi-calendar</v-icon>
          </v-btn>
        </template>
        <v-date-picker v-model="getMonth" type="month" @input="getPengeluaranMonth()"></v-date-picker>
      </v-menu>
    </div>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      getMonth: null,
      startDate: null,
    };
  },
  watch: {
    startDate: {
      handler() {
        this.getPengeluaranMonth();
      },
    },
  },
  methods: {
    getPengeluaranMonth() {
      console.log(this.getMonth);
    },
  },
};
</script>