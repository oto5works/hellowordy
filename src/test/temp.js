/*-- temp.js --*/

export default {
  namespaced: true,

  // State
  state: {
    words: [],
    favorites: [],
    checkedWords: [],
    vocas: [],
  },
  // Mutations
  mutations: {
    setWords(state, words) {
      state.words = words;
    },
    setCurrentWordID(state, wordID) {
      state.currentWordID = wordID;
    },
  },

  actions: {
    async createWord(
      { dispatch, rootGetters },
      { word, mean, examples, vocaID }
    ) {
      try {
        const userID = rootGetters["users/getUserID"];
        const wordsRef = collection(db, "words");

        // 새로운 단어의 index를 설정하기 위해 현재 vocaID에 속한 단어들의 수를 찾습니다.
        const q = query(wordsRef, where("vocaID", "==", vocaID));
        const querySnapshot = await getDocs(q);

        const wordData = {
          vocaID: vocaID,
          userID: userID,
          createdAt: new Date(),
          word: word,
          mean: mean,
          examples: examples,
        };
        await addDoc(wordsRef, wordData);

        // 단어장을 생성한 후 목록을 갱신합니다. 정확한 갱신을 위해 vocaID를 인자로 전달합니다.
        await dispatch("fetchWords");
      } catch (error) {
        throw error;
      }
    },
    // 완료
    // vocaID를 넣어서 해당 값이 있다면 return 값으로 전달한다.
    // vocasDetailWords.js에서 사용중
    async returnWordsByPayload({ commit, rootGetters }, vocaID) {
      try {
        console.log("@FIREBASE: returnWordsByPayload!", vocaID);
        const wordsRef = collection(db, "words");
        const q = query(wordsRef, where("vocaID", "==", vocaID));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          console.log("없어요");
          return [];
        } else {
          const words = [];
          querySnapshot.forEach((doc) => {
            words.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          console.log("있습네다", words);
          return words;
        }
      } catch (error) {
        console.error("Error fetching checked words: ", error);
        throw error;
      }
    },
    // 완료
    async deleteWordsByPayload({ rootGetters, dispatch }, vocaID) {
      try {
        const wordsRef = collection(db, "words");
        const q = query(wordsRef, where("vocaID", "==", vocaID));
        const querySnapshot = await getDocs(q);

        // 각 단어를 삭제합니다.
        const batch = writeBatch(db); // Batch 작업을 시작합니다.
        querySnapshot.forEach((docSnapshot) => {
          const docRef = doc(db, "words", docSnapshot.id); // 'doc' 대신 'docSnapshot'을 사용합니다.
          batch.delete(docRef); // Batch에 삭제 작업을 추가합니다.
        });
        await batch.commit(); // Batch 작업을 커밋하여 모든 삭제를 한 번에 처리합니다.

        console.log(
          "vocaID에 해당하는 모든 단어 삭제 완료:",
          vocaID
        );
        await dispatch("returnWordsByPayload", vocaID);
      } catch (error) {
        console.error("단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },

    async getWordsByPayload({ commit, rootGetters }, vocaID) {
      console.log("fetchWords!!");
      try {
        const wordsRef = collection(db, "words");
        const q = query(
          wordsRef,
          where("vocaID", "==", vocaID),
          orderBy("index")
        );
        const querySnapshot = await getDocs(q);
        const words = [];
        querySnapshot.forEach((doc) => {
          words.push({ id: doc.id, ...doc.data() });
        });
        commit("setWords", words);
      } catch (error) {
        console.error("단어 불러오기 실패:", error);
      }
    },

    async deleteWordsByVocaID({ dispatch }, vocaID) {
      try {
        console.log("vocaID로 단어 삭제 시작:", vocaID);
        const wordsRef = collection(db, "words");
        const q = query(wordsRef, where("vocaID", "==", vocaID));
        const querySnapshot = await getDocs(q);

        // 각 단어를 삭제합니다.
        const batch = writeBatch(db); // Batch 작업을 시작합니다.
        querySnapshot.forEach((docSnapshot) => {
          const docRef = doc(db, "words", docSnapshot.id); // 'doc' 대신 'docSnapshot'을 사용합니다.
          batch.delete(docRef); // Batch에 삭제 작업을 추가합니다.
        });
        await batch.commit(); // Batch 작업을 커밋하여 모든 삭제를 한 번에 처리합니다.

        console.log(
          "vocaID에 해당하는 모든 단어 삭제 완료:",
          vocaID
        );

        // 필요한 경우, 여기서 추가적인 후처리 작업을 수행할 수 있습니다.
        // 예를 들어, 관련 단어장이나 UI를 업데이트할 수 있습니다.
        // await dispatch("fetchWords"); // 예시: 단어 목록을 새로고침합니다.
      } catch (error) {
        console.error("단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },
    async deleteWordsByCurrentVocaID({ rootGetters }) {
      console.log("FIREBASE! deleteWordsByCurrentVocaID");

      try {
        const vocaID = rootGetters["vocas/getCurrentVocaID"];

        console.log("vocaID로 단어 삭제 시작:", vocaID);
        const wordsRef = collection(db, "words");
        const q = query(wordsRef, where("vocaID", "==", vocaID));
        const querySnapshot = await getDocs(q);

        // 각 단어를 삭제합니다.
        const batch = writeBatch(db); // Batch 작업을 시작합니다.
        querySnapshot.forEach((docSnapshot) => {
          const docRef = doc(db, "words", docSnapshot.id); // 'doc' 대신 'docSnapshot'을 사용합니다.
          batch.delete(docRef); // Batch에 삭제 작업을 추가합니다.
        });
        await batch.commit(); // Batch 작업을 커밋하여 모든 삭제를 한 번에 처리합니다.

        console.log(
          "vocaID에 해당하는 모든 단어 삭제 완료:",
          vocaID
        );

        // 필요한 경우, 여기서 추가적인 후처리 작업을 수행할 수 있습니다.
        // 예를 들어, 관련 단어장이나 UI를 업데이트할 수 있습니다.
        // await dispatch("fetchWords"); // 예시: 단어 목록을 새로고침합니다.
      } catch (error) {
        console.error("단어 삭제 중 오류 발생:", error);
        throw error;
      }
    },
    async fetchWords({ commit, rootGetters }) {
      console.log("fetchWords!!");
      try {
        const vocaID = rootGetters["vocas/getCurrentVocaID"];
        console.log("vocaID: ", vocaID);

        const wordsRef = collection(db, "words");
        const q = query(
          wordsRef,
          where("vocaID", "==", vocaID),
          orderBy("index")
        );
        const querySnapshot = await getDocs(q);
        const words = [];
        querySnapshot.forEach((doc) => {
          words.push({ id: doc.id, ...doc.data() });
        });
        commit("setWords", words);
      } catch (error) {
        console.error("단어 불러오기 실패:", error);
      }
    },

    async resetWords({ commit }) {
      console.log("words Null을 설정합니다. ");

      commit("setWords", null); // 현재 선택된 단어장 ID를 null로 설정
    },

    async getWordById({ state, commit }) {
      try {
        const wordID = state.currentWordID;
        if (!wordID) {
          throw new Error("현재 선택된 단어장 ID가 없습니다.");
        }
        console.log("currentWordID: ", wordID);
        const wordRef = doc(db, "words", wordID);
        const docSnap = await getDoc(wordRef);

        if (docSnap.exists()) {
          const word = { id: docSnap.id, ...docSnap.data() };
          // 필요한 경우, 여기서 추가 작업을 수행할 수 있습니다. 예를 들어, 상태를 업데이트하거나 다른 액션을 호출할 수 있습니다.
          console.log("단어장 데이터:", word);
          return word;
        } else {
          console.log("해당 ID를 가진 단어장이 없습니다.");
          return null;
        }
      } catch (error) {
        console.error("단어장 가져오기 실패:", error);
        throw error;
      }
    },

    async deleteWord({ dispatch }, wordID) {
      try {
        console.log("wordID", wordID);
        const wordRef = doc(db, "words", wordID);
        await deleteDoc(wordRef);
        await dispatch("fetchWords"); // 단어장을 삭제한 후 목록을 갱신합니다.
      } catch (error) {
        throw error;
      }
    },
    async deleteCurrentWordID({ dispatch, state }) {
      console.log("@FIREBASE! deleteCurrentWordID");
      const wordID = state.currentWordID; // 현재 선택된 단어장 ID를 상태에서 가져옵니다.
      try {
        console.log("wordID", wordID);
        const wordRef = doc(db, "words", wordID);
        await deleteDoc(wordRef);
        await dispatch("fetchWords"); // 단어장을 삭제한 후 목록을 갱신합니다.
      } catch (error) {
        throw error;
      }
    },
    async deleteWordsByUserID({ commit }, userID) {
      try {
        const wordsRef = collection(db, "words");
        const q = query(wordsRef, where("userID", "==", userID));
        const querySnapshot = await getDocs(q);
        const batch = writeBatch(db);
        querySnapshot.forEach((docSnapshot) => {
          batch.delete(doc(db, "words", docSnapshot.id));
        });
        await batch.commit();
        console.log("사용자의 모든 words 삭제 완료");
      } catch (error) {
        console.error("words 삭제 중 오류 발생: ", error);
        throw error;
      }
    },

    async updateWord({ dispatch, state }, payload) {
      console.log("payload: ", payload);

      try {
        const wordID = state.currentWordID; // 현재 선택된 단어장 ID를 상태에서 가져옵니다.
        const wordRef = doc(db, "words", wordID);

        // 업데이트할 데이터 객체를 생성합니다. undefined가 아닌 필드만 추가합니다.
        const updateData = Object.keys(payload).reduce((acc, key) => {
          if (payload[key] !== undefined) {
            acc[key] = payload[key];
          }
          return acc;
        }, {});

        // 업데이트할 데이터가 있을 경우에만 Firestore 문서를 업데이트합니다.
        if (Object.keys(updateData).length > 0) {
          await updateDoc(wordRef, updateData);
          console.log("단어장 업데이트 성공");
        } else {
          console.log("업데이트할 데이터가 없습니다.");
        }

        await dispatch("fetchWords"); // 업데이트 후 단어장 목록을 새로고침합니다.
      } catch (error) {
        console.error("단어장 업데이트 중 오류 발생:", error);
        throw error;
      }
    },
    updateCurrentWordID({ commit }, wordID) {
      commit("setCurrentWordID", wordID);
    },
  },

  // Getters
  getters: {
    getWords: (state) => state.words,
    getCurrentWordID: (state) => state.currentWordID,
  },
};
