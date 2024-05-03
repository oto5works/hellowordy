// router/index.js

import { createRouter, createWebHashHistory } from "vue-router";
import main from "@/views/main.vue";
//import viewWords from "@/views/viewWords.vue";
//import add from "@/views/add.vue";
//import search from "@/views/searchWords2.vue";
//import db from "@/views/db.vue";
// auth
import signUp from "@/views/auth/signUp.vue";
import signIn from "@/views/auth/signIn.vue";
import signOut from "@/views/auth/signOut.vue";
// voca
import vocabulariesView from "@/views/vocabularies/vocabulariesView.vue";
import wordsView from "@/views/words/wordsView.vue";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: "main",
      component: main,
    },
// auth
{
  path: "/signUp",
  name: "signUp",
  component: signUp,
},
{
  path: "/signIn",
  name: "signIn",
  component: signIn,
},
{
  path: "/signOut",
  name: "signOut",
  component: signOut,
},
// voca
{
  path: "/voca/list",
  name: "vocabulariesView",
  component: vocabulariesView,
},
{
  path: "/voca/:id",
  name: "wordsView",
  component: wordsView,
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
