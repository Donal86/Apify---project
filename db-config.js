const mysql = require('mysql');
const dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'milano_houses',
    port: 3030
})
dbConnection.connect(function (err) {
    if (err) throw err
})

module.exports = dbConnection;