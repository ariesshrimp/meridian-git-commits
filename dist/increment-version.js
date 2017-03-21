'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _standardVersion = require('standard-version');

var _standardVersion2 = _interopRequireDefault(_standardVersion);

var _postVersion = require('./post-version');

var _postVersion2 = _interopRequireDefault(_postVersion);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _console = console,
    error = _console.error;


var handleError = (0, _ramda.cond)([[_ramda.isNil, _postVersion2.default], [_ramda.T, error]]);

var options = _commander2.default.option('-i, --infile [infile]', 'Where should the CHANGELOG.md file be written?', (0, _path.resolve)(__dirname, '../CHANGELOG.md')).option('-m, --message [message]', 'Desired commit messag format:', 'chore(release): %s [skip ci]').option('-f, --first-release [firstRelease]', 'Dont adjust package version').option('-p, --tag-prefix [tagPrefix]', 'How to prefix your version number (e.g. v0.0.0)', 'v').parse(process.argv);

var defaults = _ramda2.default.merge({
  infile: 'CHANGELOG.md',
  message: 'chore(release): %s',
  firstRelease: false,
  sign: false,
  noVerify: false,
  commitAll: false,
  silent: false,
  tagPrefix: 'v'
}, {
  infile: options.infile,
  tagPrefix: options.tagPrefix,
  firstRelease: options.firstRelease || false,
  message: options.message
});
// arstarsst

exports.default = function () {
  return (0, _standardVersion2.default)(defaults, handleError);
};