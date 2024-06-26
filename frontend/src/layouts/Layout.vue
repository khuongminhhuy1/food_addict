<template>
  <div class="">
    <Header @login-success="handleLoginSuccess" />
    <main class="p-4 w-full">
      <div class="w-full flex flex-col justify-center items-center">
        <div class="w-10/12">
          <slot name="body"></slot>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script >
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'Layout',
  components: {
    Header,
    Footer
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
}

</script>