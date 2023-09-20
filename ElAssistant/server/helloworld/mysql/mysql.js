const mysql = require('mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zxc2345665432',
    database:'notes'
})

connection.connect()

module.exports = {
    connection
}