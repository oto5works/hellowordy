/*-- words.js --*/
import { db } from "@/firebase/init";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore"; // 이 부분이 추가되었습니다.

// firebase.js Vuex module
export default {
  namespaced: true,

  // State
  state: {
    words: [],
    currentWordID: null,
  },
  // Mutations
  mutations: {
    setWords(state, words) {
      state.words = words;
    },
    setCurrentWordID(state, wordID) {
      state.currentWordID = wordID;
    },
  },

  // Actions
  actions: {
    async fetchWords({ commit, rootGetters }) {
      try {
        const vocabularyID = rootGetters["vocabularies/getCurrentVocabularyID"];
        console.log("vocabularyID: ", vocabularyID);

        const wordsRef = collection(db, "words");
        const q = query(
          wordsRef,
          where("vocabularyID", "==", vocabularyID),
          orderBy("index")
        );
        const querySnapshot = await getDocs(q);
        const words = [];
        querySnapshot.forEach((doc) => {
          words.push({ id: doc.id, ...doc.data() });
        });
        commit("setWords", words);
      } catch (error) {
        console.error("단어 불러오기 실패:", error);
      }
    },

    async createWord({ dispatch, rootGetters }, { word, mean, examples }) {
      try {
        const vocabularyID = rootGetters["vocabularies/getCurrentVocabularyID"];
        const userID = rootGetters["users/getUserID"];
        const wordsRef = collection(db, "words");

        // 새로운 단어의 index를 설정하기 위해 현재 vocabularyID에 속한 단어들의 수를 찾습니다.
        const q = query(wordsRef, where("vocabularyID", "==", vocabularyID));
        const querySnapshot = await getDocs(q);
        const wordCount = querySnapshot.size; // 현재 단어의 수

        const wordData = {
          vocabularyID: vocabularyID,
          userID: userID,
          createdAt: new Date(),
          word: word,
          mean: mean,
          examples: examples,
          index: wordCount, // 단어 목록의 끝에 위치시키기 위해 wordCount를 사용합니다.
        };
        await addDoc(wordsRef, wordData);

        // 단어장을 생성한 후 목록을 갱신합니다. 정확한 갱신을 위해 vocabularyID를 인자로 전달합니다.
        await dispatch("fetchWords");
      } catch (error) {
        throw error;
      }
    },

    async getWordById({ state, commit }) {
      try {
        const wordID = state.currentWordID;
        if (!wordID) {
          throw new Error("현재 선택된 단어장 ID가 없습니다.");
        }
        console.log("currentWordID: ", wordID);
        const wordRef = doc(db, "words", wordID);
        const docSnap = await getDoc(wordRef);

        if (docSnap.exists()) {
          const word = { id: docSnap.id, ...docSnap.data() };
          // 필요한 경우, 여기서 추가 작업을 수행할 수 있습니다. 예를 들어, 상태를 업데이트하거나 다른 액션을 호출할 수 있습니다.
          console.log("단어장 데이터:", word);
          return word;
        } else {
          console.log("해당 ID를 가진 단어장이 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("단어장 가져오기 실패:", error);
        throw error;
      }
    },

    async deleteWord({ dispatch }, wordID) {
      try {
        console.log("wordID", wordID);
        const wordRef = doc(db, "words", wordID);
        await deleteDoc(wordRef);
        await dispatch("fetchWords"); // 단어장을 삭제한 후 목록을 갱신합니다.
      } catch (error) {
        throw error;
      }
    },
    async updateWord({ dispatch, state }, payload) {
      console.log ('payload: ', payload)

      try {
        const wordID = state.currentWordID; // 현재 선택된 단어장 ID를 상태에서 가져옵니다.
        const wordRef = doc(db, "words", wordID);

        // 업데이트할 데이터 객체를 생성합니다. undefined가 아닌 필드만 추가합니다.
        const updateData = Object.keys(payload).reduce((acc, key) => {
          if (payload[key] !== undefined) {
            acc[key] = payload[key];
          }
          return acc;
        }, {});

        // 업데이트할 데이터가 있을 경우에만 Firestore 문서를 업데이트합니다.
        if (Object.keys(updateData).length > 0) {
          await updateDoc(wordRef, updateData);
          console.log("단어장 업데이트 성공");
        } else {
          console.log("업데이트할 데이터가 없습니다.");
        }

        await dispatch("fetchWords"); // 업데이트 후 단어장 목록을 새로고침합니다.
      } catch (error) {
        console.error("단어장 업데이트 중 오류 발생:", error);
        throw error;
      }
    },
    updateCurrentWordID({ commit }, wordID) {
      commit("setCurrentWordID", wordID);
    },
  },

  // Getters
  getters: {
    getWords: (state) => state.words,
    getCurrentWordID: (state) => state.currentWordID,
  },
};
