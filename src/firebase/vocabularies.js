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
    currentVocabulary: null,
  },
  // Mutations
  mutations: {
    setVocabularies(state, payload) {
      state.vocabularies = payload;
    },
    setCurrentVocabularyID(state, payload) {
      state.currentVocabularyID = payload;
    },
    setCurrentVocabulary(state, payload) {
      state.currentVocabulary = payload;
    },
  },
  // Actions
  actions: {
    /*-- Vocabulary --*/
    async createVocabulary(
      { dispatch, rootGetters },
      { language, title, content, share, file }
    ) {
      try {
        const userID = rootGetters["users/getUserID"];
        const displayName = rootGetters["users/getDisplayName"];
        const photoURL = rootGetters["users/getPhotoURL"];

        console.log("userID:", userID);
        console.log("displayName:", displayName);
        const vocabulariesRef = collection(db, "vocabularies");
        const vocabularyData = {
          language: language,
          title: title,
          content: content,
          share: share,
          createdAt: new Date(),
          userID: userID,
          displayName: displayName,
          photoURL: photoURL,
        };
        const docRef = await addDoc(vocabulariesRef, vocabularyData);

        let coverURL = null; // 이미지 URL을 저장할 변수 초기화
        // 이미지 업로드 로직
        if (file) {
          coverURL = await dispatch(
            "vocabularyImages/uploadVocabularyImages",
            { vocabularyID: docRef.id, file },
            { root: true }
          );
          // 업로드된 이미지 URL을 단어장 문서에 저장
          if (coverURL) {
            await updateDoc(doc(db, "vocabularies", docRef.id), {
              coverURL: coverURL,
            });
          }
        }

        await dispatch("fetchUserVocabularies"); // 단어장을 생성한 후 목록을 갱신합니다.
      } catch (error) {
        throw error;
      }
    },

    async fetchUserVocabularies({ commit, dispatch, rootGetters }) {
      try {
        // 사용자 인증 상태 준비를 기다립니다.
        await dispatch("users/ensureAuthReady", {}, { root: true });

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

    async fetchAllVocabularies({ commit }) {
      try {
        const vocabulariesRef = collection(db, "vocabularies");
        const q = query(vocabulariesRef, orderBy("createdAt", "desc"));
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
    async getVocabularyByCurrentVocabularyID({ state, commit }) {
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
          commit("setCurrentVocabulary", vocabulary);
        } else {
          console.log("해당 ID를 가진 단어장이 없습니다.");
          commit("setCurrentVocabulary", '해당 ID를 가진 단어장이 없습니다.');
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

        await dispatch("words/deleteWordsByVocabularyID", vocabularyID, {
          root: true,
        });

        // 마지막으로 단어장 자체를 삭제합니다.
        await deleteDoc(vocabularyRef);

        await dispatch("fetchUserVocabularies"); // 단어장을 삭제한 후 목록을 갱신합니다.
      } catch (error) {
        console.error("단어장 및 단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },
    async deleteVocabularyByCurrentVocabularyID({ dispatch, state }) {
      try {
        const vocabularyID = state.currentVocabularyID; // 현재 선택된 단어장 ID를 상태에서 가져옵니다.
        console.log("vocabularyID", vocabularyID);
        const vocabularyRef = doc(db, "vocabularies", vocabularyID);
        await dispatch('vocabularyImages/deleteVocabularyImageByCurrentVocabularyID', { vocabularyID }, { root: true });
        await dispatch('words/deleteWordsByCurrentVocabularyID', { vocabularyID }, { root: true });

       
        // 마지막으로 단어장 자체를 삭제합니다.
        await deleteDoc(vocabularyRef);

        await dispatch("fetchUserVocabularies"); // 단어장을 삭제한 후 목록을 갱신합니다.
      } catch (error) {
        console.error("단어장 및 단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },
    async deleteVocabulariesByUserID({ commit }, userID) {
      try {
        const vocabulariesRef = collection(db, "vocabularies");
        const q = query(vocabulariesRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);
        querySnapshot.forEach((docSnapshot) => {
          batch.delete(doc(db, "vocabularies", docSnapshot.id));
        });
        await batch.commit();
        console.log("사용자의 모든 vocabularies 삭제 완료");
      } catch (error) {
        console.error("vocabularies 삭제 중 오류 발생: ", error);
        throw error;
      }
    },
    async updateVocabularyByCurrentVocabularyID({ dispatch, state }, payload) {
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

        await dispatch("fetchUserVocabularies"); // 업데이트 후 단어장 목록을 새로고침합니다.
      } catch (error) {
        console.error("단어장 업데이트 중 오류 발생:", error);
        throw error;
      }
    },

    updateCurrentVocabularyID({ commit }, vocabularyID) {
      console.log("CurrentVocabularyID: ", vocabularyID);

      commit("setCurrentVocabularyID", vocabularyID);
    },
    async resetCurrentVocabularyID({ commit }) {
      console.log("voca Null을 설정합니다. ");

      commit("setCurrentVocabularyID", null); // 현재 선택된 단어장 ID를 null로 설정
    },
  },

  // Getters
  getters: {
    getVocabularies: (state) => state.vocabularies,
    getCurrentVocabularyID: (state) => state.currentVocabularyID,
    getCurrentVocabulary: (state) => state.currentVocabulary,

  },
};
