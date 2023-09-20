const {mainWindow}= require('./windowManager.cjs');
const {globalShortcut, screen }  = require('electron')
const windowManager = require('./windowManager.cjs');
let isShow = true
const { width: screenWidth } = screen.getPrimaryDisplay().workAreaSize;
   //注册快捷键
    //打开控制台
    globalShortcut.register('CommandOrControl+Shift+I', function () {
        mainWindow.note.webContents.openDevTools()
      })
    //移动窗口
     // 注册全局快捷键监听箭头按键
  globalShortcut.register('Shift+Left', () => {
    // 向左移动窗口
    const [x,y] = mainWindow.window.getPosition();
    mainWindow.window.setPosition(x - 10, y);
  });

  globalShortcut.register('Shift+Right', () => {
    // 向右移动窗口
    const [x,y]  = mainWindow.window.getPosition();
    mainWindow.window.setPosition(x + 10, y);
  });

  globalShortcut.register('Shift+Up', () => {
    // 向上移动窗口
    const [x,y]  = mainWindow.window.getPosition();
    mainWindow.window.setPosition(x, y - 10);
  });

  globalShortcut.register('Shift+Down', () => {
    // 向下移动窗口
    const [x,y]  = mainWindow.window.getPosition();
    mainWindow.window.setPosition(x, y + 10);
  });
  //隐藏 mmd
    // 注册全局快捷键 Shift + H
    globalShortcut.register('Shift+H', () => {
      if(isShow){
        mainWindow.window.hide()
      }else{
        mainWindow.window.showInactive()
      }
      isShow=!isShow
      // 检查当前窗口的最小化状态
      // if (mainWindow.window.isMinimized()) {
      //   // 如果窗口已最小化，则恢复正常状态
      //   mainWindow.window.restore();
      // } else {
      //   // 否则，最小化窗口
      //   mainWindow.window.minimize();
      // }
    });
  //最大化
    // 注册全局快捷键 Shift + L
    globalShortcut.register('Shift+L', () => {
      const { width: windowWidth } = mainWindow.window.getBounds();
    if (windowWidth >screenWidth-50&&windowWidth<screenWidth+50) {
      mainWindow.window.setFullScreen(false)
    } else {
      mainWindow.window.setFullScreen(true)
    }
    });
//播放音乐
globalShortcut.register('Shift+M', () => {
    // 检查当前窗口的最小化状态
    mainWindow.window.webContents.send('playMusic')
  });
  //展示时钟
  //播放音乐
globalShortcut.register('Shift+C', () => {
  // 检查当前窗口的最小化状态
  mainWindow.window.focus()
  mainWindow.window.webContents.send('showClock')
});
//展示语音输入
globalShortcut.register('Shift+Y', () => {
  mainWindow.window.focus()
  mainWindow.window.webContents.send('showYuyin')
});
//展示计时器
globalShortcut.register('Shift+T', () => {
  mainWindow.window.webContents.send('showTimeCount')
});
//显示黑幕
globalShortcut.register('Shift+B', () => {
  if(!windowManager.mainWindow.mask){
    windowManager.createMask()
  }else{
    windowManager.mainWindow.mask.close()
  }
});
//显示note
globalShortcut.register('Shift+F', () => {
  if(!windowManager.mainWindow.note){
    windowManager.createNote()
  }else{
    windowManager.mainWindow.note.close()
  }
});
//放大缩小黑圈
globalShortcut.register('Shift+A', () => {
  mainWindow.mask.webContents.send('toBig')

});
globalShortcut.register('Shift+D', () => {
  mainWindow.mask.webContents.send('toSmall')
  
});
globalShortcut.register('Shift+W', () => {
  mainWindow.mask.webContents.send('toLight')

});
globalShortcut.register('Shift+S', () => {
  mainWindow.mask.webContents.send('toDark')
  
});