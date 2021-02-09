const express = require('express')

  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 3000;
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.listen(port,() => console.log('Server running on port 3000!'));

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/routes'); //importing route
routes(app); //register the route

