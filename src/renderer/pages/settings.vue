<template>
  <h1>Settings</h1>
</template>

<script>
const electron = require("electron");
const fs = require("fs");
const path = require("path");
export default {
  created() {
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );
    console.log(userDataPath);
  }
};
</script>
