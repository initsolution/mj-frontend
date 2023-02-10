<!-- eslint-disable vue/no-mutating-props -->
<template>
    <v-layout row justify-center>
      <v-dialog v-model="dialogIjin" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Form Ijin</span>
          </v-card-title>
  
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <span
                    >Apakah anda yakin untuk tetapkan sebagai izin?</span
                  >
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red darken-1" @click.native="close">Batal</v-btn>
            <v-btn color="blue darken-1" @click="update">Ya</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </template>
      
      <script>
  import { mapActions } from "vuex";
  export default {
    name: "FormIjin",
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
      ...mapActions(["updateIjin"]),
      update() {
        const data = {
            id : this.idEmployee,
            status_shift : "ijin"
        };
        this.updateIjin(data);
        this.close();
      },
  
      close() {
        this.$emit("update:dialogIjin", false);
      },
    },

  };
  </script>
      
      <style>
  </style>