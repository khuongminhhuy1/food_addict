<template>
  <div>
    <h2 class="text-xl mb-4 flex flex-row justify-center">Login</h2>
    <form @submit.prevent="login()">
      <div class="mb-4">
        <input
          type="email"
          v-model="email"
          class="input input-bordered w-full"
          placeholder="Email"
          required
        />
      </div>
      <div class="mb-4">
        <input
          type="password"
          v-model="password"
          class="input input-bordered w-full"
          placeholder="Password"
          required
        />
      </div>
      <div class="flex w-full flex-row items-center justify-between">
        <div class="flex flex-row items-center">
          <input
            type="checkbox"
            name="remember"
            id="remember"
            class="checkbox checkbox-primary"

          />
          <label for="remember" class="ml-2">Remember me</label>
        </div>
        <button type="submit" :disabled="loading" class="btn btn-primary w-[140px]">
          <span v-if="!loading">Login</span>
        <Loading v-else />
      </button>
      </div>
      <div class="">
        <span></span>
      </div>
    </form>
  </div>
</template>

<script>
import { login } from "../../api/auth.js";
import { useToast } from "vue-toastification";
import Loading from "../loading/Loading.vue";

export default {
  components: {
    Loading,
  },
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      loading:false,
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async login() {
      this.loading = true;
      try {
        const response = await login(this.email, this.password);
        setTimeout(() => {
          this.loading = false;
          this.$emit('login-success');
        }, 3000);
      } catch (error) {
        this.loading = false;
        console.error("Login error:", error);
      }
    }
  }

};
</script>
