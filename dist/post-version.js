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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  AUTH_TOKEN: '0bc72ec5d87a64dda8a2b1be42a1225870cf606c',
  USER_NAME: 'joefraley',
  repo: {
    name: 'meridian-git-commits'
  }
};

var releaseNotes = function releaseNotes() {
  return 'hello';
};
var headSha = _ramda2.default.compose(_ramda2.default.dropLast(1), _ramda2.default.trim, function () {
  return _shelljs2.default.exec('git rev-parse HEAD');
});

var updateRepo = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
    var gh, repo, _ref2, number, merge, release;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            gh = new _githubApi2.default({
              token: options.AUTH_TOKEN
            });
            _context2.next = 3;
            return gh.getRepo(options.USER_NAME, options.repo.name);

          case 3:
            repo = _context2.sent;

            _shelljs2.default.exec('git checkout -b release-' + _package2.default.version);
            _shelljs2.default.exec('git push --follow-tags origin release-' + _package2.default.version);
            _context2.next = 8;
            return repo.createPullRequest({
              title: 'chore(release): ' + _package2.default.version,
              body: 'test',
              base: 'master',
              head: 'release-' + _package2.default.version
            });

          case 8:
            _ref2 = _context2.sent;
            number = _ref2.data.number;
            _context2.next = 12;
            return repo.mergePullRequest(number);

          case 12:
            merge = _context2.sent;

            release = function () {
              var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return repo.createRelease({
                          tag_name: _package2.default.version,
                          name: _package2.default.version,
                          body: releaseNotes()
                        });

                      case 2:
                        return _context.abrupt('return', _context.sent);

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function release() {
                return _ref3.apply(this, arguments);
              };
            }();

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function updateRepo() {
    return _ref.apply(this, arguments);
  };
}();

updateRepo();

exports.default = updateRepo;