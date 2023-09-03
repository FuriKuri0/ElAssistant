const { contextBridge, ipcRenderer } = require('electron');
const {MainStore} = require('./store.cjs')
contextBridge.exposeInMainWorld(
    'electron',
    {
        //音乐播放
        PlayMusic:(callback)=>{
            ipcRenderer.on('playMusic',()=>{
                callback()
            })
        },
        //展示闹钟组件
        ShowClock:(callback)=>{
            ipcRenderer.on('showClock',()=>{
                callback()
            })
        },
        //数据存储
        Store:{
            get:(key)=>{
               return MainStore.get(key)
            },
            set:(key,data)=>{
                MainStore.set(key,data)
            },
            delete:(key)=>{
                MainStore.delete(key)
            }
        }
    }
  )