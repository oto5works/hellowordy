/*-- profileImages.js --*/
import { auth, db } from "@/firebase/init";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage"; // deleteObject 추가
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore"; // 이 부분이 추가되었습니다.

import { getAuth, updateProfile } from "firebase/auth";

// firebase.js Vuex 모듈
export default {
  namespaced: true,

  // State
  state: () => ({
    userProfile: {}, // 사용자 프로필 정보를 저장할 state
  }),

  // Mutations
  mutations: {
    // 사용자 프로필 정보를 업데이트하는 mutation
    setUserProfile(state, profile) {
      state.userProfile = profile;
    },
  },

  // Actions
  actions: {
    // 프로필 이미지 업로드 및 Firebase Authentication의 photoURL 업데이트
    async uploadProfileImage({ commit }, { userId, file }) {
      const storage = getStorage();
      const storageRef = ref(storage, `profileImages/${userId}`);

      try {
        // Firebase Storage에 이미지 업로드
        await uploadBytes(storageRef, file);
        // 업로드된 이미지의 URL 가져오기
        const photoURL = await getDownloadURL(storageRef);

        // Firestore의 profileImages 컬렉션에 사용자 프로필 이미지 URL 저장
        const profileImageRef = doc(db, "profileImages", userId);
        await setDoc(profileImageRef, { url: photoURL }, { merge: true });

        // Firebase Authentication에서 현재 로그인한 사용자 가져오기
        const auth = getAuth();
        const user = auth.currentUser;

        // 사용자 프로필 업데이트
        if (user) {
          await updateProfile(user, {
            photoURL: photoURL,
          });
          console.log(
            "Firebase Authentication의 photoURL이 성공적으로 업데이트되었습니다."
          );
        }

        // State 업데이트 (옵션: 실제 UI 반영을 위해 필요한 경우)
        commit("setUserProfile", { userId, photoURL });
      } catch (error) {
        console.error(
          "프로필 이미지 업로드 또는 Firebase Authentication의 photoURL 업데이트 중 오류 발생: ",
          error
        );
      }
    },

    // Firestore에서 사용자 프로필 정보 가져오기
    async fetchUserProfile({ commit }, userId) {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        commit("setUserProfile", userSnap.data());
      } else {
        console.log("No such user profile!");
      }
    },

    async getProfileImageById({ state, commit }, userID) {
      console.log ('getprofileImageById실행::', userID)
      try {
        if (!userID) {
          throw new Error("현재 선택된 유저 ID가 없습니다.");
        }

        const profileImageRef = doc(db, "profileImages", userID);
        const docSnap = await getDoc(profileImageRef);

        if (docSnap.exists()) {
          const profileImage = { id: docSnap.id, ...docSnap.data() };
          // 필요한 경우, 여기서 추가 작업을 수행할 수 있습니다. 예를 들어, 상태를 업데이트하거나 다른 액션을 호출할 수 있습니다.
          console.log("profileImage 데이터:", profileImage);
          return profileImage;
        } else {
          console.log("해당 ID를 가진 유저이 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("유저 가져오기 실패:", error);
        throw error;
      }
    },


    
    
    async deleteProfileImage({ commit }, userId) {
      console.log("프로필사진 삭제 시도", userId);

      try {
        const storage = getStorage();
        const photoRef = ref(storage, `profileImages/${userId}`);

        // 파일 존재 여부 확인
        try {
          await getDownloadURL(photoRef);
          // 파일이 존재하면 삭제 진행
          await deleteObject(photoRef);
          console.log("프로필사진 삭제 완료", userId);
        } catch (error) {
          // 파일이 존재하지 않으면 여기서 처리
          if (error.code === "storage/object-not-found") {
            // 파일이 없으므로 넘어감
            console.log("삭제할 프로필사진이 존재하지 않음", userId);
          } else {
            // 다른 오류 처리
            throw error;
          }
        }

        // Firestore에서도 해당 사용자의 프로필 이미지 정보 삭제
        await deleteDoc(doc(db, "profileImages", userId));
      } catch (error) {
        console.error("프로필사진 삭제 중 오류 발생: ", error);
      }
    },
  },

  // Getters
  getters: {
    // 사용자 프로필 정보를 가져오는 getter
    userProfile(state) {
      return state.userProfile;
    },
  },
};
