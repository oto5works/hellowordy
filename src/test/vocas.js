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
    vocas: [],
    voca: null,
    vocaID: null,
  },
  // Mutations
  mutations: {
    setVocas(state, payload) {
      state.vocas = payload;
    },
    setVoca(state, payload) {
      state.voca = payload;
    },
    setVocaID(state, payload) {
      state.vocaID = payload;
    },
  },
  // Actions
  actions: {
    // 완료
    // UserID를 getters로 받아와서 vocas 저장 한다.
    // users.js 에서 사용중
    async getVocasByUserID({ commit, dispatch, rootGetters }) {
      try {
        await dispatch("users/ensureAuthReady", {}, { root: true });
        const userID = rootGetters["users/getUserID"];
        console.log("userID111:", userID);
        if (!userID) {
          throw new Error("사용자 인증 정보가 누락되었습니다.");
        }
        const vocasRef = collection(db, "vocas");
        const q = query(
          vocasRef,
          where("userID", "==", userID),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);
        const vocas = [];
        querySnapshot.forEach((doc) => {
          vocas.push({ id: doc.id, ...doc.data() });
        });
        commit("setVocas", vocas);
      } catch (error) {
        console.error("단어장 리스트 불러오기 실패:", error);
      }
    },
    // 완료
    async getVocaByPayload({ state, commit }, vocaID) {
      try {
        console.log ('vocaID::::', vocaID)
        if (!vocaID) {
          throw new Error("현재 선택된 단어장 ID가 없습니다.");
        }
        const vocaRef = doc(db, "vocas", vocaID);
        const docSnap = await getDoc(vocaRef);

        if (docSnap.exists()) {
          const voca = { id: docSnap.id, ...docSnap.data() };
          console.log("단어장 데이터:", voca);
          commit("setVoca", voca);
        } else {
          console.log("해당 ID를 가진 단어장이 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("단어장 가져오기 실패:", error);
        throw error;
      }
    },
    // 완료
    async returnVocaByPayload({ state, commit }, vocaID) {
      try {
        if (!vocaID) {
          throw new Error("현재 선택된 단어장 ID가 없습니다.");
        }

        const vocaRef = doc(db, "vocas", vocaID);
        const docSnap = await getDoc(vocaRef);

        if (docSnap.exists()) {
          const voca = { id: docSnap.id, ...docSnap.data() };
          console.log("단어장 데이터:", voca);
          return voca;
        } else {
          console.log("해당 ID를 가진 단어장이 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("단어장 가져오기 실패:", error);
        throw error;
      }
    },
    // 완
    async returnAllVocas({ commit }) {
      try {
        const vocasRef = collection(db, "vocas");
        const q = query(vocasRef, orderBy("createdAt", "desc")); // 모든 단어장을 생성 날짜 기준으로 내림차순 정렬
        const querySnapshot = await getDocs(q);
        const vocas = [];
        querySnapshot.forEach((doc) => {
          vocas.push({ id: doc.id, ...doc.data() }); // 각 단어장의 데이터를 vocas 배열에 추가
        });
        return vocas
      } catch (error) {
        console.error("전체 단어장 리스트 불러오기 실패:", error);
      }
    },
    // 완료
    async updateVocaByPayload(
      { dispatch, state },
      { vocaID, payload }
    ) {
      try {
        const vocaRef = doc(db, "vocas", vocaID);
        const updateData = Object.keys(payload).reduce((acc, key) => {
          if (payload[key] !== undefined) {
            acc[key] = payload[key];
          }
          return acc;
        }, {});
        if (Object.keys(updateData).length > 0) {
          await updateDoc(vocaRef, updateData);
          console.log("단어장 업데이트 성공");
        } else {
          console.log("업데이트할 데이터가 없습니다.");
        }
        await dispatch("getVocasByUserID");
      } catch (error) {
        console.error("단어장 업데이트 중 오류 발생:", error);
        throw error;
      }
    },
    // 완료
    async createVoca(
      { dispatch, rootGetters },
      { language, title, content, share, file }
    ) {
      try {
        const userID = rootGetters["users/getUserID"];
        const displayName = rootGetters["users/getDisplayName"];
        const photoURL = rootGetters["users/getPhotoURL"];
        console.log("userID:", userID);
        console.log("displayName:", displayName);
        const vocasRef = collection(db, "vocas");
        const vocaData = {
          language: language,
          title: title,
          content: content,
          share: share,
          createdAt: new Date(),
          userID: userID,
          displayName: displayName,
          photoURL: photoURL,
        };
        const docRef = await addDoc(vocasRef, vocaData);
        let coverURL = null; // 이미지 URL을 저장할 변수 초기화
        // 이미지 업로드 로직
        if (file) {
          coverURL = await dispatch(
            "vocaImages/uploadVocaImagesByPayload",
            { vocaID: docRef.id, file },
            { root: true }
          );
          // 업로드된 이미지 URL을 단어장 문서에 저장
          if (coverURL) {
            await updateDoc(doc(db, "vocas", docRef.id), {
              coverURL: coverURL,
            });
          }
        }
        await dispatch("getVocasByUserID"); // 단어장을 생성한 후 목록을 갱신합니다.
      } catch (error) {
        throw error;
      }
    },
    // 완료?
    async deleteVocaByPayload({ dispatch, state }, vocaID) {
      console.log ('단어장 삭제')
      try {
        const vocaRef = doc(db, "vocas", vocaID);
        console.log ('단어장 이미지 삭제')
        await dispatch(
          "vocaImages/deleteVocaImagesByPayload", vocaID, { root: true });
        console.log ('단어장 단어 삭제')
        await dispatch("words/deleteWordsByPayload", vocaID , { root: true });
        console.log ('체크단어 삭제')
        await dispatch("checkedWords/deleteCheckedWordsByCurrentVocaID", vocaID, { root: true });
        console.log ('단어장 삭제')
        await dispatch("favorites/deleteFavoritesByPayload", vocaID, { root: true });

        // 마지막으로 단어장 자체를 삭제합니다.
        await deleteDoc(vocaRef);

        await dispatch("getVocasByUserID");
      } catch (error) {
        console.error("단어장 및 단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },

    


    async updateVocaIDByPayload( { commit }, vocaID) {
      try {
        commit("setVocaID", vocaID);
      } catch (error) {
        console.error("단어장 업데이트 중 오류 발생:", error);
        throw error;
      }
    },







  
    

  
  },

  // Getters
  getters: {
    getVoca: (state) => state.voca,
    getVocas: (state) => state.vocas,
    getVocaID: (state) => state.vocaID,
  },
};
