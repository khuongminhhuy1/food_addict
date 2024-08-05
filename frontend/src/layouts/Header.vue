<template>
  <header class="font-fjalla sticky top-0 z-50  w-full ">
    <slot name="header">
      <div class="w-full flex items-center p-2 bg-white ">
        <div class="navbar bg-base-100 ">
          <div class="navbar-start">
            <div class="dropdown">
              <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </div>
              <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                <li><a>Homepage</a></li>
                <li><a>Portfolio</a></li>
                <li><a>About</a></li>
              </ul>
            </div>
          </div>
          <div class="navbar-center">
            <a class="btn btn-ghost text-xl">Food Addict.</a>
          </div>
          <div class="navbar-end">
            <div class="flex-auto flex justify-end items-center">
              <div v-if="!isAuthenticated">
                <button class="btn w-[100px]" @click="showModal = true">
                  Login
                </button>
              </div>
              <div v-else>
                <div class="dropdown dropdown-bottom dropdown-end">
                  <div tabindex="0" role="button">
                    <div class="w-12 rounded">
                      <img class="rounded-lg"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      <li>Cart</li>
                      <li>Link e-wallets</li>
                      <li @click="logout">Logout</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Login Btn -->


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
