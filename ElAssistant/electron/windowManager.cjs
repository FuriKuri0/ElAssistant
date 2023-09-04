const { BrowserWindow,screen } = require('electron');
const path =require('path')

// 存储窗口对象的变量
let mainWindow ={window:'',mask:''};

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
        transparent:true,
        webPreferences:{
            preload:path.resolve(__dirname,'preload.cjs'),
            nodeIntegration:true 
        }
    })
    mainWindow.window.loadURL('http://localhost:5173/#/home')
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
        webPreferences: {
          nodeIntegration: true,
        },
        // webPreferences:{
        //     preload:path.resolve(__dirname,'preload.cjs'),
        //     nodeIntegration:true 
        // }
    })
    // mainWindow.mask.setIgnoreMouseEvents(true)
    mainWindow.mask.loadURL('http://localhost:5173/#/mask')
    mainWindow.mask.on('closed', () => {
        // 销毁窗口对象
        mainWindow.mask.destroy();
        mainWindow.mask=''
      });
    }

module.exports = {
  createMainWindow,
  createMask,
  mainWindow, // 导出窗口对象以供其他文件访问
};
