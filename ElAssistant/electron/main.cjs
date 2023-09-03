const {app,globalShortcut, ipcMain }  = require('electron')
const windowManager = require('./windowManager.cjs');
app.whenReady().then(()=>{
  windowManager.createMainWindow();
  require('./register.cjs')
})
app.on('will-quit', () => {
    // 在应用程序退出时取消注册全局快捷键
    globalShortcut.unregisterAll();
});
  
  //主进程发送消息
//   window.webContents.send()
//   处理完后发送消息 BorwserWindow.fromWebContents(event.sender).send('mag','xxxx')
// invoke handle return dialog