import BrowserWinHandler from './BrowserWinHandler'

const winHandler = new BrowserWinHandler({
  width: 400,
  height: 600,
  frame: false,
  resizable: false,
  show: false,
  webPreferences: {
    webSecurity: false
  }
})

winHandler.onCreated(_browserWindow => {
  winHandler.loadPage('/')
  // Or load custom url
  // _browserWindow.loadURL('https://google.com')
})

export default winHandler
