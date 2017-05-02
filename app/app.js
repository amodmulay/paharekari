'use strict';
const _ = require('lodash')
const server = require('./httpServer')
const Pinger = require('../lib/pinger')

//First line
module.exports = {};
//Start server to view web based data
console.log("Initiating paharekari")

//start website monitor
var ping = new Pinger({
  hostname: 'https://diagnostics-license.kpit.com',
  port: 8443,
  path: '/limas/services',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' //,
      //'Content-Length': Buffer.byteLength(postData)
  },
  pingInterval: 10
});
