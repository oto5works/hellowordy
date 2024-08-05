// router/index.js

import { createRouter, createWebHashHistory } from "vue-router";
import welcome from "@/views/welcome/welcome.vue";
import settings from "@/views/settings/settings.vue";
import learning from "@/views/learning/learning.vue";
import chat from "@/views/prompt/prompt.vue";
import home from "@/views/home/home.vue";



// auth



const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    {
      path: "/welcome",
      name: "welcome",
      component: welcome,
    },
    // auth
 
    {
      path: "/settings",
      name: "settings",
      component: settings,
    },
    {
      path: "/learning",
      name: "learning",
      component: learning,
    },
    {
      path: "/chat",
      name: "chat",
      component: chat,
    },
    
  ],
});

export default router;
