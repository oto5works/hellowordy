import { auth, db } from "@/firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore"; // 이 부분이 추가되었습니다.

// firebase.js Vuex module
export default {
  namespaced: true,

  // State
  state: () => ({
    user: null,
  }),

  // Mutations
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },

  // Actions
  actions: {
    async checkUsernameExists({ commit }, username) {
      // Firestore에서 'users' 컬렉션 쿼리를 준비합니다.
      const usersRef = collection(db, "users");
      // 'username' 필드가 입력된 username과 일치하는 쿼리 설정
      const q = query(usersRef, where("username", "==", username));

      // 쿼리 실행 및 결과 확인
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // 쿼리 결과가 비어있지 않다면, 동일한 username이 존재하는 것입니다.
        throw new Error("Username already exists");
      }
      // Username이 중복되지 않으면 아무 조치도 취하지 않습니다.
    },

    async signUp({ commit, dispatch }, { email, password, username }) {
      try {
        await dispatch("checkUsernameExists", username); // 사용자 이름 중복 확인
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUser", userCredential.user);

        // 사용자의 uid를 문서 ID로 사용하고 Firestore에 저장
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          email: email,
          username: username,
          state: "user",
        });
      } catch (error) {
        throw error;
      }
    },

    async setSignIn({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUser", userCredential.user);
      } catch (error) {
        throw error;
      }
    },

    async setSignOut({ commit }) {
      try {
        await signOut(auth);
        //commit("setUser", null);
      } catch (error) {
        throw error;
      }
    },
    initAuth({ commit }) {
      console.log("initAuth");
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("user: ", user);
          commit("setUser", user);
        } else {
          commit("setUser", null);
        }
      });
    },
    /*-- Vocabulary --*/
    async createVocabulary({ commit }, { category, title, content, userID }) {
      try {
        // 'vocabularies' 컬렉션에 새 문서를 추가합니다.
        const vocabulariesRef = collection(db, "vocabularies");
        // 문서 데이터
        const vocabularyData = {
          category: category,
          title: title,
          content: content,
          createdAt: new Date(), // 현재 시간을 생성 날짜로 설정
          // likes 필드 제거
          userID: userID, // 문서를 생성하는 사용자의 ID
        };
        // 문서 추가
        await addDoc(vocabulariesRef, vocabularyData);
      } catch (error) {
        throw error;
      }
    },
    async deleteVocabulary({ commit }, { vocabularyID }) {
      try {
        // 'vocabularies' 컬렉션에서 삭제할 단어장의 문서 참조를 얻습니다.
        const vocabularyRef = doc(db, "vocabularies", vocabularyID);
        // 문서 삭제
        await deleteDoc(vocabularyRef);
      } catch (error) {
        throw error;
      }
    },
    async updateVocabularyTitle({ commit }, { vocabularyID, newTitle }) {
      try {
        // 'vocabularies' 컬렉션에서 수정할 단어장의 문서 참조를 얻습니다.
        const vocabularyRef = doc(db, "vocabularies", vocabularyID);
        // 문서의 타이틀을 업데이트
        await updateDoc(vocabularyRef, {
          title: newTitle,
        });
      } catch (error) {
        throw error;
      }
    },
  },

  // Getters
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
    getUserID: (state) => {
      return state.user ? state.user.uid : null;
    },
    // 현재 인증된 사용자의 전체 정보를 반환하는 getter
    getCurrentUser: (state) => {
      return state.user;
    },
  },
};
