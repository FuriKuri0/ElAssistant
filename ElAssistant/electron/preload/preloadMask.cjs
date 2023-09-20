const { contextBridge, ipcRenderer } = require('electron');
<<<<<<< HEAD
contextBridge.exposeInMainWorld(
    'electronM',
    {
=======
const {MainStore} = require('../store.cjs')
contextBridge.exposeInMainWorld(
    'electronM',
    {
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
        //监听鼠标移动
        ListenMouse:(setX,setY)=>{
            setInterval(async()=>{
              const [x,y] = await ipcRenderer.invoke('getMousePosition')
              setX(x)
              setY(y)
            },0)
        },
        //监听放大缩小光圈 增加减少亮度
        ListenChange:(beBig,beSmall,beLight,beDark)=>{
            ipcRenderer.on('toBig',()=>{
            console.log(123)
                beBig()
            })
            ipcRenderer.on('toSmall',()=>{
                beSmall()
            })
            ipcRenderer.on('toLight',()=>{
                beLight()
            })
            ipcRenderer.on('toDark',()=>{
                beDark()
            })
        }
    }
  )