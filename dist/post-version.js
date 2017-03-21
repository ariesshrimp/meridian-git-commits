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

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _ramda = require('ramda');

var _fs = require('fs');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _console = console,
    log = _console.log;


var releaseNotes = (0, _ramda.pipe)(_fs.readFileSync, toString, (0, _ramda.split)(/(<a name=")(\d\.\d\.\d).+(<\/a>)/gi), nth(4));

var gh = new _githubApi2.default({ token: process.env.GH_TOKEN });
var name = (0, _ramda.pipe)((0, _ramda.split)('/'), _ramda.last, (0, _ramda.split)('.'), _ramda.head);
var currentVersion = function currentVersion() {
  return require('../package.json').version;
};

exports.default = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var repo, release;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          log('👌 post-version release process starting. ignore that message 👆');
          _context.next = 3;
          return gh.getRepo(process.env.GITHUB_USER_OR_ORGANIZATION_NAME, name(_package2.default.repository.url));

        case 3:
          repo = _context.sent;
          release = {
            tag_name: 'v' + currentVersion(),
            name: 'v' + currentVersion(),
            body: releaseNotes((0, _path.resolve)(__dirname, '../CHANGELOG.md'))
          };
          _context.next = 7;
          return repo.createRelease(release);

        case 7:
          return _context.abrupt('return', _context.sent);

        case 8:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));