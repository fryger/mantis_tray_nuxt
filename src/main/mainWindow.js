import BrowserWinHandler from "./BrowserWinHandler";
global.settings = require("electron-app-settings");

settings.set("config", {
  api_url: "http://localhost/mantisbt/api/rest",
  api_key: "G3DULoH_dLe8G_Z0Zj6Brh-nSgdeRaWF"
});

const winHandler = new BrowserWinHandler({
  width: 400,
  height: 600,
  frame: false,
  resizable: false,
  show: false,
  webPreferences: {
    webSecurity: false,
    enableRemoteModule: true
  }
});

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage("/");
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
});

export default winHandler;
