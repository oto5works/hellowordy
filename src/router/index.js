// router/index.js

import { createRouter, createWebHashHistory } from "vue-router";
import main from "@/views/main.vue";
import viewWords from "@/views/viewWords.vue";
import add from "@/views/add.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: main,
    },

    {
      path: "/viewWords",
      name: "viewWords",
      component: viewWords,
    },
    {
      path: "/add",
      name: "add",
      component: add,
    },
  ],
});

export default router;
