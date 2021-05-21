<template>
  <div>
    <v-form>
      <v-toolbar elevation="0">
        <v-spacer />
        <v-toolbar-title>API URL</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-simple-table>
        <tbody>
          <tr>
            <td>
              <v-text-field v-model="apiurl"></v-text-field>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-toolbar elevation="0">
        <v-spacer />
        <v-toolbar-title>API KEY</v-toolbar-title>
        <v-spacer />
      </v-toolbar>
      <v-simple-table>
        <tbody>
          <tr>
            <td>
              <v-text-field v-model="apikey"></v-text-field>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
      <v-footer class="footer">
        <v-btn block normal @click="setConfig">Ustaw wartości</v-btn>
      </v-footer>
    </v-form>
  </div>
</template>

<script>
const { remote } = require("electron");

export default {
  data() {
    return {
      apiurl: "",
      apikey: ""
    };
  },
  created() {
    let config = remote.getGlobal("settings").get("config");
    this.apiurl = config["api_url"];
    config["api_key"].length > 0
      ? (this.apikey = config["api_key"])
      : (this.apikey = "Proszę uzupełnić klucz api");
  },
  methods: {
    setConfig(a) {
      console.log(this.apikey);
    }
  }
};
</script>
<style scoped>
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
