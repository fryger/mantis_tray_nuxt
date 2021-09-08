<template>
  <div>
    <div class="spinner">
      <vue-loading
        v-if="loading"
        type="spiningDubbles"
        color="#8BDF1F"
        :size="{ width: '100px', height: '100px' }"
      />
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
import axios from 'axios'
import { VueLoading } from 'vue-loading-template'
import Issue from '../components/Issue.vue'
const { remote } = require('electron')
let config = []
remote.getGlobal('settings').get('config', function (error, data) {
  config = data
})

export default {
  components: {
    Issue,
    VueLoading
  },
  data () {
    return {
      issues: [],
      loading: false
    }
  },
  mounted () {
    this.feetchData()
  },
  methods: {
    async feetchData () {
      this.loading = true
      await axios
        .get(config.api_url + '/issues?filter_id=reported', {
          headers: {
            Authorization: config.api_key
          }
        })
        .then(
          response => (
            (this.issues = response.data.issues), (this.loading = false)
          )
        )
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoperd>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
