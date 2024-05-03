<template>
  <div id="app">
    <input v-model="searchQuery" placeholder="검색어를 입력하세요">
    <button @click="fetchNaverEncycSearch">검색</button>
    <div v-if="searchResults">
      <h2>검색 결과:</h2>
      <ul>
        <li v-for="item in searchResults.items" :key="item.link">
          <a :href="item.link" target="_blank">{{ item.title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      searchQuery: '',
      searchResults: null
    };
  },
  methods: {
    fetchNaverEncycSearch() {
      var xhr = new XMLHttpRequest();
      var url = 'https://openapi.naver.com/v1/search/encyc';
      url += '?query=' + encodeURIComponent(this.searchQuery);

      xhr.open('GET', url);
      xhr.setRequestHeader("X-Naver-Client-Id", import.meta.env.VITE_NAVER_CLIENT_ID);
      xhr.setRequestHeader("X-Naver-Client-Secret", import.meta.env.VITE_NAVER_CLIENT_SECRET);
      xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
              var response = JSON.parse(xhr.responseText);
              this.searchResults = response; // 검색 결과를 data에 저장
          } else if (xhr.readyState === 4 && xhr.status !== 200) {
              console.error('검색 실패', xhr.responseText);
          }
      };
      xhr.send();
    }
  }
}
</script>
