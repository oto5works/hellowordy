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
    async uploadVocabularyImages({ commit }, { vocabularyID, file }) {
      console.log('uploadVocabularyImages', vocabularyID);
      const storage = getStorage();
      const storageRef = ref(storage, `vocabularyImages/${vocabularyID}`);
    
      try {
        // Firebase Storage에 이미지 업로드
        await uploadBytes(storageRef, file);
        // 업로드된 이미지의 URL 가져오기
        const coverURL = await getDownloadURL(storageRef);
    
        // Firestore의 vocabularyImages 컬렉션에 사용자 프로필 이미지 URL 저장
        const profileImageRef = doc(db, "vocabularyImages", vocabularyID);
        await setDoc(profileImageRef, { url: coverURL }, { merge: true });
    
        // 업로드된 이미지의 URL 반환
        return coverURL; // 여기를 수정하여 URL을 반환하도록 함.
      } catch (error) {
        console.error(
          "프로필 이미지 업로드 또는 Firebase Authentication의 coverURL 업데이트 중 오류 발생: ",
          error
        );
        // 오류 발생 시, 함수에서 null 반환하도록 처리할 수 있음
        return null;
      }
    },
    async updateVocabularyImage({ commit, rootGetters }, file) {
      console.log ('FIREBASE! updateVocabularyImage')
      const vocabularyID = rootGetters["vocabularies/getCurrentVocabularyID"];

      console.log('Updating vocabulary image for', vocabularyID);
      const storage = getStorage();
      // Firebase Storage 내의 파일 경로 설정
      const storageRef = ref(storage, `vocabularyImages/${vocabularyID}`);
    
      try {
        // 파일을 해당 경로에 업로드하여 기존 파일 덮어쓰기
        await uploadBytes(storageRef, file);
        // 업로드된 파일의 다운로드 URL 가져오기
        const coverURL = await getDownloadURL(storageRef);
    
        // Firestore의 해당 문서의 이미지 URL 업데이트
        const vocabularyRef = doc(db, "vocabularyImages", vocabularyID);
        await setDoc(vocabularyRef, { url: coverURL }, { merge: true });
    
        // 성공 시, Vuex 상태 업데이트나 다른 처리를 할 수 있음
        // 예: commit('updatecoverURL', coverURL);
        console.log('Image successfully updated:', coverURL);
        return coverURL; // 성공적으로 업데이트된 URL 반환
      } catch (error) {
        console.error(
          "Error updating vocabulary image: ",
          error
        );
        // 오류 발생 시 처리
        // 예: commit('setError', error.message);
        return null; // 오류 발생 시 null 반환
      }
    },

    async updateVocabularyImage({ dispatch, rootGetters }, file) {
      console.log('FIREBASE! updateVocabularyImage');
      const vocabularyID = rootGetters["vocabularies/getCurrentVocabularyID"];
  
      // 1. 기존 이미지 삭제
      await dispatch("deleteStorageByCurrentVocabularyID");
  
      // 2. 새 이미지 업로드
      const storage = getStorage();
      const storageRef = ref(storage, `vocabularyImages/${vocabularyID}`);
  
      try {
        await uploadBytes(storageRef, file); // 새 파일 업로드
        const coverURL = await getDownloadURL(storageRef); // 새 파일의 URL 가져오기
  
        // 3. Firestore에 업로드된 이미지의 URL 저장
        const vocabularyRef = doc(db, "vocabularyImages", vocabularyID);
        await setDoc(vocabularyRef, { url: coverURL }, { merge: true });
  
        console.log('Image successfully updated:', coverURL);
        return coverURL; // 성공적으로 업데이트된 URL 반환
      } catch (error) {
        console.error("Error updating vocabulary image:", error);
        return null; // 오류 발생 시 null 반환
      }
    },



    async deleteVocabularyImageByCurrentVocabularyID({ dispatch, rootGetters }) {
      console.log ('@FIREBASE! deleteVocabularyImageByCurrentVocabularyID')
      try {
        const vocabularyID = rootGetters["vocabularies/getCurrentVocabularyID"];
        console.log("vocabularyID", vocabularyID);
        const vocabularyRef = doc(db, "vocabularyImages", vocabularyID);

        await dispatch("deleteStorageByCurrentVocabularyID");

        // 마지막으로 단어장 자체를 삭제합니다.
        await deleteDoc(vocabularyRef);
      } catch (error) {
        console.error("단어장 및 단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },


    async deleteStorageByCurrentVocabularyID({ rootGetters }) {
      const vocabularyID = rootGetters["vocabularies/getCurrentVocabularyID"];
      const storage = getStorage();
      const storageRef = ref(storage, `vocabularyImages/${vocabularyID}`);
      try {
        await deleteObject(storageRef);
        console.log("File deleted successfully");
      } catch (error) {
        console.error("Error occurred while deleting the file:", error);
      }
    }

    
   
  },

  // Getters
  getters: {
    // 사용자 프로필 정보를 가져오는 getter
    userProfile(state) {
      return state.userProfile;
    },
  },
};
