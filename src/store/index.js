import { createStore } from "vuex";
import wordData from "./modules/wordData"; // new
import status from "./modules/status"; // new
import prompts from "./modules/prompts"; // new
import i18n from "./modules/i18n"; // new
import translations from "./modules/translations"; // new
import options from "./modules/options"; // new




//firebase
import users from "../firebase/users"; // new
import settings from "../firebase/settings"; // new




import vocas from "../firebase/vocas";
import vocaImages from "../firebase/vocaImages";
import checkedWords from "../firebase/checkedWords";
import words from "../firebase/words";
import kanjis from "../firebase/kanjis";
import kanjis2 from "../firebase/kanjis2";

import profileImages from "../firebase/profileImages";
import countdowns from "../firebase/countdowns";
import favorites from "../firebase/favorites";

const store = createStore({
  modules: {
    translations, // new
    i18n, // new
    options, // new

    wordData,
    status,
    settings,
    prompts,
    words,
    kanjis,
    kanjis2,

    users,
    vocas,
    profileImages,
    vocaImages,
    checkedWords,
    countdowns,
    favorites,
  },
});

export default store;
