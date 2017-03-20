'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _standardVersion = require('standard-version');

var _standardVersion2 = _interopRequireDefault(_standardVersion);

var _path = require('path');

var _ramda = require('ramda');

var _postVersion = require('./post-version');

var _postVersion2 = _interopRequireDefault(_postVersion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _console = console,
    error = _console.error,
    log = _console.log;


var stripDashes = (0, _ramda.map)((0, _ramda.replace)('--', ''));
var zipFromPartition = (0, _ramda.converge)(_ramda.zipObj);
var defaults = {
  infile: (0, _path.resolve)(__dirname, '../CHANGELOG.md'),
  message: 'chore(release): %s',
  firstRelease: false,
  sign: false,
  noVerify: false,
  commitAll: false,
  silent: false,
  tagPrefix: 'v'
};
var optionsFromArgs = (0, _ramda.pipe)((0, _ramda.drop)(2), (0, _ramda.partition)((0, _ramda.contains)('--')), zipFromPartition([(0, _ramda.compose)(stripDashes, _ramda.head), _ramda.last]), (0, _ramda.merge)(defaults), (0, _ramda.tap)(log));

exports.default = function () {
  return (0, _standardVersion2.default)(optionsFromArgs(process.argv), function (err) {
    return (0, _ramda.cond)([[_ramda.isNil, function () {
      log('👍\tpost-version release process starting. ignore that message 👆');
    }], [_ramda.T, error]])(err);
  });
};