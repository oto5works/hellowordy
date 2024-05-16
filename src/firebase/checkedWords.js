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
  writeBatch,
} from "firebase/firestore"; // 이 부분이 추가되었습니다.

// firebase.js Vuex 모듈
export default {
  namespaced: true,

  // State
  state: () => ({
    checkedWords: [],
  }),

  // Mutations
  mutations: {
    // 사용자 프로필 정보를 업데이트하는 mutation
    setCheckedWords(state, payload) {
      console.log("@MUTATIONS: setCheckedWords!", payload);
      state.checkedWords = payload;
    },
  },

  // Actions
  actions: {
    // 완료
    // UserID를 getters로 받아와서 checkedWordsUserID 저장 한다.
    // users.js 에서 사용중
    async getCheckedWordsByUserID({ commit, dispatch, rootGetters }) {
      try {
        const userID = rootGetters["users/getUserID"];
        if (!userID) {
          throw new Error("사용자 인증 정보가 누락되었습니다.");
        }
        const checkedWordsRef = collection(db, "checkedWords");
        const q = query(checkedWordsRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);
        const checkedWords = [];
        querySnapshot.forEach((doc) => {
          checkedWords.push({ id: doc.id, ...doc.data() });
        });
        commit("setCheckedWords", checkedWords);
      } catch (error) {
        console.error("단어장 리스트 불러오기 실패:", error);
      }
    },

    // 완료
    async deleteCheckedWordsByCurrentVocaID({ rootGetters, dispatch }, vocaID) {
      try {
        const checkedWordsRef = collection(db, "checkedWords");
        const q = query(checkedWordsRef, where("vocaID", "==", vocaID));
        const querySnapshot = await getDocs(q);

        // 각 단어를 삭제합니다.
        const batch = writeBatch(db); // Batch 작업을 시작합니다.
        querySnapshot.forEach((docSnapshot) => {
          const docRef = doc(db, "checkedWords", docSnapshot.id); // 'doc' 대신 'docSnapshot'을 사용합니다.
          batch.delete(docRef); // Batch에 삭제 작업을 추가합니다.
        });
        await batch.commit(); // Batch 작업을 커밋하여 모든 삭제를 한 번에 처리합니다.

        console.log("vocaID에 해당하는 모든 단어 삭제 완료:", vocaID);
        await dispatch("getCheckedWordsByUserID");
      } catch (error) {
        console.error("단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },
    // 완료
    async toggleCheckedWordByPayload({ dispatch, rootGetters }, vocaID) {
      try {
        const wordID = rootGetters["study/getWordID"];
        const userID = rootGetters["users/getUserID"];

        // 모든 ID가 유효한지 검사
        if (!wordID || !userID || !vocaID) {
          if (!wordID) console.log("wordID가 유효하지 않습니다:", wordID);
          if (!userID) console.log("userID 유효하지 않습니다:", userID);
          if (!vocaID) console.log("vocaID 유효하지 않습니다:", vocaID);
          return;
        }

        console.log("@FIREBASE: toggleCheckedWord!", wordID, userID, vocaID);

        // Firestore에서 checkedWords 컬렉션 참조
        const checkedWordsRef = collection(db, "checkedWords");
        // 쿼리 생성
        const q = query(
          checkedWordsRef,
          where("userID", "==", userID),
          where("vocaID", "==", vocaID),
          where("wordID", "==", wordID)
        );
        // 쿼리 결과 가져오기
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // 학습한 단어가 없으면 추가
          const checkedWordData = {
            userID: userID,
            vocaID: vocaID,
            wordID: wordID,
            createdAt: new Date(),
          };
          await addDoc(checkedWordsRef, checkedWordData);
          await dispatch("study/setNext", null, { root: true });

        } else {
          // 학습한 단어가 있으면 삭제
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }

        // 상태 업데이트를 위해 getCheckedWordsByUserID 호출
        await dispatch("getCheckedWordsByUserID");
      } catch (error) {
        console.error("Error toggling checked word:", error);
        throw error;
      }
    },
    async deleteCheckedWordByPayload({ rootGetters, dispatch }, wordID) {
      try {
        const userID = rootGetters["users/getUserID"]; // userID 가져오기
        const vocaID = rootGetters["vocas/getVocaID"]; // vocaID 가져오기
    
        const checkedWordsRef = collection(db, "checkedWords");
        // 'wordID', 'userID', 'vocaID'에 해당하는 문서를 찾는 쿼리
        const q = query(checkedWordsRef, 
                        where("wordID", "==", wordID), 
                        where("userID", "==", userID), 
                        where("vocaID", "==", vocaID));
        const querySnapshot = await getDocs(q);
    
        // 쿼리 결과에서 각 문서를 순회하며 삭제
        querySnapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref); // 문서 참조를 사용하여 문서 삭제
        });
    
        // 필요한 경우, 상태 업데이트나 다른 처리를 위해 dispatch 사용
        await dispatch("getCheckedWordsByUserID");
    
      } catch (error) {
        console.error("단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },







    async verifyChecked({ rootGetters, state }) {

      try {
        const wordID = rootGetters["study/getWordID"]; // wordID 가져오기
        const checkedWords = state.checkedWords;
    console.log ('verifyChecked:wordID:', wordID)
    console.log ('checkedWords:wordID:', checkedWords)

        // checkedWords 배열을 순회하며 wordID가 일치하는지 확인
        const isWordChecked = checkedWords.some(checkedWord => checkedWord.wordID === wordID);
    
        // 일치하는 경우 true 반환, 그렇지 않으면 false 반환
        return isWordChecked;
    
      } catch (error) {
        console.error("검증 중 오류 발생:", error);
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
