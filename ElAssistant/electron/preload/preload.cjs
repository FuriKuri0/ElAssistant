const { contextBridge, ipcRenderer } = require('electron');
const {MainStore} = require('../store.cjs')
const {setClock} = require('../clock.cjs')
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
         //展示语音组件
         ShowYuyin:(callback)=>{
            ipcRenderer.on('showYuyin',()=>{
                callback()
            })
        },
         //音乐播放
         PlayClock:(callback)=>{
            ipcRenderer.on('playClock',()=>{
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
                if(key==='clock'){
                    ipcRenderer.send('refreshClock')
                }
            },
            delete:(key)=>{
                MainStore.delete(key)
                if(key==='clock'){
                    ipcRenderer.send('refreshClock')
                }
            }
        },
      
    }
  )