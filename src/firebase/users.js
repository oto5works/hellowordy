import { auth, db } from "@/firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser as firebaseDeleteUser,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import router from "@/router"; // Vue Router 인스턴스 임포트

// firebase.js Vuex module
export default {
  namespaced: true,

  // State
  state: () => ({
    user: null,
    users: [],
  }),

  // Mutations
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUsers(state, users) {
      state.users = users;
    },
  },

  // Actions
  actions: {
    // 완료
    // 초기 로딩시 작동됨.
    async initAuthState({ dispatch, commit, rootState }) {
      console.log("initAuthState");
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log("회원");

          console.log("user: ", user);
          commit("setUser", user);

          await Promise.all([
            dispatch("settings/getSettings", {}, { root: true }),
            //dispatch("favorites/getFavoritesByUserID", {}, { root: true }),
            //dispatch("checkedWords/getCheckedWordsByUserID", {}, { root: true }),
          ]);
        } else {
          commit("setUser", null);
          console.log("회원 아님");
          router.push({ name: 'welcome' });
          // Redirect to 'welcome' route
         
        }
      });
    },
    // 완료
    // 구글 로그인
    async signInWithGoogle({ commit, dispatch }) {
      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        commit("setUser", result.user);
        const userRef = doc(db, "users", result.user.uid);
        const docSnap = await getDoc(userRef);
        // 사용자 정보가 이미 데이터베이스에 존재하지 않는 경우에만 새로운 문서를 생성
        if (!docSnap.exists()) {
          await setDoc(userRef, {
            email: result.user.email,
            displayName: result.user.displayName || "",
            state: "user",
            photoURL: result.user.photoURL || "",
            createdAt: new Date(),
          });
        }
      } catch (error) {
        throw error;
      }
    },

    async signOut({ commit }) {
      try {
        await signOut(auth);
        //commit("setUser", null);
      } catch (error) {
        throw error;
      }
    },

    ensureAuthReady({ state }) {
      return new Promise((resolve) => {
        if (state.user) {
          resolve();
        } else {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            unsubscribe();
            resolve();
          });
        }
      });
    },
  },

  // Getters
  getters: {
    getUserID: (state) => {
      return state.user ? state.user.uid : null;
    },
    getDisplayName: (state) => {
      return state.user ? state.user.displayName : null;
    },
    getPhotoURL: (state) => {
      return state.user ? state.user.photoURL : null;
    },
    isAuthenticated(state) {
      return !!state.user;
    },
    getUser: (state) => {
      return state.user;
    },
    getUsers: (state) => {
      return state.users;
    },
  },
};
