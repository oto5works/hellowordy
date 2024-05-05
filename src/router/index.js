// router/index.js

import { createRouter, createWebHashHistory } from "vue-router";
import home from "@/views/home/home.vue";
//import viewWords from "@/views/viewWords.vue";
//import add from "@/views/add.vue";
//import search from "@/views/searchWords2.vue";
//import db from "@/views/db.vue";
// auth
import usersRegister from "@/views/users/usersRegister.vue";
import usersSignIn from "@/views/users/usersSignIn.vue";
import usersSignOut from "@/views/users/usersSignOut.vue";
// voca
import vocabulariesAllView from "@/views/vocabularies/vocabulariesAllView.vue";

import vocabulariesUserView from "@/views/vocabularies/vocabulariesUserView.vue";
import wordsView from "@/views/words/wordsView.vue";
// anki
import ankiFilter from "@/views/anki/ankiFilter.vue";

// admin
import usersAllView from "@/views/users/usersAllView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
    },
    // auth
    {
      path: "/register",
      name: "usersRegister",
      component: usersRegister,
    },
    {
      path: "/signIn",
      name: "usersSignIn",
      component: usersSignIn,
    },
    {
      path: "/signOut",
      name: "usersSignOut",
      component: usersSignOut,
    },
    // voca
    {
      path: "/voca",
      name: "vocabulariesAllView",
      component: vocabulariesAllView,
    },
    {
      path: "/voca/my",
      name: "vocabulariesUserView",
      component: vocabulariesUserView,
    },
    {
      path: "/voca/words/:id",
      name: "wordsView",
      component: wordsView,
    },
    // anki
    {
      path: "/anki/select",
      name: "ankiFilter",
      component: ankiFilter,
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
