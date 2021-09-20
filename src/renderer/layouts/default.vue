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
body {
  margin: 0 !important;
  font-family: "Roboto", sans-serif;
}

.v-toolbar__content {
  padding: 0px !important;
}
</style>
