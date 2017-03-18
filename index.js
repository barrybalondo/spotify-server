var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true }));

// Test
app.get('/',function(req, res) {
  res.json({ message: 'Welcome back Barry!' });   
});

// Server Setup
var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port);
console.log('Server listening on: ', port);