<template>
  <h1>Test</h1>
</template>

<script>
export default {
  data() {
    return {
      data: null
    };
  },
  created() {
    axios
      .get("http://localhost/mantisbt/api/rest/issues?filter_id=reported", {
        headers: {
          Authorization: "G3DULoH_dLe8G_Z0Zj6Brh-nSgdeRaWF"
        }
      })
      .then(
        response => (
          (this.data = response.data.issues), console.log(response.data.issues)
        )
      );
  }
};
</script>

<style></style>
