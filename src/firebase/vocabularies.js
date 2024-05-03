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
    vocabularies: [],
    currentVocabularyID: null,
  },
  // Mutations
  mutations: {
    setVocabularies(state, vocabularies) {
      state.vocabularies = vocabularies;
    },
    setCurrentVocabularyID(state, vocabularyID) {
      state.currentVocabularyID = vocabularyID;
    },
  },

  // Actions
  actions: {
    /*-- Vocabulary --*/
    async createVocabulary(
      { dispatch, rootGetters },
      { category, title, content }
    ) {
      try {
        const userID = rootGetters["users/getUserID"];
        const vocabulariesRef = collection(db, "vocabularies");
        const vocabularyData = {
          category: category,
          title: title,
          content: content,
          createdAt: new Date(),
          userID: userID,
        };
        await addDoc(vocabulariesRef, vocabularyData);
        await dispatch("fetchVocabularies"); // 단어장을 생성한 후 목록을 갱신합니다.
      } catch (error) {
        throw error;
      }
    },
    async fetchVocabularies({ commit, dispatch, rootGetters }) {
      try {
        // 사용자 인증 상태 준비를 기다립니다.
        await dispatch("users/waitForAuth", {}, { root: true });

        const userID = rootGetters["users/getUserID"];
        console.log("userID:", userID);
        if (!userID) {
          throw new Error("사용자 인증 정보가 누락되었습니다.");
        }

        const vocabulariesRef = collection(db, "vocabularies");
        // userID로 필터링하고 createdAt 필드로 내림차순 정렬합니다.
        const q = query(
          vocabulariesRef,
          where("userID", "==", userID),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const vocabularies = [];
        querySnapshot.forEach((doc) => {
          vocabularies.push({ id: doc.id, ...doc.data() });
        });
        commit("setVocabularies", vocabularies);
      } catch (error) {
        console.error("단어장 리스트 불러오기 실패:", error);
      }
    },

    //const query = firestore.collection('yourCollectionName').orderBy('createdAt');
    async getVocabularyById({ state, commit }) {
      try {
        const vocabularyID = state.currentVocabularyID;
        if (!vocabularyID) {
          throw new Error("현재 선택된 단어장 ID가 없습니다.");
        }

        const vocabularyRef = doc(db, "vocabularies", vocabularyID);
        const docSnap = await getDoc(vocabularyRef);

        if (docSnap.exists()) {
          const vocabulary = { id: docSnap.id, ...docSnap.data() };
          // 필요한 경우, 여기서 추가 작업을 수행할 수 있습니다. 예를 들어, 상태를 업데이트하거나 다른 액션을 호출할 수 있습니다.
          console.log("단어장 데이터:", vocabulary);
          return vocabulary;
        } else {
          console.log("해당 ID를 가진 단어장이 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("단어장 가져오기 실패:", error);
        throw error;
      }
    },

    async deleteVocabulary({ dispatch }, vocabularyID) {
      try {
        console.log("vocabularyID", vocabularyID);
        const vocabularyRef = doc(db, "vocabularies", vocabularyID);

        // 해당 단어장 ID와 연결된 모든 단어를 찾습니다.
        const wordsRef = collection(db, "words"); // 'words'는 단어들이 저장된 컬렉션 이름입니다.
        const q = query(wordsRef, where("vocabularyID", "==", vocabularyID));
        const querySnapshot = await getDocs(q);

        // 각 단어를 삭제합니다.
        const batch = writeBatch(db); // Batch 작업을 시작합니다.
        querySnapshot.forEach((docSnapshot) => {
          const docRef = doc(db, "words", docSnapshot.id); // 'doc' 대신 'docSnapshot'을 사용합니다.
          batch.delete(docRef); // Batch에 삭제 작업을 추가합니다.
        });
        await batch.commit(); // Batch 작업을 커밋하여 모든 삭제를 한 번에 처리합니다.

        // 마지막으로 단어장 자체를 삭제합니다.
        await deleteDoc(vocabularyRef);

        await dispatch("fetchVocabularies"); // 단어장을 삭제한 후 목록을 갱신합니다.
      } catch (error) {
        console.error("단어장 및 단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },

    async updateVocabulary({ dispatch, state }, payload) {
      try {
        const vocabularyID = state.currentVocabularyID; // 현재 선택된 단어장 ID를 상태에서 가져옵니다.
        const vocabularyRef = doc(db, "vocabularies", vocabularyID);

        // 업데이트할 데이터 객체를 생성합니다. undefined가 아닌 필드만 추가합니다.
        const updateData = Object.keys(payload).reduce((acc, key) => {
          if (payload[key] !== undefined) {
            acc[key] = payload[key];
          }
          return acc;
        }, {});

        // 업데이트할 데이터가 있을 경우에만 Firestore 문서를 업데이트합니다.
        if (Object.keys(updateData).length > 0) {
          await updateDoc(vocabularyRef, updateData);
          console.log("단어장 업데이트 성공");
        } else {
          console.log("업데이트할 데이터가 없습니다.");
        }

        await dispatch("fetchVocabularies"); // 업데이트 후 단어장 목록을 새로고침합니다.
      } catch (error) {
        console.error("단어장 업데이트 중 오류 발생:", error);
        throw error;
      }
    },

    updateCurrentVocabularyID({ commit }, vocabularyID) {
      console.log("CurrentVocabularyID: ", vocabularyID);

      commit("setCurrentVocabularyID", vocabularyID);
    },
  },

  // Getters
  getters: {
    getVocabularies: (state) => state.vocabularies,
    getCurrentVocabularyID: (state) => state.currentVocabularyID,
  },
};
