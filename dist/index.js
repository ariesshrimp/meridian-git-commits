#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _incrementVersion = require('./increment-version');

var _incrementVersion2 = _interopRequireDefault(_incrementVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _incrementVersion2.default)();