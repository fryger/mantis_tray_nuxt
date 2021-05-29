<template>
  <div>
    <v-toolbar elevation="0">
      <v-spacer />
      <v-toolbar-title>Szczegóły zgłoszenia</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-simple-table>
      <tbody>
        <Detail :title="'Numer zgłoszenia'" :value="issue.id" />
        <Detail
          :title="'Projekt'"
          :value="issue.project && issue.project.name"
        />
        <Detail
          :title="'Przypisany'"
          :value="issue.hasOwnProperty('handler') ? issue.handler.name : ''"
        />
        <Detail
          :title="'Status'"
          :value="issue.status && issue.status.label"
          :color="issue.status && issue.status.color"
        />
      </tbody>
    </v-simple-table>
    <v-toolbar elevation="0">
      <v-spacer />
      <v-toolbar-title>Załączniki</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-simple-table>
      <tbody>
        <tr v-for="attachment in issue.attachments" :key="attachment.id">
          <td>
            <File :attachment="attachment" />
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-toolbar elevation="0">
      <v-spacer />
      <v-toolbar-title>Komentarze</v-toolbar-title>
      <v-spacer />
    </v-toolbar>
    <v-simple-table>
      <tbody>
        <Detail
          v-for="comment in issue.notes"
          :key="comment.id"
          :title="comment.reporter.name"
          :value="comment.text"
          :attachment="comment.attachments"
        />
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";
import Detail from "../../components/Detail.vue";
import File from "../../components/File.vue";
const { remote } = require("electron");
let config = [];
remote.getGlobal("settings").get("config", function(error, data) {
  config = data;
});
export default {
  components: { Detail, File },
  data() {
    return {
      issue: {}
    };
  },
  mounted() {
    this.feetchData();
    this.intervalFetchData();
  },
  methods: {
    feetchData: function() {
      axios
        .get(config.api_url + `/issues/${this.$route.params.id}`, {
          headers: {
            Authorization: config.api_key
          }
        })
        .then(response => (this.issue = response.data.issues[0]))
        .catch(error => console.log(error));
    },
    intervalFetchData: function() {
      setInterval(() => {
        this.feetchData();
      }, 60000);
    }
  }
};
</script>
