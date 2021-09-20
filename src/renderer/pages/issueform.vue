<template>
  <div>
    <v-form ref="form">
      <v-simple-table>
        <tbody>
          <tr>
            <td>
              <v-select
                v-model="category"
                :items="projects"
                item-text="name"
                label="Wybierz temat zgłoszenia"
                :rules="rules.required"
                return-object
                required
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <GardensDevForm
        v-if="category.name == 'Gardens - rozwój'"
        v-bind="dialog"
      />
      <v-container v-else>
        <v-toolbar elevation="0">
          <v-spacer />
          <v-toolbar-title>Temat</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <table>
          <tbody>
            <tr>
              <td>
                <v-text-field
                  rounded
                  filled
                  prepend-inner-icon="mdi-pencil"
                  v-model="summary"
                  :rules="rules.required"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <v-toolbar elevation="0">
          <v-spacer />
          <v-toolbar-title>Opis</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <table>
          <tbody>
            <tr>
              <td>
                <v-textarea
                  rounded
                  background-color="rgb(240,240,240)"
                  prepend-inner-icon="mdi-pencil"
                  v-model="description"
                  solo
                  rows="4"
                  label="Opis problemu"
                  :rules="rules.required"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </v-container>

      <v-toolbar elevation="0">
        <v-spacer />
        <v-toolbar-title>Załącznik</v-toolbar-title>

        <v-spacer />
      </v-toolbar>
      <v-simple-table>
        <tbody>
          <tr>
            <td>
              <input ref="file" type="file" @change="handleFileUpload()" />
            </td>
            <td>
              <div class="darken-2 ">
                <span class="red--text text-left"
                  >Max.
                  {{ (attachment_size / (1024 * 1024)).toFixed(0) }} Mb</span
                >
              </div>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-btn block @click="validateForm"> Wyślij</v-btn>
    </v-form>
    <v-dialog v-model="dialog">
      <v-alert class="ma-0" type="error">Formularz zawiera błędy!</v-alert>
    </v-dialog>
  </div>
</template>
<script>
import axios from "axios";
import GardensDevForm from "../components/GardensDevForm.vue";
const { remote } = require("electron");
const { ipcRenderer } = require("electron");
let config = [];
remote.getGlobal("settings").get("config", function(error, data) {
  config = data;
});

export default {
  components: {
    GardensDevForm
  },
  data() {
    return {
      dialog: false,
      rules: {
        required: [value => !!value || "Pole wymagane"]
      },
      projects: [],
      attachment_size: "",
      category: "",
      summary: "",
      description: "",
      file: "",
      file_name: "",
      custom_field_4: "",
      custom_field_5: "",
      custom_field_8: "",
      custom_field_10: "",
      custom_field_9: "",
      custom_field_11: ""
    };
  },
  created() {
    this.projects = this.$store.state.todos.list;
    this.attachment_size = this.$store.state.todos.attachmentSize;
  },
  methods: {
    sendIssue() {
      axios
        .post(
          config.api_url + "/issues",
          {
            summary: this.summary,
            description: this.description,
            project: {
              id: this.category.id
            },
            category: {
              id: 1
            },
            files: [
              {
                name: this.file_name,
                content: this.file
              }
            ],
            custom_fields: [
              {
                field: {
                  id: 4
                },
                value: this.$store.state.gardensForm.form.custom_field_4
              },
              {
                field: {
                  id: 5
                },
                value: this.$store.state.gardensForm.form.custom_field_5
              },
              {
                field: {
                  id: 8
                },
                value: this.$store.state.gardensForm.form.custom_field_8
              },
              {
                field: {
                  id: 10
                },
                value: this.$store.state.gardensForm.form.custom_field_10
              },
              {
                field: {
                  id: 9
                },
                value: this.$store.state.gardensForm.form.custom_field_9
              },
              {
                field: {
                  id: 11
                },
                value: this.$store.state.gardensForm.form.custom_field_11
              }
            ]
          },
          {
            headers: {
              Authorization: config.api_key
            }
          }
        )
        .then(res => this.$router.push("/"));
    },
    validateForm() {
      if (this.category.name == "Gardens - rozwój") {
        this.summary = this.$store.state.gardensForm.form.summary;
        this.description = this.$store.state.gardensForm.form.description;
      }
      if (this.$refs.form.validate()) {
        this.sendIssue();
      } else {
        this.dialog = true;
      }
    },
    handleFileUpload() {
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
    }
  }
};
</script>
<style scoped>
table {
  width: 100%;
}
</style>
