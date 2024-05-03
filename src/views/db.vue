<template>
  <div class="routerView">
    <div class="title">Word List</div>
    <table>
      <thead>
        <tr>

          <th>Category</th>

          <th>Word</th>
          <th>Meaning</th>
          <th>Examples and Translations</th>
          <th>Created At</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in words" :key="word.id">
          <td>{{ word.category }}</td>

          <td>{{ word.word }}</td>
          <td>
            <ul>
              <li v-for="(mean, index) in word.mean" :key="index">{{ mean }}</li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="(example, index) in word.examples" :key="index">
                {{ example.sentence }} - {{ example.translation }}
              </li>
            </ul>
          </td>
          <td>{{ word.createdAt.toDate() | formatDate }}</td>

          <td>
             <button @click="deleteWord(word.id)">삭제</button>
             <button @click="editWord(word)">수정</button> <!-- 수정 버튼 추가 -->

          </td>
        </tr>
      </tbody>
    </table>
    <div class="buttonGroup">
      <btn class="submit selected" @click="handleBack"><icon><back /></icon></btn>
    </div>
  </div>
</template>




<script>
import { mapGetters, mapActions } from "vuex";
import db from "@/firebase/init.js";

import { collection, doc, getDocs, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import x from "@/components/icon/x.vue";

export default {
  components: { x },

  data() {
    return {
      words: [],
    };
  },

  async mounted() {
    await this.fetchWords();
  },

  methods: {
   async fetchWords() {
  try {
    this.words = []; // 목록을 불러오기 전에 배열을 비움
    const q = query(collection(db, "words"), orderBy("createdAt")); // createdAt 필드를 기준으로 정렬합니다.
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.words.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Error getting documents: ", e);
  }
},
    async deleteWord(wordId) {
      try {
        await deleteDoc(doc(db, "words", wordId));
        // 단어 목록을 다시 가져옵니다(옵션).
        this.fetchWords();
      } catch (e) {
        console.error("문서 삭제 중 오류 발생:", e);
        alert("단어 삭제 실패.");
      }
    },
  },
};
</script>


<style scoped>
.title {
  position: relative;
  width: 100%;
  top: -2px;
  font-family: var(--mio-theme-font-family-jp);
  font-weight: 600;
  font-size: 24px;
  margin-top: 40px;
  margin-bottom: 20px;
}
.sub-title {
  font-family: var(--mio-theme-font-family);
  font-weight: 300;
  text-transform: uppercase;
  font-size: 15px;
  margin-top: 40px;
  margin-bottom: 17px;
}
.word-button {
  flex: 1 1 50%;
}
.submit {
  width: 72px;
  height: 72px;
  flex-direction: column;
}
.word-field {
  position: relative;
  display: flex;
  gap: 12px;
  width: 100%;
  flex-wrap: wrap;
}

.word-field button {
  height: 40px;
  padding: 0 12px;
}

.example-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.example-index {
  margin-bottom: 9px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.buttonGroup {
  justify-content: flex-end;
}



table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: blue;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 5px;
}
</style>
