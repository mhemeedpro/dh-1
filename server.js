const http = require('http');
require("./app.js");
const hostname = '127.0.0.1';
const port = 3000;
//process.env.NODE_ENV // "development"
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('bot starter');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});