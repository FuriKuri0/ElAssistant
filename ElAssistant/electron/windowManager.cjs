<<<<<<< HEAD
const { app,BrowserWindow,screen } = require('electron');
const path =require('path')
const MAINURL = 'http://localhost:5173'
// 存储窗口对象的变量
let mainWindow ={window:'',mask:'',note:''};
=======
const { BrowserWindow,screen } = require('electron');
const path =require('path')

// 存储窗口对象的变量
let mainWindow ={window:'',mask:''};
>>>>>>> 76eb1379223877fb856a3d20e474784ff61edffd

// 创建主窗口的函数
function createMainWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow.window =new BrowserWindow({
        width:500, 
        height:500,
        alwaysOnTop:true,
        x:width-500,
        y:height-600,
        frame:false,
<<<<<<< HEAD
        skipTaskbar:true,
        transparent:true,
        webPreferences:{
            preload:path.resolve(__dirname,'./preload/preload.js'),
            nodeIntegration:true ,
        }
    })
    if (app.isPackaged) {//生产环境
        mainWindow.window.loadFile(path.join(__dirname, '../renderer/index.html'))
      } else {//开发环境
        mainWindow.window.loadURL(`${MAINURL}`)
      }

=======
        transparent:true,
        webPreferences:{
            preload:path.resolve(__dirname,'./preload/preload.cjs'),
            nodeIntegration:true ,
        }
    })
    mainWindow.window.loadURL('http://localhost:5173')
>>>>>>> 76eb1379223877fb856a3d20e474784ff61edffd
    //设置窗口比例
    mainWindow.window.setAspectRatio(1)
    // 当窗口关闭时触发的事件
mainWindow.window.on('closed', () => {
    // 销毁窗口对象
    mainWindow.window.destroy();
  });
}
//创建黑幕窗口
function createMask() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    mainWindow.mask =new BrowserWindow({
        width:width, 
        height:height,
        alwaysOnTop:true,
        frame:false,
        transparent:true,
        fullscreen: true, // 设置窗口初始全屏
        webPreferences:{
<<<<<<< HEAD
            preload:path.resolve(__dirname,'./preload/preloadMask.js'),
=======
            preload:path.resolve(__dirname,'./preload/preloadMask.cjs'),
>>>>>>> 76eb1379223877fb856a3d20e474784ff61edffd
            nodeIntegration:true 
        }
    })
    mainWindow.mask.setIgnoreMouseEvents(true)
<<<<<<< HEAD
    if (app.isPackaged) {//生产环境
        mainWindow.mask.loadFile(path.join(__dirname, '../renderer/index.html'),{ hash: 'mask' })
      } else {//开发环境
        mainWindow.mask.loadURL(`${MAINURL}/#/mask`)
      }
=======
    mainWindow.mask.loadURL('http://localhost:5173/#/mask')
>>>>>>> 76eb1379223877fb856a3d20e474784ff61edffd
    mainWindow.mask.on('closed', () => {
        // 销毁窗口对象
        mainWindow.mask.destroy();
        mainWindow.mask=''
      });
    }
<<<<<<< HEAD
//创建Note窗口
function createNote() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  mainWindow.note =new BrowserWindow({
      width:500, 
      height:height/4,
      y:1,
      x:width/2,
      alwaysOnTop:true,
      frame:false,
      transparent:true,
  })
  if (app.isPackaged) {//生产环境
      mainWindow.note.loadFile(path.join(__dirname, '../renderer/index.html'),{ hash: 'note' })
    } else {//开发环境
      mainWindow.note.loadURL(`${MAINURL}/#/note`)
    }
  mainWindow.note.on('closed', () => {
      // 销毁窗口对象
      mainWindow.note.destroy();
      mainWindow.note=''
    });
  }
module.exports = {
  createMainWindow,
  createMask,
  createNote,
=======

module.exports = {
  createMainWindow,
  createMask,
>>>>>>> 76eb1379223877fb856a3d20e474784ff61edffd
  mainWindow, // 导出窗口对象以供其他文件访问
};
