#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _gitCz = require('commitizen/dist/cli/git-cz');

/**
 * @see https://github.com/commitizen/cz-cli#1-create-your-own-entry-point-script
 */
exports.default = (0, _gitCz.bootstrap)({
  cliPath: (0, _path.resolve)(__dirname, '../../node_modules/commitizen'),
  config: { path: 'cz-conventional-changelog' }
});