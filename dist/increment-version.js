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

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _console = console,
    error = _console.error,
    log = _console.log;


var stripDashes = (0, _ramda.map)((0, _ramda.replace)('--', ''));

var zipFromPartition = (0, _ramda.converge)(_ramda.zipObj);

var defaults = {
  infile: (0, _path.resolve)(__dirname, '../CHANGELOG.md'),
  message: 'chore(release): %s [skip ci]',
  firstRelease: false,
  sign: false,
  noVerify: false,
  commitAll: false,
  silent: false,
  tagPrefix: 'v'
};

var optionsFromArgs = (0, _ramda.pipe)((0, _ramda.drop)(2), (0, _ramda.partition)((0, _ramda.contains)('--')), zipFromPartition([(0, _ramda.compose)(stripDashes, _ramda.head), _ramda.last]), (0, _ramda.merge)(defaults));

var increment = function increment() {
  return (0, _standardVersion2.default)(optionsFromArgs(process.argv), function (err) {
    return (0, _ramda.cond)([[_ramda.isNil, _postVersion2.default], [_ramda.T, error]])(err);
  });
};

exports.default = increment;