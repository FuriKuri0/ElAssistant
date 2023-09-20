const {app,globalShortcut,ipcMain,screen }  = require('electron')
const windowManager = require('./windowManager.cjs');
let refreshClock
app.whenReady().then(()=>{
  windowManager.createMainWindow();
  require('./register.cjs')
  const {setClock} = require('./clock.cjs')
  refreshClock = setClock
})
app.on('will-quit', () => {
    // 在应用程序退出时取消注册全局快捷键
    globalShortcut.unregisterAll();
});

  //监听渲染进程
  //闹钟刷新
ipcMain.on('refreshClock',()=>{
  refreshClock()
  })
//返回鼠标位置
  ipcMain.handle('getMousePosition',()=>{
    const { x, y } = screen.getCursorScreenPoint();
    return [x,y]
  })