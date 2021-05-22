<template>
  <div>
    <Issue
      v-for="issue in issues"
      :id="issue.id"
      :key="issue.id"
      :summary="issue.summary"
      :project="issue.project.name"
      :color="issue.status.color"
    />
  </div>
</template>

<script>
import axios from "axios";
import Issue from "../components/Issue.vue";
const { remote } = require("electron");
let config = [];
remote.getGlobal("settings").get("config", function(error, data) {
  config = data;
});

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
      .get(config.api_url + "/issues?filter_id=reported", {
        headers: {
          Authorization: config.api_key
        }
      })
      .then(response => (this.issues = response.data.issues));
  }
};
</script>

<style></style>
