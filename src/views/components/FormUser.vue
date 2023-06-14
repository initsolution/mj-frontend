<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogForm" max-width="1000">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <div>
            <div>
              <v-icon>{{
                dataUser.id != null ? "mdi-account-edit" : "mdi-account-plus"
              }}</v-icon>
              {{ dataUser.id != null ? "Ubah" : "Tambah" }} User
              {{ id }}
            </div>
            <div class="caption ml-8 grey--text darken-3">
              Form
              {{ dataUser.id != null ? "mengubah" : "menambahkan" }} data user
            </div>
          </div>
          <v-icon @click="closeForm">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-form ref="form">
            <div
              class="font-sm grey--text grey lighten-4 px-3 py-1 mb-3 mt-6 round"
            >
              Data User
            </div>
            <v-row>
              <v-col class="py-0" cols="6">
                <v-text-field
                  color="grey darken-2"
                  v-model.trim="nama"
                  label="Nama Lengkap*"
                  :error-messages="namaErrors"
                  :counter="100"
                  @input="$v.nama.$touch()"
                  @blur="$v.nama.$touch()"
                  required
                ></v-text-field>
              </v-col>
              <v-col class="py-0" cols="6">
                <v-text-field
                  color="grey darken-2"
                  v-model.trim="email"
                  label="Email*"
                  :error-messages="emailErrors"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="py-0" cols="7">
                <div v-if="dataUser.id != null"></div>
                <div v-else>
                  <v-text-field
                    color="grey darken-2"
                    v-model.trim="password"
                    label="Password*"
                    type="password"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                    required
                  ></v-text-field>
                </div>
              </v-col>
              <div v-if="isOwner">
                <v-col class="py-0" cols="5">
                  <v-select
                    :items="userRole"
                    v-model.trim="role"
                    label="Role"
                  ></v-select>
                </v-col>
              </div>
            </v-row>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-4 px-8 py-4 d-flex flex-row">
          <v-btn
            min-width="100"
            class="elevation-0"
            color="grey darken-1"
            dark
            @click.native="closeForm"
            >Tutup</v-btn
          >
          <v-btn
            min-width="100"
            class="elevation-0"
            color="primary"
            @click="save"
            >{{ dataUser.id != null ? "Ubah" : "Simpan" }}</v-btn
          >

          <div class="caption grey--text lighten-2 ml-5">
            Sebelum submit silahkan cek kembali inputan anda
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  email,
} from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      id: null,
      nama: null,
      email: null,
      role: "admin",
      password: null,
    };
  },
  validations: {
    nama: {
      required,
      maxLength: maxLength(100),
    },
    email: {
      email,
      required,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions(["actionUpdateUsers", "actionInsertUsers"]),
    closeForm() {
      this.nama = null;
      this.password = null;
      this.role = null;
      this.email = null;
      this.$emit("update:dataUser", {});
      this.$emit("update:dialogForm", false);
      this.$v.$reset();
    },
    save() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("invalid");
        return;
      }

      let newUser = {
        nama: this.nama,
        password: this.password,
        role: this.role,
        email: this.email,
      };
      if (this.dataUser.id != null) {
        //update
        delete newUser.password;
        newUser.id = this.dataUser.id;
        this.actionUpdateUsers(newUser);
      } else {
        this.actionInsertUsers(newUser);
      }
      // console.log(newUser);
      // if (this.dataEmployee.id != null) {
      //   // console.log(this.employee);
      //   this.actionUpdateEmployee(newEmployee);
      // } else {
      //   this.actionSaveEmployee(newEmployee);
      // }

      this.closeForm();
    },
  },
  computed: {
    namaErrors() {
      const errors = [];
      if (!this.$v.nama.$dirty) return errors;
      !this.$v.nama.maxLength && errors.push("Panjang Nama Max 50 Karakter");
      !this.$v.nama.required && errors.push("Nama harus diisi.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Email tidak sesuai format");
      !this.$v.email.required && errors.push("Email harus diisi.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // !this.$v.password.maxLength && errors.push("Panjang Nama Max 50 Karakter");
      !this.$v.password.required && errors.push("Password harus diisi.");
      return errors;
    },
  },
  props: {
    userRole: {
      type: Array,
      default() {
        return ["owner", "admin", "operator"];
      },
    },
    dialogForm: {
      default: false,
    },
    dataUser: {},
    isOwner: true,
  },
  watch: {
    dataUser: {
      handler() {
        this.id = this.dataUser.id;
        this.nama = this.dataUser.nama;
        this.email = this.dataUser.email;
        this.role = this.dataUser.role;
        this.password = "-";
      },
    },
  },
};
</script>

<style>
</style>