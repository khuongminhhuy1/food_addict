<template>
 <div>
  <form action="" @submit.prevent = "register">
    <label for="name">Name</label>
    <input type="name" required v-model="name" />
    <label for="email">Email</label>
    <input type="email" required v-model="email" />
    <label for="password">Password</label>
    <input type="password" required v-model="password" />
  </form>
 </div>
</template>

<script>
import { register } from '../../api/auth.js';
export default {
  data() {
    return {
      name: "",
      email: "",
      password:"",
    };
  },
  methods:{
    async register() {
      try {
        const res = await register(this.name, this.email, this.password)
        this.$emit('Register Success , Please confirm your email' , res.data.username)
      } catch (error) {
        alert('Register failed' + (error.res ? error.res.data.message : error.message))
      }
    }
  }
};
</script>
