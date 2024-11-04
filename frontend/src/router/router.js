import { createRouter, createWebHistory } from "vue-router";
import Main from "../layouts/Main.vue";
import Verify from "../components/user/Verify.vue";
import Products from "../components/product/newProductBar.vue";
import singleProduct from "../components/product/singleProduct.vue";

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
  {
    path: "/product",
    component: Products,
    meta: { noHeader: false },
  },
  {
    path: "/product/:id",
    component: singleProduct,
    meta: { noHeader: false },
    name: "singleProduct",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
