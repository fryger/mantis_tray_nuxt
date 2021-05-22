<template>
  <nuxt-link :to="'/' + id">
    <v-card hover outlined class="card mt-1" :style="issueColor">
      <v-card-title>{{ project }}</v-card-title>
      <v-card-subtitle>{{ summary }}</v-card-subtitle>
    </v-card>
  </nuxt-link>
</template>

<script>
export default {
  name: 'Issue',
  props: ['id', 'summary', 'project', 'color'],
  computed: {
    issueColor () {
      return {
        background: `linear-gradient(90deg, #ffffff 60%, ${this.color} 100%)`
      }
    }
  }
}
</script>

<style scoped>
a {
  text-decoration: none !important;
}
</style>
