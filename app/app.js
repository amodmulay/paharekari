'use strict';
const _ = require('lodash');
const server = require('./httpServer');
const Pinger = require('../lib/pinger');
const config = require('../config');

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
