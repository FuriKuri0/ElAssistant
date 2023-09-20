const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld(
    'electronM',
    {
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