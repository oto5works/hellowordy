/*-- checkedWords.js --*/
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
  writeBatch
} from "firebase/firestore"; // 이 부분이 추가되었습니다.

// firebase.js Vuex 모듈
export default {
  namespaced: true,

  // State
  state: () => ({
    checkedWords: {}, // 사용자 프로필 정보를 저장할 state
  }),

  // Mutations
  mutations: {
    // 사용자 프로필 정보를 업데이트하는 mutation
    setCheckedWords(state, payload) {
      console.log('@MUTATIONS: setCheckedWords!', payload)

      state.checkedWords = payload;
    },
  },

  // Actions
  actions: {
    // 프로필 이미지 업로드 및 Firebase Authentication의 photoURL 업데이트
    async deleteCheckedWordByWordID({ dispatch, rootGetters }, wordID) {
      try {
    
        // wordID가 null이거나 빈 문자열일 경우 함수 실행 중단
        if (!wordID) {
          console.log('wordID가 유효하지 않습니다:', wordID);
          return;
        }
    
        console.log('@FIREBASE: toggleCheckedWord!')
    
        const userID = rootGetters["users/getUserID"];
        const vocabularyID = rootGetters["vocabularies/getCurrentVocabularyID"];
        
        // Firestore에서 checkedWords 컬렉션 참조
        const checkedWordsRef = collection(db, "checkedWords");
        // 쿼리 생성
        const q = query(checkedWordsRef, where("userID", "==", userID), where("vocabularyID", "==", vocabularyID), where("wordID", "==", wordID));
        // 쿼리 결과 가져오기
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.empty) {
          // 학습한 단어가 없으면 추가
          const checkedWordData = {
            userID: userID,
            vocabularyID: vocabularyID,
            wordID: wordID,
            createdAt: new Date(),
          };
          await addDoc(checkedWordsRef, checkedWordData);
        } else {
          // 학습한 단어가 있으면 삭제
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }
    
        // 상태 업데이트를 위해 fetchCheckedWords 호출
        await dispatch("getCheckedWordsByCurrentVocabularyID");
      } catch (error) {
        throw error;
      }
    },
    async toggleCheckedWord({ dispatch, rootGetters }) {
      try {
        const wordID = rootGetters["study/getCurrentWordID"];
    
        // wordID가 null이거나 빈 문자열일 경우 함수 실행 중단
        if (!wordID) {
          console.log('wordID가 유효하지 않습니다:', wordID);
          return;
        }
    
        console.log('@FIREBASE: toggleCheckedWord!')
    
        const userID = rootGetters["users/getUserID"];
        const vocabularyID = rootGetters["vocabularies/getCurrentVocabularyID"];
        
        // Firestore에서 checkedWords 컬렉션 참조
        const checkedWordsRef = collection(db, "checkedWords");
        // 쿼리 생성
        const q = query(checkedWordsRef, where("userID", "==", userID), where("vocabularyID", "==", vocabularyID), where("wordID", "==", wordID));
        // 쿼리 결과 가져오기
        const querySnapshot = await getDocs(q);
    
        if (querySnapshot.empty) {
          // 학습한 단어가 없으면 추가
          const checkedWordData = {
            userID: userID,
            vocabularyID: vocabularyID,
            wordID: wordID,
            createdAt: new Date(),
          };
          await addDoc(checkedWordsRef, checkedWordData);
        } else {
          // 학습한 단어가 있으면 삭제
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }
    
        // 상태 업데이트를 위해 fetchCheckedWords 호출
        await dispatch("getCheckedWordsByCurrentVocabularyID");
      } catch (error) {
        throw error;
      }
    },
    


    async getCheckedWordsByCurrentVocabularyID({ commit, rootGetters }) {
      try {
        console.log('@FIREBASE: getCheckedWordsByCurrentVocabularyID!')
    
        const userID = rootGetters["users/getUserID"];
        const vocabularyID = rootGetters["vocabularies/getCurrentVocabularyID"];
        
        // Firestore에서 checkedWords 컬렉션 참조
        const checkedWordsRef = collection(db, "checkedWords");
        // 사용자 ID와 어휘장 ID에 맞는 쿼리 생성
        const q = query(checkedWordsRef, where("userID", "==", userID), where("vocabularyID", "==", vocabularyID));
        
        // 쿼리 결과 가져오기
        const querySnapshot = await getDocs(q);
        
        // 쿼리 결과가 비어있는 경우, null 할당
        if (querySnapshot.empty) {
          commit('setCheckedWords', null);
        } else {
          const checkedWords = {};
          
          querySnapshot.forEach((doc) => {
            // 각 문서의 데이터를 객체에 저장
            // 문서 ID를 키로, 문서 데이터를 값으로 사용
            checkedWords[doc.id] = doc.data();
          });
          
          // Mutations를 통해 상태 업데이트
          commit('setCheckedWords', checkedWords);
        }
      } catch (error) {
        console.error("Error fetching checked words: ", error);
        throw error;
      }
    },
    

  },

  // Getters
  getters: {
    getCheckedWords(state) {
      return state.checkedWords;
    },
  },
};