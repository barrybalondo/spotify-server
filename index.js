// Starting Point
require('dotenv').config()
var express = require('express');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var peopleController = require('./controllers/peopleController');

// Database Setup
mongoose.connect(process.env.DB);

// App Setup
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

// Controller/Route Setup
var router = express.Router();
peopleController(router, app);

// Server Setup
var port = process.env.PORT || 3000;
var server = http.createServer(app);

server.listen(port);
console.log('Server listening on: ', port);