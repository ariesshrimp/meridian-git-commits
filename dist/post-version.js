'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _githubApi = require('github-api');

var _githubApi2 = _interopRequireDefault(_githubApi);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _config = require('../config.json');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  AUTH_TOKEN: _config.AUTH_TOKEN,
  USER_NAME: 'joefraley',
  repo: {
    name: 'meridian-git-commits'
  }
};

var releaseNotes = function releaseNotes() {
  return _fs2.default.readFileSync('./CHANGELOG.md').toString().split(/(#\s\d\.\d\.\d)/gi);
};
var headSha = _ramda2.default.compose(_ramda2.default.dropLast(1), _ramda2.default.trim, function () {
  return _shelljs2.default.exec('git rev-parse HEAD');
});
console.log(releaseNotes());

var updateRepo = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateRepo() {
    return _ref.apply(this, arguments);
  };
}();

updateRepo();

exports.default = updateRepo;