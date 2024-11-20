<template>
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
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                    <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                            <router-link to="/cart" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
                                <NavLink :active="isActive" :href="href" @click="navigate">Cart</NavLink>
                            </router-link>
                        </li>
                        <li>Link e-wallets</li>
                        <li @click="logout">Logout</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal -->
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
</template>

<script>

import LoginForm from "../user/LoginForm.vue";
import RegisterForm from "../user/RegisterForm.vue";
import { useToast } from "vue-toastification";
export default {
    name: "loginBtn",
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
            localStorage.setItem('isLoggedIn', 'true')
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
            localStorage.setItem('isLoggedIn', 'false')
        },
    },
};
</script>