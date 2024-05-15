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
  writeBatch,
} from "firebase/firestore"; // 이 부분이 추가되었습니다.

// firebase.js Vuex module
export default {
  namespaced: true,

  // State
  state: {
    words: [],
  },
  // Mutations
  mutations: {
    setWords(state, words) {
      state.words = words;
    },
    removeWord(state, wordID) {
      state.words = state.words.filter((word) => word.id !== wordID);
    },
    addWord(state, word) {
      state.words.unshift(word);
    },
    updateWordInState(state, { wordID, updateData }) {
      const wordIndex = state.words.findIndex((word) => word.id === wordID);
      if (wordIndex !== -1) {
        // spread 연산자를 사용하여 객체를 업데이트
        state.words[wordIndex] = { ...state.words[wordIndex], ...updateData };
      }
    },
  },

  actions: {
    async createWord(
      { commit, dispatch, rootGetters },
      { word, mean, examples, vocaID }
    ) {
      try {
        const userID = rootGetters["users/getUserID"];
        const wordsRef = collection(db, "words");

        const wordData = {
          vocaID: vocaID,
          userID: userID,
          createdAt: new Date(),
          word: word,
          mean: mean,
          examples: examples,
        };
        const docRef = await addDoc(wordsRef, wordData);

        // Firestore에 추가된 단어 객체에 ID 포함
        const addedWord = { id: docRef.id, ...wordData };
        // Vuex 상태에도 단어 추가
        commit("addWord", addedWord);
      } catch (error) {
        throw error;
      }
    },

    // 완료
    async deleteWordsByPayload({ rootGetters, dispatch }, vocaID) {
      try {
        const wordsRef = collection(db, "words");
        const q = query(wordsRef, where("vocaID", "==", vocaID));
        const querySnapshot = await getDocs(q);

        // 각 단어를 삭제합니다.
        const batch = writeBatch(db); // Batch 작업을 시작합니다.
        querySnapshot.forEach((docSnapshot) => {
          const docRef = doc(db, "words", docSnapshot.id); // 'doc' 대신 'docSnapshot'을 사용합니다.
          batch.delete(docRef); // Batch에 삭제 작업을 추가합니다.
        });
        await batch.commit(); // Batch 작업을 커밋하여 모든 삭제를 한 번에 처리합니다.

        console.log("vocaID에 해당하는 모든 단어 삭제 완료:", vocaID);
      } catch (error) {
        console.error("단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },
    // 완료
    async deleteWordByPayload({ commit, state }, wordID) {
      try {
        const wordRef = doc(db, "words", wordID);
        await deleteDoc(wordRef);
        commit("removeWord", wordID);
      } catch (error) {
        throw error;
      }
    },

    // 완료
    async returnWordByPayload({ state, commit }, wordID) {
      try {
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
    // 완료
    async updateWordByPayload({ commit, state }, { wordID, payload }) {
      try {
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

          // Vuex 상태에서도 단어 데이터 업데이트
          commit("updateWordInState", { wordID, updateData });
        } else {
          console.log("업데이트할 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("단어장 업데이트 중 오류 발생:", error);
        throw error;
      }
    },

    // 완료
    async getWordsByPayload({ commit, rootGetters }, vocaID) {
      console.log("fetchWords!!");
      try {
        const wordsRef = collection(db, "words");
        const q = query(wordsRef, where("vocaID", "==", vocaID));
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
 // 완료
 async returnWordsByPayload({ commit, rootGetters }, vocaID) {
  console.log("fetchWords!!");
  try {
    const wordsRef = collection(db, "words");
    const q = query(wordsRef, where("vocaID", "==", vocaID));
    const querySnapshot = await getDocs(q);
    const words = [];
    querySnapshot.forEach((doc) => {
      words.push({ id: doc.id, ...doc.data() });
    });
    return words
  } catch (error) {
    console.error("단어 불러오기 실패:", error);
  }
},
    async resetWords({ commit }) {
      console.log("words Null을 설정합니다. ");

      commit("setWords", null); // 현재 선택된 단어장 ID를 null로 설정
    },
  },

  // Getters
  getters: {
    getWords: (state) => state.words,
  },
};
