import { createRouter, createWebHistory } from "vue-router";
import Main from "../layouts/Main.vue";
import Verify from "../components/user/Verify.vue";

const routes = [
  {
    path: "/",
    component: Main,
    meta: { noHeader: false },
  },
  {
    path: "/verify",
    component: Verify,
    meta: { noHeader: false },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
