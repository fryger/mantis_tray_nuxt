<template>
  <v-toolbar dark>
    <img class="mr-3" :src="require('../assets/mantis_logo.png')" height="40">

    <v-toolbar-title>Mantis</v-toolbar-title>
    <v-spacer />
    <div>
      <v-btn
        v-for="item in menuItems"
        :key="item.id"
        :to="item.path"
        :color="item.color"
        fab
        small
        :class="item.class"
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </div>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      menuItems: [
        {
          path: '/',
          icon: 'mdi-home',
          color: 'indigo',
          class: 'ml-2'
        },
        {
          path: '/issueform',
          icon: 'fas fa-plus',
          color: 'green',
          class: 'ml-2'
        },
        {
          path: '/settings',
          icon: 'fas fa-cog',
          color: 'red',
          class: 'ml-2'
        }
      ]
    }
  }
}
</script>

<style scoped></style>
