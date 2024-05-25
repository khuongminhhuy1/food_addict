
<template>
    <div>
      <h2 class="text-xl mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block">Email:</label>
          <input type="email" v-model="email" class="input input-bordered w-full" required />
        </div>
        <div class="mb-4">
          <label for="password" class="block">Password:</label>
          <input type="password" v-model="password" class="input input-bordered w-full" required />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { login } from '../../api/auth.js';
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
     async login() {
      try {
        const res = await login(this.email , this.password);
        this.$emit('Login success', res.data.username)
      } catch (error) {
        alert('Login failed: ' + (error.response ? error.response.data.message : error.message));
      }
     }
    },
  };
  </script>
  