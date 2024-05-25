<template>
  <header class="flex justify-between items-center p-4 bg-gray-800 text-white">
    <h1 class="text-2xl">Vue Login App</h1>
    <button class="btn btn-primary" @click="showModal = true">Login</button>
    <div v-if="showModal" class="modal modal-open">
      <div class="modal-box">
        <LoginForm @login-success="handleLoginSuccess" />
        <div class="modal-action">
          <button class="btn" @click="showModal = false">Close</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import LoginForm from '../components/user/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    handleLoginSuccess(username) {
      this.$emit('login-success', username);
      this.showModal = false;
    },
  },
};
</script>
