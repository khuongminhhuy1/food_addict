<template>
  <div>
    <h2 class="text-xl mb-4 flex flex-row justify-center">Register</h2>
    <form @submit.prevent="register">
      <div class="mb-4">
        <label for="name"> Name :</label>
        <input type="text" v-model="name" class="input input-bordered w-full" placeholder="Name" required />
      </div>
      <div class="mb-4">
        <label for="email"> Email :</label>
        <input type="email" v-model="email" class="input input-bordered w-full" placeholder="Email" required />
      </div>
      <div class="mb-4">
        <label for="password"> Password :</label>
        <input type="password" v-model="password" class="input input-bordered w-full" placeholder="Password" required />
      </div>
      <div class="mb-4">
        <label for="confirmPassword"> Confirm Password :</label>
        <input type="password" v-model="confirmPassword" placeholder="Confirm Password"
          class="input input-bordered w-full" required />
      </div>
      <div class="mb-4 flex flex-row justify-between items-center">
        <div class="flex flex-row items-center">
          <input type="checkbox" name="agreement" id="agreement" class="checkbox checkbox-primary mr-4"
            v-model="isTermsAccepted">
          <a href="#">I accept the Terms of Service</a>
        </div>
        <button type="submit" class="btn btn-primary w-[140px]" :disabled="!isTermsAccepted">Register</button>
      </div>
    </form>
  </div>
</template>
  
<script>
import { register } from '../../api/auth.js';
import { useToast } from 'vue-toastification';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isTermsAccepted: false,
      attemptedSubmit: false
    };
  },
  methods: {
    async register() {
      this.attemptedSubmit = true;
      const toast = useToast();

      if (this.password !== this.confirmPassword) {
        toast.error('Passwords do not match!');
        return;
      }

      try {
        const res = await register(this.name, this.email, this.password);
        this.$emit('register-success', res.data.name);
      } catch (error) {
        console.log(error)
      }
    }
  }
};
</script>