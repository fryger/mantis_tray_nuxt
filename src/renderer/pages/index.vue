<template>
  <div>
    <Issue
      v-for="issue in issues"
      :key="issue.id"
      :summary="issue.summary"
      :project="issue.project.name"
      :color="issue.status.color"
      :id="issue.id"
    />
  </div>
</template>

<script>
import axios from "axios";
import Issue from "../components/Issue.vue";
export default {
  components: {
    Issue
  },
  data() {
    return {
      issues: []
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
          (this.issues = response.data.issues),
          console.log(response.data.issues)
        )
      );
  }
};
</script>

<style></style>
