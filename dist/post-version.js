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

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
  AUTH_TOKEN: 'c0d62af34f410c633773b831e3273275eddb9613',
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
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var gh, repo, newBranch, pullRequest;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            gh = new _githubApi2.default({
              token: options.AUTH_TOKEN
            });
            _context.next = 3;
            return gh.getRepo(options.USER_NAME, options.repo.name);

          case 3:
            repo = _context.sent;
            _context.next = 6;
            return repo.createBranch('master', 'release-' + _package2.default.version);

          case 6:
            newBranch = _context.sent;


            console.log(_package2.default.version);
            _context.next = 10;
            return repo.createPullRequest({
              title: 'chore(release): ' + _package2.default.version,
              body: 'test',
              base: 'master',
              head: 'release-' + _package2.default.version
            });

          case 10:
            pullRequest = _context.sent;

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

updateRepo();

exports.default = updateRepo;