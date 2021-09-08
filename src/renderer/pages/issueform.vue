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
      <v-toolbar elevation="0">
        <v-spacer />
        <v-toolbar-title>Temat</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-simple-table>
        <tbody>
          <tr>
            <td>
              <v-text-field v-model="summary" :rules="rules.required" />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-toolbar elevation="0">
        <v-spacer />
        <v-toolbar-title>Opis</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-simple-table>
        <tbody>
          <tr>
            <td>
              <v-textarea
                v-model="description"
                solo
                rows="4"
                label="Opis problemu"
                :rules="rules.required"
              />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-toolbar elevation="0">
        <v-spacer />
        <v-toolbar-title>Załącznik</v-toolbar-title>

        <v-spacer />
      </v-toolbar>
      <v-simple-table>
        <tbody>
          <tr>
            <td>
              <input ref="file" type="file" @change="handleFileUpload()">
            </td>
            <td>
              <div class="darken-2 ">
                <span class="red--text text-left">Max. {{ attachment_size }} Mb</span>
              </div>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-btn block @click="validateForm"> Wyślij</v-btn>
    </v-form>
  </div>
</template>
<script>
import axios from 'axios'

const { remote } = require('electron')
let config = []
remote.getGlobal('settings').get('config', function (error, data) {
  config = data
})

export default {
  data () {
    return {
      rules: {
        required: [value => !!value || 'Pole wymagane']
      },
      projects: [],
      attachment_size: '',
      category: '',
      summary: '',
      description: '',
      file: '',
      file_name: ''
    }
  },
  async mounted () {
   await axios
      .get(config.api_url + '/projects/', {
        headers: {
          Authorization: config.api_key
        }
      })
      .then(response => (this.projects = response.data.projects)),
   await axios
      .get(config.api_url + '/config?option[]=max_file_size', {
        headers: {
          Authorization: config.api_key
        }
      })
      .then(
        response =>
          (this.attachment_size = (
            response.data.configs[0].value /
              (1024 * 1024)
          ).toFixed(0))
      )
  },
  methods: {
    sendIssue () {
      axios.post(
        config.api_url + '/issues',
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
          ]
        },
        {
          headers: {
            Authorization: config.api_key
          }
        }
      ).then(res => (this.$router.push('/')))
      
    },
    validateForm () {
      if (this.$refs.form.validate()) {
        this.sendIssue()
      }
    },
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
      const file = this.file
      this.file_name = file.name
      const reader = new FileReader()
      reader.onloadend = () => {
        this.file = reader.result.split(',')[1]
        console.log(reader.result)
      }
      if (file) {
        console.log(reader.readAsDataURL(file))
      }
    }
  }
}
</script>
<style scoped></style>
