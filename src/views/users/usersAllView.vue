<template>
  <div class="vocabulary-list">
    <table>
      <thead>
        <tr>
          <th>사용자 이메일</th>
          <th>사용자 이름</th>
          <th>상태</th>
          <th>가입 날짜</th>
          <th>작업</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td>{{ item.email }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.state }}</td>
          <td>{{ item.joinDate }}</td>
          <td>
            <button @click="editUser(item.id)">수정</button>
            <button @click="deleteUser(item.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      users: "users/getUsers",
    }),
  },
  created() {
    this.fetchAllUsers();
  },
  methods: {
    ...mapActions({
      fetchAllUsers: "users/fetchAllUsers",
      deleteUser: "users/deleteUser" // Vuex에서 제공하는 사용자 삭제 액션
    }),
    editUser(userId) {
      // 사용자 정보 수정 로직
      // 예: 특정 사용자 ID를 가지고 수정 페이지로 이동
      this.$router.push({ name: "EditUser", params: { userId: userId } });
    },
  },
};
</script>
