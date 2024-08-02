import { createStore } from "vuex";
import wordData from "./modules/wordData";
import status from "./modules/status";





//firebase
import users from "../firebase/users";
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
    wordData,
    status,


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
