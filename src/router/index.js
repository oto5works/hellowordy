// router/index.js

import { createRouter, createWebHashHistory } from "vue-router";
import welcome from "@/views/welcome/welcome.vue";
// auth
import auth from "@/views/auth/auth.vue";



const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "welcome",
      component: welcome,
    },
    // auth
    {
      path: "/auth",
      name: "auth",
      component: auth,
    },
  ],
});

export default router;
