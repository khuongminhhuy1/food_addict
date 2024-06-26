<template>
  <header class="font-fjalla sticky top-0 z-50 bg-gray-800 w-full ">
    <slot name="header">
      <div class="w-full flex items-center p-4 ">
        <!-- Menu -->
        <div class="flex-auto text-white ">
          <h1 class="text-2xl">Food Addict</h1>
        </div>
        <!-- Icon -->
        <div class="flex-noneflex items-center justify-center">
          <div class="flex flex-row justify-between items-center">
            <a href="#">
              <div class="flex flex-row items-center bg-white px-6 rounded-lg">
                <p class="text-black">Food </p>
                <img src="../assets/images/fast-food.jpg" class="w-[50px]" alt="">
                <p class=" text-black"> Addict</p>
              </div>
            </a>

          </div>
        </div>
        <!-- Login Btn -->
        <div class="flex-auto flex justify-end items-center">
          <div v-if="!isAuthenticated">
            <button class="btn w-[100px]" @click="showModal = true">
              Login
            </button>
          </div>
          <div v-else>
            <span class="pr-5">Hello, {{ user.name }}</span>
            <button class="btn w-[100px]" @click="logout">Logout</button>
          </div>
        </div>

      </div>
      <!-- Line -->

      <!-- Login/Register Modal -->
      <div v-if="showModal" class="modal modal-open">
        <div class="modal-box">
          <div class="modal-action">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">
              ✕
            </button>
          </div>
          <div v-if="isLogin" class="">
            <LoginForm @login-success="handleLoginSuccess" />
            <p>
              Don't have an account?
              <button class="btn btn-link" @click="toggleForm">Register</button>
            </p>
          </div>
          <div v-else class="">
            <RegisterForm @register-success="OffModal" />
            <p>
              Already have an account?
              <button class="btn btn-link" @click="toggleForm">Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </slot>
  </header>
</template>

<script>
import LoginForm from "../components/user/LoginForm.vue";
import RegisterForm from "../components/user/RegisterForm.vue";
import { useToast } from "vue-toastification";
export default {
  components: {
    LoginForm,
    RegisterForm,
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  data() {
    return {
      showModal: false,
      isLogin: true,
      isAuthenticated: false,
    };
  },
  created() {
    // Check if user is already logged in on component mount
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.user = user;
      this.isAuthenticated = true;
    }
  },
  methods: {
    toggleForm() {
      this.isLogin = !this.isLogin;
    },
    OffModal() {
      this.showModal = false;
    },
    closeModal() {
      this.showModal = false;
      this.isLogin = true;
    },
    handleLoginSuccess() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        this.user = user;
        this.isAuthenticated = true;
        this.showModal = false;
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.user = {};
      this.isAuthenticated = false;
      this.toast.success("Logged out successfully !")
    },
  },
};
</script>
