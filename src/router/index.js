// router/index.js

import { createRouter, createWebHashHistory } from "vue-router";
import home from "@/views/home/home.vue";
//import viewWords from "@/views/viewWords.vue";
//import add from "@/views/add.vue";
//import search from "@/views/searchWords2.vue";
//import db from "@/views/db.vue";
// users
import usersAuth from "@/views/users/usersAuth.vue";
import usersMy from "@/views/users/usersMy.vue";

// voca
import vocabulariesAllView from "@/views/vocabularies/vocabulariesAllView.vue";
import vocabulariesDetail from "@/views/vocabularies/vocabulariesDetail.vue";
import vocabulariesUser from "@/views/vocabularies/vocabulariesUser.vue";
import wordsView from "@/views/words/wordsView.vue";


// study
import studyView from "@/views/study/studyView.vue";

// admin
import usersAllView from "@/views/users/usersAllView.vue";
import test from "@/test/test.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    // users
    {
      path: "/auth",
      name: "auth",
      component: usersAuth,
    },
    {
      path: "/my",
      name: "my",
      component: usersMy,
    },
    {
      path: "/user/:id",
      name: "user",
      component: vocabulariesUser,
    },
    // voca
    {
      path: "/voca/:id",
      name: "vocaDetail",
      component: vocabulariesDetail,
    },
    {
      path: "/voca",
      name: "voca",
      component: vocabulariesAllView,
    },
   
    {
      path: "/voca/test/:id",
      name: "test",
      component: test,
    },
    // anki
    {
      path: "/anki",
      name: "anki",
      component: studyView,
    },
    {
      path: "/anki:id",
      name: "ankiDetail",
      component: studyView,
    },
 

    // admin
    {
      path: "/admin/users",
      name: "usersAllView",
      component: usersAllView,
    },
    /*--
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
    {
      path: "/search",
      name: "search",
      component: search,
    },
    {
      path: "/db",
      name: "db",
      component: db,
    },
    --*/
  ],
});

export default router;
