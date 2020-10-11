const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const mysql = require('mysql');
/*
// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bot'
});

// connect to database
//mc.connect();
//mc.end();

*/

///var sql = require('./model/db.js');
//sql.end();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/routes'); //importing route
routes(app); //register the route

