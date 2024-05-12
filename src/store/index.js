import { createStore } from "vuex";

import state from "./modules/state";
import filter from "./modules/filter";

import kuroshiro from "./modules/kuroshiro";
import study from "./modules/study";

//firebase
import users from "../firebase/users";
import vocabularies from "../firebase/vocabularies";
import vocabularyImages from "../firebase/vocabularyImages";
import checkedWords from "../firebase/checkedWords";
import words from "../firebase/words";
import profileImages from "../firebase/profileImages";
import countdowns from "../firebase/countdowns";
import favorites from "../firebase/favorites";

const store = createStore({
  modules: {
    state,
    words,
    filter,
    kuroshiro,
    users,
    study,
    vocabularies,
    profileImages,
    vocabularyImages,
    checkedWords,
    countdowns,
    favorites,
  },
});

export default store;
