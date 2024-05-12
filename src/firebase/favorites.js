/*-- favorites.js --*/
import { db } from "@/firebase/init";

import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

export default {
  namespaced: true,
  state: () => ({
    favoritesUserID: [],
  }),
  mutations: {
    setFavoritesUserID(state, payload) {
      console.log("@MUTATIONS: setFavoritesByUserID!", payload);
      state.favoritesUserID = payload;
    },
  },
  actions: {
    // 완료
    // UserID를 getters로 받아와서 favoritesUserID 저장 한다.
    // users.js 에서 사용중
    async getFavoritesByUserID({ commit, rootGetters }) {
      try {
        console.log("@FIREBASE: getFavorites!");
        const userID = rootGetters["users/getUserID"];
        const favoritesRef = collection(db, "favorites");
        const q = query(favoritesRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          commit("setFavoritesUserID", []);
        } else {
          const favorites = [];
          querySnapshot.forEach((doc) => {
            favorites.push({ id: doc.id, ...doc.data() });
          });
          commit("setFavoritesUserID", favorites);
        }
      } catch (error) {
        console.error("Error fetching checked words: ", error);
        throw error;
      }
    },
    // 완료
    async toggleFavoriteByPayload({ dispatch, rootGetters }, vocabularyID) {
      try {
        const userID = rootGetters["users/getUserID"];
        if (!vocabularyID) {
          console.log("vocabularyID가 유효하지 않습니다:", vocabularyID);
          return;
        }
        console.log("@FIREBASE: toggleFavorite!");
        const favoritesRef = collection(db, "favorites");
        const q = query(
          favoritesRef,
          where("userID", "==", userID),
          where("vocabularyID", "==", vocabularyID)
        );
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          const favoriteData = {
            userID: userID,
            vocabularyID: vocabularyID,
            createdAt: new Date(),
          };
          await addDoc(favoritesRef, favoriteData);
        } else {
          querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
          });
        }
        dispatch("getFavoritesByUserID");
      } catch (error) {
        throw error;
      }
    },
    // 완료?
    async deleteFavoritesByPayload({ rootGetters, dispatch }, vocabularyID) {
      try {
        const favoritesRef = collection(db, "favorites");
        const q = query(favoritesRef, where("vocabularyID", "==", vocabularyID));
        const querySnapshot = await getDocs(q);

        // 각 단어를 삭제합니다.
        const batch = writeBatch(db); // Batch 작업을 시작합니다.
        querySnapshot.forEach((docSnapshot) => {
          const docRef = doc(db, "favorites", docSnapshot.id); // 'doc' 대신 'docSnapshot'을 사용합니다.
          batch.delete(docRef); // Batch에 삭제 작업을 추가합니다.
        });
        await batch.commit(); // Batch 작업을 커밋하여 모든 삭제를 한 번에 처리합니다.

        console.log(
          "vocabularyID에 해당하는 모든 단어 삭제 완료:",
          vocabularyID
        );
        await dispatch("getFavoritesByUserID");
      } catch (error) {
        console.error("단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },





    async returnFavoritesByPayload({ commit, rootGetters }, vocabularyID) {
      try {
        console.log("@FIREBASE: returnFavoritesByPayload!", vocabularyID);
        const favoritesRef = collection(db, "favorites");
        const q = query(
          favoritesRef,
          where("vocabularyID", "==", vocabularyID)
        );
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("없어요");
          return []; // 변경: 객체 대신 빈 배열 반환
        } else {
          const favorites = []; // 변경: 객체 대신 배열 사용
          querySnapshot.forEach((doc) => {
            // 변경: 배열에 문서 데이터를 객체 형태로 추가 (선택적으로 문서 ID 포함)
            favorites.push({
              id: doc.id, // 문서 ID 포함시키기 (선택적)
              ...doc.data(), // 문서 데이터 확장
            });
          });
          console.log("있습네다", favorites);
          return favorites; // 배열 반환
        }
      } catch (error) {
        console.error("Error fetching checked words: ", error);
        throw error;
      }
    },
  },
  getters: {
    getFavoritesUserID(state) {
      return state.favoritesUserID;
    },
  },
};
