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
const deleteNote = (key) => {
    return new Promise((resolve,reject)=>{
        connection.query('delete from allnotes where `key` = ?',[key],(err,result,yield)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
const addNote = (key,title,label) => {
    return new Promise((resolve,reject)=>{
        connection.query('insert into allnotes values (?,?,?,?)',[key,title,label,''],(err,result,yield)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
const queryNote = (keyword) => {
    return new Promise((resolve,reject)=>{
        connection.query('select * from allnotes where title like ? or label like ?',[`%${keyword}%`, `%${keyword}%`],(err,result,yield)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
module.exports = {
    getAllNotes,updateNote,deleteNote,addNote,queryNote
}