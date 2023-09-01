const {BrowserWindow,app,screen,globalShortcut, ipcMain }  = require('electron')
const path =require('path')
const createApp = ()=>{
     const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const mainWindow =new BrowserWindow({
        width:300, 
        height:300,
        alwaysOnTop:true,
        x:width-400,
        y:height-400,
        frame:false,
        transparent:true,
        webPreferences:{
            preload:path.resolve(__dirname,'preload.cjs'),
            nodeIntegration:true 
        }
    })
    mainWindow.loadURL('http://localhost:5173/')
    //设置窗口比例
    mainWindow.setAspectRatio(1)

    //注册快捷键
    globalShortcut.register('CommandOrControl+Shift+I', function () {
        mainWindow.webContents.openDevTools()
      })
      globalShortcut.register('CommandOrControl+Shift+T', function () {
        mainWindow.webContents.send('halo','message')
      })
}
app.whenReady().then(()=>{
    createApp()
})
app.on('will-quit', () => {
    // 在应用程序退出时取消注册全局快捷键
    globalShortcut.unregisterAll();
});
  
  
  ipcMain.on('saveFile',()=>{
    console.log('saveFile')
  })
  //主进程发送消息
//   window.webContents.send()
//   处理完后发送消息 BorwserWindow.fromWebContents(event.sender).send('mag','xxxx')
// invoke handle return dialog