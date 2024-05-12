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
    countdown: null,
  },
  // Mutations
  mutations: {
    setCountdown(state, payload) {
      state.countdown = payload;
    },
  },
  // Actions
  actions: {
    async createCountdown({ dispatch, rootGetters }, payload) {
      try {
        const userID = rootGetters["users/getUserID"]; // 현재 사용자의 ID를 가져옵니다.

        // countdown 객체 생성
        const countdownData = {
          userID: userID,
          title: payload.title, // 제목
          date: payload.date, // 날짜
          createdAt: new Date().toISOString(), // 생성 시간
        };

        // countdown 객체를 Firestore에 저장
        // doc() 함수를 사용하여 userID와 동일한 ID를 가진 문서 참조를 생성합니다.
        // setDoc() 함수를 사용하여 해당 문서 참조에 countdownData를 저장합니다.
        await setDoc(doc(db, "countdowns", userID), countdownData);

        // 성공적으로 저장되면, 어떤 후속 처리가 필요한지에 따라 추가 액션을 디스패치할 수 있습니다.
        dispatch("getCountdown");
      } catch (error) {
        console.error("Countdown 생성 중 오류 발생:", error);
        // 오류 처리를 위한 액션을 디스패치하거나, 오류 메시지를 상태에 저장할 수 있습니다.
        // 예: dispatch('handleError', error);
      }
    },
    async updateCountdown({ dispatch, rootGetters }, payload) {
      try {
        const userID = rootGetters["users/getUserID"]; // 현재 사용자의 ID를 가져옵니다.

        // userID와 동일한 ID를 가진 countdown 문서 참조를 가져옵니다.
        // 해당 문서에 대해 updateDoc 함수를 사용하여 수정합니다.
        await updateDoc(doc(db, "countdowns", userID), {
          title: payload.title, // 수정할 제목
          date: payload.date, // 수정할 날짜
          // 필요에 따라 다른 필드도 수정할 수 있습니다.
        });

        // 성공적으로 수정되었다면, 상태 업데이트나 추가적인 액션을 디스패치할 수 있습니다.
        dispatch("getCountdown");
      } catch (error) {
        console.error("Countdown 수정 중 오류 발생:", error);
        // 오류 처리를 위한 액션을 디스패치하거나, 오류 메시지를 상태에 저장할 수 있습니다.
        // 예: dispatch('handleError', error);
      }
    },
    async getCountdown({ dispatch, commit, rootGetters }) {
      try {
        // 사용자 인증 상태 준비를 기다립니다.
        await dispatch("users/ensureAuthReady", {}, { root: true });

        const userID = rootGetters["users/getUserID"];
        console.log("userID:", userID);
        if (!userID) {
          throw new Error("사용자 인증 정보가 누락되었습니다.");
        }
        // 주어진 userID를 사용하여 Firestore에서 해당 countdown 문서의 참조를 가져옵니다.
        const docRef = doc(db, "countdowns", userID);

        // 해당 문서의 데이터를 가져옵니다.
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // 문서가 존재하면, 문서의 데이터를 가져와서 상태를 업데이트합니다.
          // 여기서는 예시로 mutations의 setCountdown을 호출합니다.
          commit("setCountdown", docSnap.data());
        } else {
          // 문서가 존재하지 않는 경우, 적절한 처리를 합니다. 예를 들어, 상태를 초기화하거나 오류 메시지를 표시할 수 있습니다.
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Countdown 가져오기 오류 발생:", error);
        // 오류 처리를 위한 액션을 디스패치하거나, 오류 메시지를 상태에 저장할 수 있습니다.
        // 예: dispatch('handleError', error);
      }
    },
    async deleteCountdown({ rootGetters, commit }) {
      try {
        const userID = rootGetters["users/getUserID"]; // 현재 사용자의 ID를 가져옵니다.

        // userID와 동일한 ID를 가진 countdown 문서 참조를 가져옵니다.
        // 해당 문서를 삭제합니다.
        await deleteDoc(doc(db, "countdowns", userID));
        commit("setCountdown", null);
        // 성공적으로 삭제되었다면, 상태 업데이트나 추가적인 액션을 디스패치할 수 있습니다.
        // 예: commit('clearCountdown');
      } catch (error) {
        console.error("Countdown 삭제 중 오류 발생:", error);
        // 오류 처리를 위한 액션을 디스패치하거나, 오류 메시지를 상태에 저장할 수 있습니다.
        // 예: dispatch('handleError', error);
      }
    },
  },

  // Getters
  getters: {
    getCountdown: (state) => state.countdown,
  },
};
