// router/index.js



import { createRouter, createWebHashHistory } from 'vue-router';
import main from '@/views/main.vue';
import viewWords from '@/views/viewWords.vue';
import addwords from '@/views/addwords.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: main,
    },
    {
      path: '/viewWords',
      name: 'viewWords',
      component: viewWords,
    },
    {
      path: '/addwords',
      name: 'addwords',
      component: addwords,
    },
  ],
});

export default router;
