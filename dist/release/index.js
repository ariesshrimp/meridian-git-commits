#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _postVersion = require('./post-version');

var _postVersion2 = _interopRequireDefault(_postVersion);

var _incrementVersion = require('./increment-version');

var _incrementVersion2 = _interopRequireDefault(_incrementVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _console = console,
    log = _console.log,
    error = _console.error,
    info = _console.info;


_commander2.default.command('release').option('-i, --infile [infile]', 'Where should the CHANGELOG.md file be written?', (0, _path.resolve)(__dirname, '../CHANGELOG.md')).option('-m, --message [message]', 'Desired commit messag format:', 'chore(release): %s [skip ci]').option('-f, --first-release [firstRelease]', 'Dont adjust package version').option('-p, --tag-prefix [tagPrefix]', 'How to prefix your version number (e.g. v0.0.0)', 'v').action(function (options) {
  (0, _incrementVersion2.default)(options);
});

_commander2.default.parse(process.argv);