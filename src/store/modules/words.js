/*-- words.js --*/
//import db from "@/firebase/init.js";
//import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export default {
  namespaced: true,

  state: {
    categoryOptions: ["basic", "n3", "n2", "n1", "my"],
    category: null,
    part: null,
    words: [],
  },
  mutations: {
    setCategory(state, value) {
      state.category = value;
    },
    setPart(state, value) {
      console.log ('집어넣어~', value)
      state.part = value;
    },
    setWords(state, words) {
      console.log("setWords 시작", words);
      state.words = words;
    },
  },
  actions: {
    // category에 따른 단어 가져오기.
    async fetchWords({ commit, state }) {
      try {
        // 'words' 컬렉션에 대한 참조를 생성합니다.
        const wordsCollectionRef = collection(db, "words");
    
        // 카테고리에 따라 데이터를 필터링하고, 'createdAt' 필드에 따라 정렬합니다.
        const q = query(
          wordsCollectionRef,
          where("category", "==", state.category),
          //orderBy("createdAt") // 여기서 정렬 설정을 추가합니다.
        );
    
        // 쿼리를 실행하고 결과 문서 스냅샷을 가져옵니다.
        const querySnapshot = await getDocs(q);
    
        // 결과 데이터를 배열로 변환합니다.
        const words = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // 문서 데이터와 함께 문서 ID도 포함합니다.
        }));
    
        // 가져온 데이터를 Vuex 상태에 저장합니다.
        commit("setWords", words);
      } catch (error) {
        console.error("단어를 가져오는데 실패했습니다:", error);
        // 에러 처리 로직 (예: 에러 메시지를 상태에 저장)
      }
    },
    setCategory({ commit }, value) {
      // Accept a value as the second argument
      commit("setCategory", value); // Commit that value using the mutation
    },
    setPart({ commit, dispatch }, value) {
      console.log('받았어~', value);
      // Accept a value as the second argument
      commit("setPart", value); // Commit that value using the mutation
      dispatch("filter/filterWords", null, { root: true }); // 다른 네임스페이스의 액션을 호출합니다.
    },
  },

  
  getters: {
    getCategory: (state) => state.category,
    getPart: (state) => state.part,
    getWords: (state) => state.words,
    getCategoryOptions: (state) => state.categoryOptions,
  },
};
