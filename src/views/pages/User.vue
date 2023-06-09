<template>
  <v-container class="pa-8" fluid>
    <form-user
      :dialogForm.sync="dialogForm"
      :dataUser.sync="user"
    />
    <hapus-user
      :dialogHapusUser.sync="dialogHapusUser"
      :user.sync="user"
    />
    <ganti-password
      :dialogGantiPassword.sync="dialogGantiPassword"
      :user.sync="user"
    />
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
            <v-col class="text-right py-0"> 
              <v-btn
                @click="addFunction"
                color="error elevation-0"
                class="my-3 icon-box"
              >
                <v-icon color="white">mdi-plus</v-icon> Tambah
              </v-btn>
            </v-col>
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
                      @click="openEdit(item)"
                      ><v-icon color="white">mdi-cog-outline</v-icon></v-btn
                    >
                    <v-btn
                      color="red"
                      class="elevation-0"
                      dark
                      small
                      @click="openDelete(item)"
                      ><v-icon color="white">mdi-delete-alert</v-icon></v-btn
                    >
                    <v-btn
                      color="blue"
                      class="elevation-0"
                      dark
                      small
                      @click="openGantiPassword(item)"
                      ><v-icon color="white">mdi-lock-reset</v-icon></v-btn
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
import FormUser from '@/views/components/FormUser.vue';
import HapusUser from '@/views/components/HapusUser.vue';
import GantiPassword from '@/views/components/GantiPassword.vue';
export default {
  data() {
    return {
      dialogForm: false,
      dialogHapusUser:false,
      dialogGantiPassword : false,
      user:{},
      headers: [
        { text: "Nama User", value: "nama" },
        { text: "Email", value: "email" },
        { text: "Role", value: "role" },
        { text: "Pilihan", value: "action" },
      ],
    };
  },
  components : {FormUser, HapusUser, GantiPassword},
  created(){
    this.actionGetDataUsers()
  },
  watch:{},
  methods : {
    ...mapActions([
        'actionGetDataUsers'
    ]),
    addFunction() {
      this.dialogForm = true;
      this.employee = {};
    },
    openEdit(emp) {
      if(emp != null){
        // console.log(emp)
        this.user = emp
        this.dialogForm = true;
      }
      
    },
    openDelete(emp){
      if(emp != null){
        // console.log(emp)
        this.user = emp
        this.dialogHapusUser = true;
      }
    },
    openGantiPassword(emp){
      if(emp != null){
        // console.log(emp)
        this.user = emp
        this.dialogGantiPassword = true;
      }
    }
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