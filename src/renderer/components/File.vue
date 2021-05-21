<template>
  <div>
    <a @click.prevent="downloadItem(attachment)">{{ attachment.filename }}</a>
  </div>
</template>

<script>
import axios from "axios";
const fs = require("fs");
const { dialog } = require("electron").remote;
export default {
  name: "File",
  props: ["attachment"],
  methods: {
    b64toBlob(dataURI, mime) {
      var byteString = atob(dataURI);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mime });
    },
    downloadItem({ id }) {
      axios
        .get(
          `http://localhost/mantisbt/api/rest/issues/${this.$route.params.id}/files/${id}`,
          {
            headers: {
              Authorization: "G3DULoH_dLe8G_Z0Zj6Brh-nSgdeRaWF"
            }
          }
        )
        .then(response => {
          let element = response.data.files[0];
          let options = {
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
          var buffer = Buffer.from(element.content, "base64");
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
