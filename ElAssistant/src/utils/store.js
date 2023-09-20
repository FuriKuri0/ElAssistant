const MainStore = {
    get: async (key) => {
        const data =  await window.electron.Store.get(key)
       return data||[]
    },
    set:(key,data)=>{
        window.electron.Store.set(key,data)
    },
    add:(key,data)=>{
        let pre = window.electron.Store.get(key)
        pre.length>=0? window.electron.Store.set(key,[...pre,data]):window.electron.Store.set(key,{...pre,data})
    },
    delete:(key)=>{
        window.electron.Store.delete(key)
    },
    
}

export default MainStore