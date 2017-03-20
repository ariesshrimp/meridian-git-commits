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

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var releaseNotes = _ramda2.default.pipe(_fs2.default.readFileSync, _ramda2.default.toString, _ramda2.default.split(/(<a name=")(\d\.\d\.\d).+(<\/a>)/gi), _ramda2.default.nth(4))('./CHANGELOG.md');

var updateRepo = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var gh, url, repo, v;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            gh = new _githubApi2.default({
              token: process.env.GH_TOKEN
            });
            url = _package2.default.repository.url.split('/');
            _context.next = 4;
            return gh.getRepo(process.env.GIT_USER, _ramda2.default.pipe(_ramda2.default.last, _ramda2.default.split('.'), _ramda2.default.head)(url));

          case 4:
            repo = _context.sent;
            v = 'v' + _package2.default.version;

            _shelljs2.default.exec('git commit --amend -m  "chore(release): ' + v + ' [skip ci]"');
            _shelljs2.default.exec('git push -f --follow-tags origin master');

            _context.next = 10;
            return repo.createRelease({
              tag_name: v,
              name: v,
              body: releaseNotes
            });

          case 10:
            return _context.abrupt('return', _context.sent);

          case 11:
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

exports.default = updateRepo();