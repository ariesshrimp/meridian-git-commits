#!/usr/bin/env node
'use strict';

var path = require('path');
var bootstrap = require('commitizen/dist/cli/git-cz').bootstrap;

bootstrap({
  cliPath: path.join(__dirname, '../node_modules/commitizen'),
  config: {
    path: '../node_modules/cz-conventional-changelog'
  }
});