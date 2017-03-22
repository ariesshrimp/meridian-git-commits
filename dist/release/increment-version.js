'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _standardVersion = require('standard-version');

var _standardVersion2 = _interopRequireDefault(_standardVersion);

var _postVersion = require('./post-version');

var _postVersion2 = _interopRequireDefault(_postVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _console = console,
    error = _console.error;

exports.default = function (options) {
  return (0, _standardVersion2.default)(options, (0, _ramda.cond)([[_ramda.isNil, function () {
    return (0, _postVersion2.default)(options);
  }], [_ramda.T, error]]));
};