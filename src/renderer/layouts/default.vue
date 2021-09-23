<template>
  <v-app app>
    <v-app-bar app fixed>
      <AppHeader />
    </v-app-bar>
    <v-content>
      <Nuxt />
    </v-content>
  </v-app>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";

export default {
  components: {
    AppHeader
  },
  mounted() {
    this.$store.dispatch("todos/getProjects");
    this.$store.dispatch("todos/getConfig");
  }
};
</script>

<style>
.v-main__wrap,
.-content__wrap {
  overflow: auto;
  height: 90vh;
}
html {
  overflow: hidden;
}
body {
  margin: 0 !important;
  font-family: "Roboto", sans-serif;
}

.v-toolbar__content {
  padding: 0px !important;
}

::-webkit-scrollbar {
  width: 15px;
}

::-webkit-scrollbar-track {
  background: #e6e6e6;
  border-left: 1px solid #dadada;
}

::-webkit-scrollbar-thumb {
  background: #b0b0b0;
  border: solid 3px #e6e6e6;
  border-radius: 7px;
}
</style>
