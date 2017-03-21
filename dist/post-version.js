'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _conventionalGithubReleaser = require('conventional-github-releaser');

var _conventionalGithubReleaser2 = _interopRequireDefault(_conventionalGithubReleaser);

var _shelljs = require('shelljs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _console = console,
    log = _console.log;
exports.default = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var currentBranch;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _shelljs.exec)('git push --force --follow-tags origin HEAD:master');

        case 2:
          _context.next = 4;
          return (0, _conventionalGithubReleaser2.default)({ type: 'oauth', token: process.env.GH_TOKEN }, { preset: 'angular' }, log);

        case 4:
          return _context.abrupt('return', _context.sent);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));