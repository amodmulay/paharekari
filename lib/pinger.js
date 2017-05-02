const https = require('https');
const http = require('http');
var statusCods = http.STATUS_CODE
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var url = require('url');
var cron = require('node-cron');

var options = {
  hostname: 'diagnostics-license.kpit.comfff',
  port: 8443,
  path: '/limas/services',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' //,
      //'Content-Length': Buffer.byteLength(postData)
  },
  pingInterval: 10
};

//Constructor
function Pinger(opts) {
  hostname: opts.hostname,
  port: opts.port,
  path: opts.path,
  method: opts.method,
  headers: opts.headers,
  pingInterval: opts.pingInterval
};

//Initializing Pinger
Pinger.prototype.init = function(opts) {
  console.log("Initializing Pinger for monitoring ");
  // opts.timeout ensures backward compatibility
  var interval = options.pingInterval || this.pingInterval;
  var hostname = options.hostname;
  var port = options.port || this.port;

  if (!hostname) {
    return this.emit('error', {
      msg: 'Please specify a host to monitor'
    });
  }

  this.method = opts.method || this.method;
  this.hostname = hostname;

  this.pingInterval = (pingInterval * (60 * 1000));

  // start monitoring
  this.start();

  return this;
}

Pinger.prototype.start = function() {
  var self = this;
  var task = cron.schedule('1 * * * * *', function() {
    console.log('This ping will run every minute');
    self.ping();
  }, false);
  task.start();
};
//****************************************************************************
// HTTP request
// var reqHTTP = http.request(options,(res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//   console.log(`RESPONSE: ${res}`);
// });
// reqHTTP.end();
//****************************************************************************
Pinger.prototype.ping = function() {
  var reqHTTPS = https.request(options, (res) => {
    var str = 'undefined'
    res.on('data', function(chunk) {
      str += chunk;
    });
    console.log(`HTTPS STATUS: ${res.statusCode}`);
    console.log(`HTTPS HEADERS: ${JSON.stringify(res.headers)}`);
    console.log(`HTTPS RESPONSE: ${res}`);

    res.on('end', function() {
      console.log(reqHTTPS.data);
      console.log(str);
      // your code here if you want to use the results !
    });
  });
  reqHTTPS.on('error', (e) => {
    console.error(e);
  });
  reqHTTPS.end();
}

module.exports = Pinger;
