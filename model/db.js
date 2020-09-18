'user strict';

var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bot'
});

connection.connect(function(err) {
    console.log('databse connected 1');
    if (err) throw err;
});

module.exports = connection;
