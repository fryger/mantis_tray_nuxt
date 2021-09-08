<template>
  <div>
    <h1>Błąd w ładowaniu aplikacji</h1>
  </div>
</template>
<script>
export default {
  props: ['error_msg'],
  created(){
    this.$router.push('/')
  }
}
</script>
