import BrowserWinHandler from './BrowserWinHandler'

global.settings = require('electron-json-storage')
const dataPath = settings.getDataPath()


settings.get('config', function (error, data) {
  if (error) {
    console.log('error')
  }
  if (Object.keys(data).length == 0) {
    console.log('Data')
    settings.set(
      'config',
      {
        api_url: 'Ustaw adres systemu mantis',
        api_key: 'Ustaw klucz api'
      },
      function (error) {
        if (error) throw error
      }
    )
  }
})

const winHandler = new BrowserWinHandler({
  width: 550,
  height: 600,
  frame: false,
  resizable: false,
  show: false,
  skipTaskbar: true,
  webPreferences: {
    webSecurity: false,
    enableRemoteModule: true
  }
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/error')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})


export default winHandler

