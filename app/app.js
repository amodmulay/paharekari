'use strict';
/*
Entry point for starting paharekari
*/

var _ = require('lodash');
var server = require('../lib/httpServer');
var Pinger = require('../lib/pinger');
var config = require('../config.json');

//First line
module.exports = {};
//Start server to view web based data
console.log("Initiating paharekari")

//start website monitor
var ping = new Pinger({
  hostname: config.hostname,
  port: config.port,
  path: config.path,
  method: config.method,
  headers: config.headers,
  pingInterval: config.pingInterval
});
