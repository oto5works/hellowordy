<template>
  <div class="navbar">
    <buttonNav
      title="Home"
      :class="{ selected: activeTab === 'home' }"
      @click="navigateToHome()"
      ><icon><home /></icon
    ></buttonNav>
    <buttonNav
      title="Voca"
      :class="{ selected: activeTab === 'voca' }"
      @click="navigateToVoca()"
      ><icon><book /></icon
    ></buttonNav>
    <buttonNav
      title="Anki"
      :class="{ selected: activeTab === 'anki' }"
      @click="navigateToAnki()"
      ><icon><anki /></icon
    ></buttonNav>
    <buttonNav
      title="My"
      :class="{ selected: activeTab === 'my' }"
      @click="navigateToMy()"
      ><icon><user /></icon
    ></buttonNav>
    <div class="underlay" />
  </div>
</template>

<script>
import home from "@/components/icon/home.vue";
import book from "@/components/icon/book.vue";
import anki from "@/components/icon/anki.vue";
import user from "@/components/icon/user.vue";

export default {
  components: {
    home,
    book,
    anki,
    user,
  },
  computed: {
    activeTab() {
      switch (this.$route.name) {
        case "home":
          return "home";
        case "voca":
          return "voca";
        case "anki":
          return "anki";
        case "my":
          return "my";
        default:
          return null; // 현재 라우트에 해당하는 탭이 없을 경우
      }
    },
  },
  methods: {
    navigateToHome() {
      this.$router.push({ name: "home" });
    },
    navigateToVoca() {
      this.$router.push({ name: "voca" });
    },
    navigateToAnki() {
      this.$router.push({ name: "anki" });
    },
    navigateToMy() {
      this.$router.push({ name: "my" });
    },
  },
};
</script>

<style scoped>
.navbar {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 56px;
  padding: 0 var(--mio-theme-padding-1);
  color: rgb(var(--mio-theme-color-on-background));
  background-color: rgb(var(--mio-theme-color-background));
  z-index: 1000;
}
.navbar .underlay {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(var(--mio-theme-color-on-background), 0.12);
}
</style>
