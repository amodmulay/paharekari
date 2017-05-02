'use strict';
const _ = require('lodash')

//First line
module.exports = {};
console.log("Initiating paharekari")
const server = require('./httpServer')
const Pinger = require('../lib/pinger')
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
