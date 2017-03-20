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

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

var _ramda = require('ramda');

var _fs = require('fs');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var releaseNotes = (0, _ramda.pipe)(_fs.readFileSync, _ramda.toString, (0, _ramda.split)(/(<a name=")(\d\.\d\.\d).+(<\/a>)/gi), (0, _ramda.nth)(4));

var gh = new _githubApi2.default({ token: process.env.GH_TOKEN });
var name = (0, _ramda.pipe)((0, _ramda.split)('/'), _ramda.last, (0, _ramda.split)('.'), _ramda.head)(_package2.default.repository.url);
var v = 'v' + _package2.default.version;

exports.default = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var repo, ammendRelease, currentBranch, pushTags, release;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return gh.getRepo(process.env.GITHUB_USER_OR_ORGANIZATION_NAME, name);

        case 2:
          repo = _context.sent;
          ammendRelease = (0, _shelljs.exec)('git branch && git show HEAD && git log -1 && git commit --amend -m  "chore(release): ' + v + ' [skip ci]"');
          currentBranch = (0, _shelljs.exec)('git rev-parse --abbrev-ref HEAD').toString().trim();
          pushTags = (0, _shelljs.exec)('git push -f --follow-tags origin ' + currentBranch + ':master');
          release = {
            tag_name: v,
            name: v,
            body: releaseNotes((0, _path.resolve)(__dirname, './CHANGELOG.md'))
          };
          _context.next = 9;
          return repo.createRelease(release);

        case 9:
          return _context.abrupt('return', _context.sent);

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}))();