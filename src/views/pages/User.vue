<template>
  <v-container class="pa-8" fluid>
    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-account</v-icon>
                <div>Data User</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <div>
                <v-data-table :headers="headers" :items="getAllData">
                  <template v-slot:[`item.sisa_pinjaman`]="{ item }">
                    {{ checkLoan(item.loan) }}
                  </template>
                  <template v-slot:[`item.action`]="{ item }">
                    <v-btn
                      color="blue"
                      class="elevation-0"
                      dark
                      small
                      @click="openDetail(item)"
                      >Detail</v-btn
                    >
                  </template>
                </v-data-table>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      headers: [
        { text: "Nama User", value: "nama" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "Pilihan", value: "action" },
      ],
    };
  },
  created(){
    this.actionGetDataUsers()
  },
  watch:{},
  methods : {
    ...mapActions([
        'actionGetDataUsers'
    ]),
    
    openDetail(emp) {
      console.log(emp)
    },
  },
  computed:{
    ...mapGetters(['getDataUsers']),
    getAllData() {
      return this.getDataUsers
    },
  }
};
</script>

<style>
</style>