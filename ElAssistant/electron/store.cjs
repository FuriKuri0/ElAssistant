const Store = require('electron-store');
const store = new Store();

// // 清空数据的函数
// function clearClockData() {
//     store.delete('clock'); // 清空指定键的数据
//     console.log('Clock 数据已清空');
//   }
//   // 计算距离明天零点的时间间隔
// function getTimeUntilMidnight() {
//     const now = new Date();
//     const midnight = new Date();
//     midnight.setHours(24, 0, 0, 0); // 设置为明天的零点
//     const timeUntilMidnight = midnight - now;
  
//     return timeUntilMidnight;
//   }
//   const timeUntilMidnight = getTimeUntilMidnight();
//   // 设置定时器，在零点时执行清空数据函数
//   setTimeout(clearClockData, timeUntilMidnight);
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