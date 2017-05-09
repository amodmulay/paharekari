const https = require('https');
const http = require('http');
var statusCods = http.STATUS_CODE
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var url = require('url');
var cron = require('node-cron');
var mailer = require('./mailer');
var shell = require('shelljs');

var options = {
  hostname: 'diagnostics-license.kpit.com',
  port: '8443',
  path: '/limas/services',
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' //,
      //'Content-Length': Buffer.byteLength(postData)
  },
  pingInterval: '1'
};

//Constructor
function Pinger(opts) {
  console.log("opts: ", opts);
  options.hostname = opts.hostname;
  options.port = opts.port;
  options.path = opts.path;
  options.method = opts.method;
  options.headers = opts.headers;
  options.pingInterval = opts.pingInterval;
  this.init(options);

  shell.exec('curl http://diagnostics-license.kpit.com:8443');
  shell.exec('top -b -n 1 |grep ^Cpu');
  shell.exec('service tomcat7 restart');
};

//Initializing Pinger
Pinger.prototype.init = function(options) {
  console.log('Initializing Pinger for monitoring', options);
  // opts.timeout ensures backward compatibility
  var interval = options.pingInterval || this.pingInterval;
  var hostname = options.hostname;
  var port = options.port || this.port;

  if (!hostname) {
    console.log('Please specify a host to monitor');
  };


  this.method = options.method || this.method;
  this.hostname = hostname;

  this.pingInterval = (options.pingInterval * (60 * 1000));

  // start monitoring
  this.start(options);

  return this;
}

Pinger.prototype.start = function(options) {
  console.log('This ping will run every minute');
  var self = this;
  var task = cron.schedule('1 * * * * *', function() {
    console.log('This ping will run every minute');
    self.ping(options);
    mailer(function(error, res) {
      if (error) {
        console.log('Failed to send email. ' + error.message);
      } else {
        console.log(res.message);
      }
    });
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
Pinger.prototype.ping = function(options) {
  console.log(options);
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
