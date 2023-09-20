const { contextBridge, ipcRenderer } = require('electron');
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
      
    }
  )