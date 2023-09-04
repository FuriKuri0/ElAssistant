const schedule = require('node-schedule');
const {mainWindow}= require('./windowManager.cjs');
const {MainStore} = require('./store.cjs')
// 定义规则，监听第一个闹钟
let job 
const setClock = () => {
    deletejob()
    const clockList = MainStore.get('clock')||[]
    const newList = [...clockList]
    if(newList&&newList.length>0){
        //先去除已经过时的闹钟
        let [hour,minute] = newList[0].split(':').map(Number)
        while((new Date().getHours()===hour&&new Date().getMinutes()>=minute)||new Date().getHours()>hour){
            newList.shift()
            if(newList.length>0){
                [hour,minute] = newList[0].split(':').map(Number)
            }else{
                break
            }
        }
        MainStore.set('clock',newList)
        if(newList.length>0){
            const rule = new schedule.RecurrenceRule();
            let [hour,minute] = newList[0].split(':').map(Number)
            rule.hour = hour;
            rule.minute = minute;
            job = schedule.scheduleJob(rule, function() {
              // 如果闹钟能正常
                mainWindow.window.webContents.send('playClock')
                const newList = [...MainStore.get('clock')]
                newList.shift()
                MainStore.set('clock',newList)
                setClock()
            });
        }
       
    }
    
}
const deletejob = ()=>{
    if(job){
        schedule.cancelJob(job)
    }
}

setClock()
// 
module.exports = {
    setClock
}