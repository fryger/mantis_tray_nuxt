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
        />
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
import axios from "axios";
import Detail from "../../components/Detail.vue";
export default {
  components: { Detail },
  data() {
    return {
      issue: {}
    };
  },
  created() {
    axios
      .get(
        `http://localhost/mantisbt/api/rest/issues/${this.$route.params.id}`,
        {
          headers: {
            Authorization: "G3DULoH_dLe8G_Z0Zj6Brh-nSgdeRaWF"
          }
        }
      )
      .then(
        response => (
          (this.issue = response.data.issues[0]),
          console.log(response.data.issues)
        )
      );
  }
};
</script>
