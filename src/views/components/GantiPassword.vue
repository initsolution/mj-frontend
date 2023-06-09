<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogGantiPassword" persistent max-width="600px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <span class="headline">Ganti Password {{ nama }}</span>
          <v-icon @click="closeForm">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
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
            @click="changePasswordUser"
          >
            Ganti
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  name: "GantiPassword",
  props: {
    dialogGantiPassword: {
      default: false,
    },
    user: {},
  },
  validations: {
    password: {
      required,
    },
  },
  data() {
    return {
      id: null,
      nama: null,
      email: null,
      role: null,
      password: null,
    };
  },
  methods: {
    ...mapActions(["actionUpdateUsers"]),
    closeForm() {
      this.nama = null;
      this.password = null;
      this.role = null;
      this.email = null;
      this.$emit("update:user", {});
      this.$emit("update:dialogGantiPassword", false);
      this.$v.$reset();
    },
    changePasswordUser() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("invalid");
        return;
      }
      let userUpdate = {
        id: this.id,
        password: this.password,
      };
      this.actionUpdateUsers(userUpdate);
      this.closeForm();
    },
  },
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      // !this.$v.password.maxLength && errors.push("Panjang Nama Max 50 Karakter");
      !this.$v.password.required && errors.push("Password harus diisi.");
      return errors;
    },
  },
  watch: {
    user: {
      handler() {
        this.id = this.user.id;
        this.nama = this.user.nama;
        this.email = this.user.email;
        this.role = this.user.role;
      },
    },
  },
};
</script>

<style>
</style>