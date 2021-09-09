<template>
  <v-app>
    <div>
      <AppHeader />
      <Nuxt />
    </div>
  </v-app>
</template>

<script>
import AppHeader from '../components/AppHeader.vue'

export default {
  components: {
    AppHeader
  },
  mounted () {
   this.$store.dispatch('todos/getProjects')
   this.$store.dispatch('todos/getConfig')
  }
}
</script>

<style>
html {
  overflow: scroll;
  overflow-x: hidden;
}
body {
  margin: 0 !important;
  font-family: "Roboto", sans-serif;
}
::-webkit-scrollbar {
  width: 0;
}
</style>
