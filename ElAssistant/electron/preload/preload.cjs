const { contextBridge, ipcRenderer } = require('electron');
<<<<<<< HEAD
=======
const {MainStore} = require('../store.cjs')
const {setClock} = require('../clock.cjs')
>>>>>>> 76eb1379223877fb856a3d20e474784ff61edffd
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
<<<<<<< HEAD
            //计时器
            ShowTimeCount:(callback)=>{
                ipcRenderer.on('showTimeCount',()=>{
                    callback()
                })
            },
        //数据存储
        Store:{
            get: async(key)=>{
                const data = await ipcRenderer.invoke('storeGet',key)
               return data
            },
            set:(key,data)=>{
                ipcRenderer.send('storeSet',[key,data])
            },
            delete:(key)=>{
                ipcRenderer.send('storeDelete',key)
        },
    }
=======
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
>>>>>>> 76eb1379223877fb856a3d20e474784ff61edffd
      
    }
  )