const https = require('https');
const http = require('http');
var statusCods = http.STATUS_CODE
var fs = require('fs');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var url = require('url');
var schedule = require('node-schedule');

var options = {
  hostname: 'diagnostics-license.kpit.com',
    port: 8443,
    path: '/limas/services',
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'//,
      //'Content-Length': Buffer.byteLength(postData)
    },
    pingInterval:10
};

/*
    Inherit from EventEmitter
*/
util.inherits(Pinger, EventEmitter);

//Constructor
function Pinger(options)
{
  hostname ='';
  port = 8443;
  path = '/about-me';
  method = 'GET';
  pingInterval = 10;

}

Pinger.prototype.init = function(options)
{
  console.log("Initializing Pinger for monitoring ");
  // opts.timeout ensures backward compatibility
   var interval = options.pingInterval || this.pingInterval;
   var hostname = options.hostname;
   var port = options.port||this.port;

   if (!hostname) {
       return this.emit('error', {msg: 'Please specify a host to monitor'});
   }

   this.method = opts.method || this.method;
   this.hostname = hostname;

   this.pingInterval = (pingInterval * (60 * 1000));

   // start monitoring
   this.start();
}

Pinger.prototype.start = function () {
  var rule = new schedule.RecurrenceRule();
  rule.minute = options.pingInterval || 5;

  var event = schedule.scheduleJob("5 * * * * *", function() {
        console.log('This runs every 5 seconds');
    });
};

// var reqHTTP = http.request(options,(res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//   console.log(`RESPONSE: ${res}`);
// });

var reqHTTPS = https.request(options,(res) => {
  var str ='undefined'
  res.on('data', function (chunk) {
    str += chunk;
  });
  console.log(`HTTPS STATUS: ${res.statusCode}`);
  console.log(`HTTPS HEADERS: ${JSON.stringify(res.headers)}`);
  console.log(`HTTPS RESPONSE: ${res}`);

  res.on('end', function () {
   console.log(reqHTTPS.data);
   console.log(str);
   // your code here if you want to use the results !
 });
});

// reqHTTP.end();
reqHTTPS.end();
