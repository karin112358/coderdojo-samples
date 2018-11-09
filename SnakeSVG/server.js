/* jslint node: true */
'use strict';

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var port = 3000;

server.listen(port, function () {
    console.log('Webserver läuft und hört auf Port %d', port);
});

app.use(express.static(__dirname + '/public'));

var socketIOServer = require("./socketIOServer");
socketIOServer.start(server);