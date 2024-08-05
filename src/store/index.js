import { createStore } from "vuex";
import wordData from "./modules/wordData"; // new
import status from "./modules/status"; // new
import prompts from "./modules/prompts"; // new
import translations from "./modules/translations"; // new
import options from "./modules/options"; // new




//firebase
import users from "../firebase/users"; // new
import settings from "../firebase/settings"; // new


const store = createStore({
  modules: {
    wordData, // new
    status, // new
    prompts, // new
    translations, // new
    options, // new
    users, // new
    settings, // new
    
  },
});

export default store;
