#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _gitCz = require('commitizen/dist/cli/git-cz');

exports.default = (0, _gitCz.bootstrap)({
  cliPath: (0, _path.join)(__dirname, '../node_modules/commitizen'),
  config: { path: 'cz-conventional-changelog' }
});