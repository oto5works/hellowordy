/*-- users.js --*/
import { auth, db } from "@/firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser as firebaseDeleteUser,
  updateProfile,
  GoogleAuthProvider, // 이 부분을 추가하세요.
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
} from "firebase/firestore"; // 이 부분이 추가되었습니다.

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
    async initAuthState({ dispatch, commit }) {
      console.log("initAuthState");
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          console.log("user: ", user);
          commit("setUser", user);
          await Promise.all([
            dispatch(
              "vocabularies/getVocabulariesByUserID",
              {},
              { root: true }
            ),
            dispatch("favorites/getFavoritesByUserID", {}, { root: true }),
            dispatch(
              "checkedWords/getCheckedWordsByUserID",
              {},
              { root: true }
            ),
          ]);
        } else {
          commit("setUser", null);
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
    // 완료 
    async returnUserByPayload({ state, commit }, userID) {
      try {
        if (!userID) {
          throw new Error("현재 선택된 단어장 ID가 없습니다.");
        }
        const userRef = doc(db, "users", userID);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const user = { id: docSnap.id, ...docSnap.data() };
          return user;
        } else {
          console.log("해당 ID를 가진 userID 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("userID 가져오기 실패:", error);
        throw error;
      }
    },








    async signIn({ commit }, { email, password }) {
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
    async register(
      { commit, dispatch },
      { email, password, displayName, file }
    ) {
      try {
        // 사용자 이름 중복 확인
        await dispatch("checkDisplayName", displayName);

        // 사용자 등록
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // 사용자의 displayName 업데이트
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
        commit("setUser", userCredential.user);

        // 사용자의 uid를 문서 ID로 사용하고 Firestore에 저장
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          email: email,
          displayName: displayName,
          state: "user",
          createdAt: new Date(),
        });

        // 이미지 업로드 로직
        if (file) {
          // 'profileImages/uploadProfileImage'는 모듈 이름과 액션 이름을 포함합니다.
          // 'userId'와 'file'을 매개변수로 전달합니다.
          await dispatch(
            "profileImages/uploadProfileImage",
            { userId: userCredential.user.uid, file },
            { root: true }
          );
        }
      } catch (error) {
        throw error;
      }
    },
   

    async fetchAllUsers({ commit }) {
      try {
        const usersRef = collection(db, "users");
        const querySnapshot = await getDocs(usersRef);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        commit("setUsers", users);
      } catch (error) {
        console.error("단어장 리스트 불러오기 실패:", error);
      }
    },
    async getUserById({ state, commit }, userID) {
      console.log("getUserById실행::", userID);
      try {
        if (!userID) {
          throw new Error("현재 선택된 유저 ID가 없습니다.");
        }

        const userRef = doc(db, "users", userID);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          const user = { id: docSnap.id, ...docSnap.data() };
          // 필요한 경우, 여기서 추가 작업을 수행할 수 있습니다. 예를 들어, 상태를 업데이트하거나 다른 액션을 호출할 수 있습니다.
          console.log("유저 데이터:", user);
          return user;
        } else {
          console.log("해당 ID를 가진 유저이 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("유저 가져오기 실패:", error);
        throw error;
      }
    },

    async register(
      { commit, dispatch },
      { email, password, displayName, file }
    ) {
      try {
        // 사용자 이름 중복 확인
        await dispatch("checkDisplayName", displayName);

        // 사용자 등록
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        // 사용자의 displayName 업데이트
        await updateProfile(userCredential.user, {
          displayName: displayName,
        });
        commit("setUser", userCredential.user);

        // 사용자의 uid를 문서 ID로 사용하고 Firestore에 저장
        const userRef = doc(db, "users", userCredential.user.uid);
        await setDoc(userRef, {
          email: email,
          displayName: displayName,
          state: "user",
          createdAt: new Date(),
        });

        // 이미지 업로드 로직
        if (file) {
          // 'profileImages/uploadProfileImage'는 모듈 이름과 액션 이름을 포함합니다.
          // 'userId'와 'file'을 매개변수로 전달합니다.
          await dispatch(
            "profileImages/uploadProfileImage",
            { userId: userCredential.user.uid, file },
            { root: true }
          );
        }
      } catch (error) {
        throw error;
      }
    },

    async checkDisplayName({ commit }, displayName) {
      // Firestore에서 'users' 컬렉션 쿼리를 준비합니다.
      const usersRef = collection(db, "users");
      // 'displayName' 필드가 입력된 displayName과 일치하는 쿼리 설정
      const q = query(usersRef, where("displayName", "==", displayName));

      // 쿼리 실행 및 결과 확인
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // 쿼리 결과가 비어있지 않다면, 동일한 displayName이 존재하는 것입니다.
        throw new Error("displayName already exists");
      }
      // displayName이 중복되지 않으면 아무 조치도 취하지 않습니다.
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
    async deleteUser({ dispatch }, userID) {
      try {
        console.log("유저 삭제 진행");

        // Firestore에서 사용자 데이터 삭제
        const userRef = doc(db, "users", userID);
        await deleteDoc(userRef);

        // profileImages 모듈의 deleteProfileImage 액션 호출
        await dispatch("profileImages/deleteProfileImage", userID, {
          root: true,
        });

        // vocabularies 모듈의 deleteVocabulariesByUserID 액션 호출
        await dispatch("vocabularies/deleteVocabulariesByUserID", userID, {
          root: true,
        });

        // words 모듈의 deleteWordsByUserID 액션 호출
        await dispatch("words/deleteWordsByUserID", userID, { root: true });

        console.log("사용자 및 관련 데이터 삭제가 완료되었습니다.");
      } catch (error) {
        console.error("사용자 삭제 중 오류 발생: ", error);
        throw error;
      }
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
