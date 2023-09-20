const {app,globalShortcut,ipcMain,screen }  = require('electron')
const windowManager = require('./windowManager.cjs');
const Store = require('electron-store');
let refreshClock
let store
app.whenReady().then(()=>{
  windowManager.createMainWindow();
  require('./register.cjs')
  const {setClock} = require('./clock.cjs')
  const {MainStore} = require('./store.cjs')
  store = MainStore
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
  ipcMain.handle('storeGet',(_,key)=>{
    return store.get(key)
  })
  ipcMain.on('storeSet',(_,[key,data])=>{
    store.set(key,data)
  if(key==='clock'){
    refreshClock()
  }
  })
  ipcMain.on('storeDelete',(_,key)=>{
    store.delete(key)
  if(key==='clock'){
    refreshClock()
  }})