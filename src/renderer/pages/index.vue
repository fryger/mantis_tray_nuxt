<template>
  <div>
    <div class="spinner">
      <vue-loading
        v-if="loading"
        type="spiningDubbles"
        color="#8BDF1F"
        :size="{ width: '100px', height: '100px' }"
      ></vue-loading>
    </div>
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
import { VueLoading } from "vue-loading-template";
const { remote } = require("electron");
let config = [];
remote.getGlobal("settings").get("config", function(error, data) {
  config = data;
});

export default {
  components: {
    Issue,
    VueLoading
  },
  data() {
    return {
      issues: [],
      loading: false
    };
  },
  mounted() {
    this.feetchData();
    this.intervalFetchData();
  },
  methods: {
    feetchData() {
      this.loading = true;
      axios
        .get(config.api_url + "/issues?filter_id=reported", {
          headers: {
            Authorization: config.api_key
          }
        })
        .then(
          response => (
            (this.issues = response.data.issues), (this.loading = false)
          )
        )
        .catch(error => console.log(error));
    },
    intervalFetchData() {
      setInterval(() => {
        this.feetchData();
      }, 60000);
    }
  }
};
</script>

<style scoperd>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
