
import { createStore } from "vuex";

import state from "./modules/state";
import filter from "./modules/filter";
//firebase
import users from "../firebase/users";
import vocabularies from "../firebase/vocabularies";
import words from "../firebase/words";

const store = createStore({
  modules: {
    state,
    words,
    filter,
    users,
    vocabularies,
  },
});

export default store;
