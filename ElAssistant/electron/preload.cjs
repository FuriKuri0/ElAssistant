const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
    'electron',
    {
      doThing: () => ipcRenderer.send('saveFile'),
    //   anAsyncFunction: async () => 123,
        test:(callback)=>{
            ipcRenderer.on('halo',(_,value)=>{
                callback(value)
            })
        },
        invoke:()=>  ipcRenderer.invoke('invoke')
    }
  )