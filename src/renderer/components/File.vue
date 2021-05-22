<template>
  <div>
    <a @click.prevent="downloadItem(attachment)">{{ attachment.filename }}</a>
  </div>
</template>

<script>
import axios from "axios";
const fs = require("fs");
const { dialog } = require("electron").remote;
const { remote } = require("electron");
let config = [];
remote.getGlobal("settings").get("config", function(error, data) {
  config = data;
});
export default {
  name: "File",
  props: ["attachment"],
  methods: {
    b64toBlob(dataURI, mime) {
      const byteString = atob(dataURI);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mime });
    },
    downloadItem({ id }) {
      axios
        .get(config.api_url + `/issues/${this.$route.params.id}/files/${id}`, {
          headers: {
            Authorization: config.api_key
          }
        })
        .then(response => {
          const element = response.data.files[0];
          const options = {
            title: "Select photo folder:",
            defaultPath: element.filename,
            filters: [
              { name: "All Files", extensions: ["*"] },
              { name: "Images", extensions: ["jpg", "png", "gif"] },
              { name: "Movies", extensions: ["mkv", "avi", "mp4"] },
              { name: "PDF", extensions: ["pdf"] },
              { name: "Text", extensions: ["txt"] },
              {
                name: "Office",
                extensions: [
                  "doc",
                  "docx",
                  "docm",
                  "xls",
                  "xlm",
                  "xlsx",
                  "xlsm",
                  "ppt",
                  "pps",
                  "pptm",
                  "pptx",
                  "ppsx",
                  "sldx",
                  "sldm",
                  "one",
                  "xps",
                  "csv"
                ]
              },
              { name: "Archive", extensions: ["7zip", "rar", "zip"] }
            ]
          };
          const buffer = Buffer.from(element.content, "base64");
          dialog.showSaveDialog(options).then(result =>
            fs.writeFile(result.filePath, buffer, function(err) {
              if (err) {
                console.log(
                  "An error ocurred creating the file " + err.message
                );
              }
            })
          );
        })
        .catch(console.error);
    }
  }
};
</script>

<style scoped></style>
