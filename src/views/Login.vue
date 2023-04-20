<template>
  <v-app>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md3>
        <!-- <div style="text-align: center"><img :src="logo" width="80px" /></div> -->
        <v-card outlined class="pa-8">
          <v-card-title>Login</v-card-title>
          <v-divider />
          <v-card-text>
            <v-text-field label="Email" v-model.trim="username" />
            <v-text-field
              label="Password"
              type="Password"
              v-model.trim="password"
              @keydown.enter.prevent="login"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="deep-purple" tile @click="login" block dark>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data: () => {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    ...mapActions(['actionLogin']),
    async login(e) {
      e.preventDefault();
      const data = {
        email: this.username,
        password: this.password,
      };
      console.log(data);
      this.actionLogin(data);
    },

    errorMessage(text, title, status) {
      const icon = status == 'error' ? 'error' : 'success';
      this.$swal({
        title: title,
        text: text,
        icon: icon,
      });
    },
  },

  computed: {
    ...mapGetters(['getAuthLogin']),
  },

  watch: {
    getAuthLogin: {
      handler() {
        const res = this.getAuthLogin;
        console.log(res);
        if (res.statusCode == '202') {
          console.log('login');
          //go to Dashboard
          //   this.setToken(res.message);
          // this.$store.commit('SET_TOKEN', res);
          this.$router.push('/').catch(() => {
            console.log('Error');
          });
        } else {
          //retry login / notif login gagal
          this.errorMessage(res.message, 'Login Gagal', 'error');
        }
      },
    },
  },
};
</script>