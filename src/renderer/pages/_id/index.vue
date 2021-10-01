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
    <div v-if="!loading">
      <v-toolbar elevation="0">
        <v-spacer />
        <v-toolbar-title>Szczegóły zgłoszenia</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-simple-table>
        <tbody>
          <Detail :title="'Numer zgłoszenia'" :value="issue.id" />
          <Detail :title="'Tytuł'" :value="issue.summary" />
          <Detail
            :title="'Projekt'"
            :value="issue.project && issue.project.name"
          />
          <Detail
            :title="'Przypisany'"
            :value="
              issue.hasOwnProperty('handler') ? issue.handler.real_name : ''
            "
          />
          <Detail
            :title="'Status'"
            :value="issue.status && issue.status.label"
            :color="issue.status && issue.status.color"
          />
          <Detail :title="'Treść'" :value="issue.description" />

          <Detail
            v-if="issue.project.name == 'Gardens - rozwój'"
            v-for="(element, id) in issue.custom_fields"
            :key="element.field.id"
            :title="issue.custom_fields[id].field.name"
            :value="issue.custom_fields[id].value"
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
            :title="comment.reporter.real_name"
            :value="comment.text"
            :attachment="comment.attachments"
          />
        </tbody>
      </v-simple-table>
      <v-form ref="form">
        <v-divider></v-divider>
        <v-textarea
          v-model="text"
          auto-grow
          dense
          outlined
          placeholder="Odpowiedź"
          rows="3"
          class="ma-2"
          >asd
        </v-textarea>
        <input
          ref="file"
          type="file"
          @change="handleFileUpload()"
          class="ma-2"
        />
        <v-btn block color="secondary" @click="validateForm">Wyślij</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Detail from "../../components/Detail.vue";
import File from "../../components/File.vue";
import { VueLoading } from "vue-loading-template";
const { remote } = require("electron");
let config = [];
remote.getGlobal("settings").get("config", function(error, data) {
  config = data;
});
export default {
  components: { Detail, File, VueLoading },
  data() {
    return {
      issue: {},
      text: "",
      file: "",
      file_name: "",
      loading: true
    };
  },
  mounted() {
    this.feetchData();
  },
  methods: {
    async sendResponse() {
      await axios
        .post(
          config.api_url + `/issues/${this.$route.params.id}/notes`,
          {
            text: this.text,
            view_state: { name: "public" },
            files: [
              {
                name: this.file_name,
                content: this.file
              }
            ]
          },
          {
            headers: {
              Authorization: config.api_key
            }
          }
        )
        .then(res => (this.feetchData(), (this.text = "")));
    },
    async feetchData() {
      this.loading = true;
      await axios
        .get(config.api_url + `/issues/${this.$route.params.id}`, {
          headers: {
            Authorization: config.api_key
          }
        })
        .then(
          response => (
            (this.issue = response.data.issues[0]), (this.loading = false)
          )
        )
        .catch(error => console.log(error));
    },
    validateForm() {
      if (true) {
        this.sendResponse();
      }
    },
    handleFileUpload() {
      try {
        this.file = this.$refs.file.files[0];
        const file = this.file;
        this.file_name = file.name;
        const reader = new FileReader();
        reader.onloadend = () => {
          this.file = reader.result.split(",")[1];
          console.log(reader.result);
        };
        if (file) {
          console.log(reader.readAsDataURL(file));
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
