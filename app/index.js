'use strict';
const _ =require('lodash')

//First line
module.exports = {};
console.log("Initiating paharekari")

const server = require('./httpServer')
const pinger = require('./pinger')
pinger.start;
