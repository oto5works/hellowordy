/*-- kanjis.js --*/
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
    kanjis: [],
    searchResults: [], // 검색 결과를 저장할 배열 추가
  },
  // Mutations
  mutations: {
    setKanjis(state, kanjis) {
      state.kanjis = kanjis;
    },
    setSearchResults(state, results) {
      state.searchResults = results;
    },
    removeKanji(state, kanjiID) {
      state.kanjis = state.kanjis.filter((kanji) => kanji.id !== kanjiID);
    },
    addKanji(state, kanji) {
      state.kanjis.unshift(kanji);
    },
    updateKanjiInState(state, { kanjiID, updateData }) {
      const kanjiIndex = state.kanjis.findIndex((kanji) => kanji.id === kanjiID);
      if (kanjiIndex !== -1) {
        // spread 연산자를 사용하여 객체를 업데이트
        state.kanjis[kanjiIndex] = { ...state.kanjis[kanjiIndex], ...updateData };
      }
    },
  },

  actions: {
    async getKanjis({ commit }) {
      console.log('getget')
      try {
        const kanjisRef = collection(db, "kanjis");
        const querySnapshot = await getDocs(kanjisRef);
        const kanjis = [];
        querySnapshot.forEach((doc) => {
          kanjis.push({ id: doc.id, ...doc.data() });
        });
        commit("setKanjis", kanjis);
      } catch (error) {
        console.error("단어 불러오기 실패:", error);
      }
    },
    async createKanji(
      { commit, dispatch, rootGetters },
      { kanji, jlpt, mean, goon, hoon, kun, comment, goonDetail, kunDetail, unicode }
    ) {
      try {
        const kanjisRef = collection(db, "kanjis");
        const docRef = doc(kanjisRef, unicode);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          // 이미 같은 unicode 값을 가진 문서가 존재하는 경우
          throw new Error(`${unicode} 값을 가진 단어가 이미 존재합니다.`);
        }

        const kanjiData = {
          createdAt: new Date(),
          kanji: kanji,
          jlpt: jlpt,
          mean: mean,
          goon: goon,
          hoon: hoon,
          kun: kun,
          comment: comment,
          goonDetail: goonDetail,
          kunDetail: kunDetail,

          unicode: unicode,
        };

        await setDoc(docRef, kanjiData);

        // Vuex 상태에도 단어 추가
        commit("addKanji", { ...kanjiData, id: unicode });
      } catch (error) {
        throw error;
      }
    },
    async deleteKanjiByPayload({ commit, state }, kanjiID) {
      try {
        const kanjiRef = doc(db, "kanjis", kanjiID);
        await deleteDoc(kanjiRef);
        commit("removeKanji", kanjiID);
      } catch (error) {
        throw error;
      }
    },

    async returnKanjiByPayload({ commit }, kanjiID) {
      console.log("currentKanjiID: ", kanjiID);
      try {
        if (!kanjiID) {
          throw new Error("현재 선택된 단어장 ID가 없습니다.");
        }
        const kanjiRef = doc(db, "kanjis", kanjiID);
        const docSnap = await getDoc(kanjiRef);

        if (docSnap.exists()) {
          const kanjiData = docSnap.data();
          const kanji = {
            id: docSnap.id,
            kanji: kanjiData.kanji,
            jlpt: kanjiData.jlpt,
            mean: kanjiData.mean,
            goon: kanjiData.goon,
            hoon: kanjiData.hoon,
            kun: kanjiData.kun,
            comment: kanjiData.comment,
            goonDetail: kanjiData.goonDetail,
            kunDetail: kanjiData.kunDetail,

            createdAt: kanjiData.createdAt.toDate(), // Firestore 타임스탬프 변환
          };
          console.log("단어장 데이터:", kanji);
          return kanji;
        } else {
          console.log("해당 ID를 가진 단어장이 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("단어장 가져오기 실패:", error);
        throw error;
      }
    },

    async updateKanjiByPayload({ commit, state }, { kanjiID, payload }) {
      try {
        const kanjiRef = doc(db, "kanjis", kanjiID);
        // 업데이트할 데이터 객체를 생성합니다. undefined가 아닌 필드만 추가합니다.
        const updateData = Object.keys(payload).reduce((acc, key) => {
          if (payload[key] !== undefined) {
            acc[key] = payload[key];
          }
          return acc;
        }, {});

        // 업데이트할 데이터가 있을 경우에만 Firestore 문서를 업데이트합니다.
        if (Object.keys(updateData).length > 0) {
          await updateDoc(kanjiRef, updateData);
          console.log("단어장 업데이트 성공");

          // Vuex 상태에서도 단어 데이터 업데이트
          commit("updateKanjiInState", { kanjiID, updateData });
        } else {
          console.log("업데이트할 데이터가 없습니다.");
        }
      } catch (error) {
        console.error("단어장 업데이트 중 오류 발생:", error);
        throw error;
      }
    },
    async checkDuplicateByPayload({ commit }, kanjiID) {
      try {
        const kanjiRef = doc(db, "kanjis", kanjiID);
        const docSnap = await getDoc(kanjiRef);

        return docSnap.exists();
      } catch (error) {
        console.error("Failed to check for duplicate kanji ID:", error);
        throw error;
      }
    },
    async searchKanjis({ commit }, searchTerm) {
      try {
        const kanjisRef = collection(db, "kanjis");
        const fields = ['kanji', 'jlpt', 'mean', 'goon', 'hoon', 'kun', 'comment'];
        const queries = fields.map(field => query(kanjisRef, where(field, '==', searchTerm)));
  
        const kanjis = [];
        const seenIds = new Set(); // 중복 결과 방지를 위한 Set
  
        for (const q of queries) {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            if (!seenIds.has(doc.id)) {
              seenIds.add(doc.id);
              kanjis.push({ id: doc.id, ...doc.data() });
            }
          });
        }
  
        // 검색 결과를 Vuex 상태에 저장하기 위해 mutation 호출
        commit("setSearchResults", kanjis);
  
        return kanjis;
      } catch (error) {
        console.error("검색 실패:", error);
        throw error;
      }
    },
  },

  // Getters
  getters: {
    getKanjis: (state) => state.kanjis,
    getSearchResults: (state) => state.searchResults,
  },
};
