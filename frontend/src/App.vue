<template>
    <div id="app">
      <Header @login-success="handleLoginSuccess" />
      <Welcome v-if="isAuthenticated" :email="email" @logout="handleLogout" />
    </div>
  </template>
  
  <script>
  import Header from './layouts/Header.vue'
  import Welcome from './components/user/Welcome.vue';

  
  export default {
    components: {
      Header,
      Welcome,
    },
    data() {
      return {
        isAuthenticated: false,
        email: '',
      };
    },
    methods: {
      handleLoginSuccess(email) {
        this.email = email;
        this.isAuthenticated = true;
      },
      handleLogout() {
        this.email = '';
        this.isAuthenticated = false;
      },
    },
  };
  </script>
  