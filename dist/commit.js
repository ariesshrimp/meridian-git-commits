#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gitCz = require('commitizen/dist/cli/git-cz');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _gitCz.bootstrap)({
  cliPath: _path2.default.join(__dirname, '../node_modules/commitizen'),
  config: {
    path: 'cz-conventional-changelog'
  }
});