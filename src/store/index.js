
import { createStore } from "vuex";

import state from "./modules/state";
import words from "./modules/words";
import filter from "./modules/filter";

const store = createStore({
  modules: {
    state,
    words,
    filter
  },
});

export default store;


