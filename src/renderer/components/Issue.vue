<template>
  <nuxt-link :to="'/' + id">
    <v-card hover outlined class="card ma-2" :style="issueColor">
      <v-card-title> {{ summary }} </v-card-title>
      <v-card-subtitle>{{ id }} - {{ project }}</v-card-subtitle>
    </v-card>
  </nuxt-link>
</template>

<script>
export default {
  name: "Issue",
  props: ["id", "summary", "project", "color"],
  computed: {
    issueColor() {
      return {
        background: `linear-gradient(90deg, #ffffff 60%, ${this.color} 100%)`
      };
    }
  }
};
</script>

<style scoped>
a {
  text-decoration: none !important;
}
</style>
