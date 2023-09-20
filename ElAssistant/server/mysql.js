const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zxc2345665432',
    database:'db1'
})

connection.connect()
connection.query('select * from biao1',(err,result,yield)=>{
    if(err) throw err
    console.log(result,123)
})