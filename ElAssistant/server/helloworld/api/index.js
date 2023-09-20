const {connection} = require('../mysql/mysql')
const getAllNotes = () => {
    return new Promise((resolve,reject)=>{
        connection.query('select * from allNotes',(err,result,yield)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
const updateNote = (key,newDetail) => {
    return new Promise((resolve,reject)=>{
        connection.query('update allNotes set content = ? where `key` = ?',[newDetail,key],(err,result,yield)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
module.exports = {
    getAllNotes,updateNote
}