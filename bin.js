#! /usr/bin/env node

process.title = 'cfauth';

var CFAuth = require('./index.js');

var pathToKeys = process.argv[2];
var target = process.argv[3];

if (!pathToKeys) {
  console.error('Path to keys must be provided');
  process.exit(1);
}

if (!target) {
  console.error('Path to keys must be provided');
  process.exit(1);
}

var path = require('path');
var keys = require(pathToKeys);

var auth = CFAuth(keys);
console.log(auth.genURL(target));
