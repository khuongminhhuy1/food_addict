<template>
  <header class="font-fjalla sticky top-0 z-50  w-full ">
    <slot name="header">
      <div class="w-full flex items-center ">
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
            <router-link to="/" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
              <NavLink :active="isActive" :href="href" @click="navigate" class="text-3xl">Food Addict.</NavLink>
            </router-link>
          </div>
          <div class="navbar-end">
            <loginBtn />
          </div>
        </div>
      </div>

    </slot>
  </header>
</template>

<script>
export default {
  name: "Header",
  components: { loginBtn }
}
import loginBtn from '../components/btn/loginBtn.vue';

</script>
