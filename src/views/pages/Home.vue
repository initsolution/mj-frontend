<template>
  <v-container>
    Hellow I'm Home
    <div class="alert alert-success" role="alert">
      <h2 class="alert-heading">Vue Form Validation Example</h2>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          v-model="userForm.name"
          id="name"
          name="name"
          class="form-control"
          :class="{ 'is-invalid': isSubmitted && $v.userForm.name.$error }"
        />
        <div
          v-if="isSubmitted && !$v.userForm.name.required"
          class="invalid-feedback"
        >
          Name field is required
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-danger btn-block">Register</button>
      </div>
    </form>
  </v-container>
</template>
<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      userForm: {
        name: '',
        email: '',
        mobile: '',
        gender: '',
        password: '',
        confirmPassword: '',
        accept: '',
      },
      isSubmitted: false,
    };
  },
  validations: {
    userForm: {
      name: {
        required,
      },

      accept: {
        required(val) {
          return val;
        },
      },
    },
  },
  methods: {
    handleSubmit() {
      this.isSubmitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }
      alert('SUCCESS!' + JSON.stringify(this.userForm));
    },
  },
};
</script>