<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogLoan" max-width="1000">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex flex-row grey lighten-5 align-center justify-space-between"
        >
          <div>Tambah User</div>
          <v-icon @click="dismisDialog">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
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
              <v-text-field
                color="grey darken-2"
                v-model.trim="password"
                label="Password*"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                required
              ></v-text-field>
            </v-col>
            <v-col class="py-0" cols="5">
              <v-select
                :items="userRole"
                v-model.trim="role"
                label="Role"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {};
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
  },
};
</script>

<style>
</style>