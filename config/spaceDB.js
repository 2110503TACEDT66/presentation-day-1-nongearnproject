const mysql = require("mysql");

var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Focus0955720884',
    database: 'space'
});

module.exports = connection;