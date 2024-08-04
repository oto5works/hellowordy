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

import router from "@/router"; // Vue Router 인스턴스 임포트

// firebase.js Vuex 모듈
export default {
  namespaced: true,

  // State
  state: {
    settings: {
      nativeLanguage: "", // 모국어
      targetLanguage: "random language", // 학습하고 싶은 언어
      goalType: "general", // general, topic, exam
      goal: "at the time of welcoming", // 예: travel, shopping 등
      difficulty: "beginner", // beginner, intermediate, advanced
    },
  },

  // Mutations
  mutations: {
    SET_NATIVE_LANGUAGE(state, language) {
      state.settings.nativeLanguage = language;
    },
    SET_LEARNING_DATA(state, data) {
      // 학습 데이터 업데이트
      state.settings = data.settings;
    },
  },

  // Actions
  actions: {
    async getSettings({ commit, dispatch, rootGetters }) {
      try {
        await dispatch("users/ensureAuthReady", {}, { root: true });
        const userID = rootGetters["users/getUserID"];
        if (!userID) {
          throw new Error("사용자 인증 정보가 누락되었습니다.");
        }

        // Firestore에서 학습 데이터 가져오기
        const docRef = doc(db, "settings", userID);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          // 문서가 없으면 'settings' 라우트로 리다이렉트
          router.push({ name: 'settings' });
        } else {
          // 문서가 존재하면 상태 업데이트
          const data = docSnap.data();
          commit('SET_LEARNING_DATA', data);
          dispatch("translations/generateTranslations",{},{ root: true })

        }
      } catch (error) {
        console.error("학습 정보 불러오기 실패:", error);
      }
    },


    async updateSettings({ commit, rootGetters, dispatch }, payload) {
      try {
        await dispatch("users/ensureAuthReady", {}, { root: true });
        const userID = rootGetters["users/getUserID"];
        if (!userID) {
          throw new Error("사용자 인증 정보가 누락되었습니다.");
        }
        // Nesting the payload under 'settings' key
        const data = {
          settings: payload
        };
    
        // Firestore에 학습 데이터 저장 또는 업데이트
        const docRef = doc(db, "settings", userID);
        await setDoc(docRef, data, { merge: true });
    
        // 상태 업데이트
        await commit('SET_LEARNING_DATA', data.settings);
        //router.push({ name: 'learning' });
      } catch (error) {
        console.error("학습 데이터 저장/업데이트 실패:", error);
      }
    },
    async updateSettingsWithoutAuth({ commit }, payload) {
      try {
        const data = {
          settings: payload
        };


        // 상태 업데이트
        await commit('SET_LEARNING_DATA', data);
      } catch (error) {
        console.error("학습 데이터 저장/업데이트 실패:", error);
      }
    },
   

    updateNativeLanguage({ commit }, language) {
      console.log ('000', language)
      commit("SET_NATIVE_LANGUAGE", language);
    },
  },

  // Getters
  getters: {
    settings: (state) => state.settings,
  },
};
