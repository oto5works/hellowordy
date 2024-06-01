import { createStore } from "vuex";

import kuroshiro from "./modules/kuroshiro";
import study from "./modules/study";
import temp from "./modules/temp";
import filter from "./modules/filter";

//firebase
import users from "../firebase/users";
import vocas from "../firebase/vocas";
import vocaImages from "../firebase/vocaImages";
import checkedWords from "../firebase/checkedWords";
import words from "../firebase/words";
import kanjis from "../firebase/kanjis";

import profileImages from "../firebase/profileImages";
import countdowns from "../firebase/countdowns";
import favorites from "../firebase/favorites";

const store = createStore({
  modules: {
    filter,
    temp,
    words,
    kanjis,
    kuroshiro,
    users,
    study,
    vocas,
    profileImages,
    vocaImages,
    checkedWords,
    countdowns,
    favorites,
  },
});

export default store;
