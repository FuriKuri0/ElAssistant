const Store = require('electron-store');
const store = new Store();

const MainStore = {
    get:(key)=>{
        return store.get(key)
    },
    set:(key,data)=>{
        return store.set(key,data)
    },
    delete:(key)=>{
        return store.delete(key)
    },
}
module.exports=  {MainStore}