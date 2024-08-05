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
    kanjiList: [
      "政", "党", "経", "現", "性", "制", "務", "総", "領", "設",
      "保", "権", "支", "報", "済", "解", "資", "際", "査", "判",
      "認", "在", "件", "団", "任", "論", "増", "情", "示", "基",
      "革", "価", "確", "勢", "減", "容", "応", "演", "歳", "能",
      "再", "格", "疑", "過", "税", "検", "常", "状", "営", "職",
      "与", "供", "可", "構", "割", "比", "難", "防", "補", "優",
      "収", "断", "違", "境", "規", "術", "展", "導", "備", "宅",
      "条", "独", "警", "輸", "訪", "述", "率", "武", "域", "張",
      "限", "額", "環", "欧", "担", "退", "準", "造", "被", "技",
      "復", "渡", "移", "個", "評", "若", "脳", "含", "蔵", "非",
      "段", "製", "況", "財", "識", "呼", "針", "専", "程", "値",
      "突", "接", "授", "効", "湾", "処", "旧", "否", "師", "批",
      "易", "存", "券", "座", "破", "編", "捜", "除", "降", "超",
      "責", "並", "療", "修", "捕", "危", "採", "拡", "故", "介",
      "迎", "販", "異", "将", "因", "幅", "富", "彼", "般", "貿",
      "講", "舞", "装", "諸", "亡", "劇", "河", "適", "婦", "寄",
      "込", "余", "禁", "逆", "換", "久", "妻", "暴", "占", "背",
      "険", "頼", "均", "途", "圧", "許", "署", "抜", "伸", "留",
      "罪", "爆", "延", "精", "則", "乱", "普", "測", "豊", "善",
      "婚", "厚", "齢", "略", "承", "浮", "絶", "押", "倒", "了",
      "庁", "城", "層", "版", "絡", "損", "募", "裏", "払", "仏",
      "績", "築", "志", "混", "昇", "勤", "遅", "居", "雑", "招",
      "困", "永", "著", "誌", "刊", "像", "香", "更", "刻", "賛",
      "抱", "犯", "布", "恐", "宇", "戻", "巨", "震", "越", "欲",
      "痛", "触", "依", "汚", "枚", "互", "複", "郵", "似", "恵",
      "探", "逃", "骨", "傾", "届", "迷", "夢", "巻", "燃", "閉",
      "緒", "駐", "賃", "紹", "雇", "暮", "替", "預", "簡", "臓",
      "律", "贈", "宙", "薄", "群", "操", "奥", "詰", "双", "刺",
      "到", "寝", "壁", "仮", "純", "盗", "吸", "看", "翌", "快",
      "片", "敬", "悩", "泉", "御", "荒", "硬", "埋", "袋", "忘",
      "吹", "宝", "封", "胸", "娘", "砂", "誤", "賢", "腕", "較",
      "床", "慣", "尊", "窓", "柔", "殿", "濃", "液", "貧", "肩",
      "零", "怒", "祖", "幼", "泊", "杯", "甘", "掃", "掘", "疲",
      "捨", "皆", "軟", "沈", "凍", "腹", "乳", "煙", "恋", "紅",
      "郊", "腰", "踊", "冊", "眠", "怖", "珍", "卵", "狭", "喫",
      "干", "頂", "溶", "暖", "鉱", "涙", "匹", "鋭", "枝", "塗",
      "軒", "晩", "叫", "拝", "乾", "棒", "祈", "髪", "忙", "綿",
      "汗", "銅", "湿", "咲", "召", "脂", "蒸", "肌", "靴", "耕",
      "鈍", "恥", "泥", "隅", "偶", "辛", "磨", "姓", "筒", "粒",
      "詞", "偉", "畳", "机", "膚", "濯", "猫", "塔", "沸", "灰",
      "菓", "帽", "枯", "涼", "舟", "符", "憎", "肯", "燥", "畜",
      "坊", "挟", "曇", "滴", "伺"


    ],
    missingKanjis: [], // 데이터베이스에 없는 한자를 저장하기 위한 상태
  },
  
  // Mutations
  mutations: {
    setKanjis(state, kanjis) {
      state.kanjis = kanjis;
    },
    setSearchResults(state, results) {
      state.searchResults = results;
    },
    setMissingKanjis(state, missingKanjis) {
      state.missingKanjis = missingKanjis;
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
    async compareKanjis({ commit, state }) {
      console.log ('compareKanjis!!')
      try {
        const kanjisRef = collection(db, "kanjis");
        const querySnapshot = await getDocs(kanjisRef);
        const dbKanjis = new Set();
        querySnapshot.forEach((doc) => {
          dbKanjis.add(doc.data().kanji);
        });

        const missingKanjis = state.kanjiList.filter(kanji => !dbKanjis.has(kanji));

        commit("setMissingKanjis", missingKanjis);
      } catch (error) {
        console.error("한자 비교 실패:", error);
        throw error;
      }
    },
  },

  // Getters
  getters: {
    getKanjis: (state) => state.kanjis,
    getSearchResults: (state) => state.searchResults,
    getMissingKanjis: (state) => state.missingKanjis,
  },
};
