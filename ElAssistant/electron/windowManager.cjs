const { BrowserWindow,screen } = require('electron');
const path =require('path')

// 存储窗口对象的变量
let mainWindow ={window:''};

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
    mainWindow.window.loadURL('http://localhost:5173/')
    //设置窗口比例
    mainWindow.window.setAspectRatio(1)
}

module.exports = {
  createMainWindow,
  mainWindow, // 导出窗口对象以供其他文件访问
};
