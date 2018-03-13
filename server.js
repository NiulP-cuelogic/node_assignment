var http = require("http");
var app = require('./app');
var express = require("express");

var port = 5000;

var server = http.createServer(app);

server.listen(port);