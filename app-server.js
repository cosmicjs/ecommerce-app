
// app-server.js
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000)
app.use(express.static(__dirname))
var http = require('http').Server(app)
// Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})
http.listen(app.get('port'), () => {
  console.log('Ecommerce App listening on ' + app.get('port'))
})