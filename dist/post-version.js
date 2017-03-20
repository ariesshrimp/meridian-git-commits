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

console.log(process.env);

var options = {
  AUTH_TOKEN: process.env.GH_TOKEN,
  USER_NAME: 'joefraley',
  repo: {
    name: 'meridian-git-commits'
  }
};

var releaseNotes = _ramda2.default.pipe(_fs2.default.readFileSync, _ramda2.default.toString, _ramda2.default.split(/(<a name=")(\d\.\d\.\d).+(<\/a>)/gi), _ramda2.default.nth(4))('./CHANGELOG.md');

var updateRepo = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
    var gh, repo, _ref2, number, merge, deadBranch, release;

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


            console.log('\nCheckout a new release branch...\n');
            _shelljs2.default.exec('git checkout -b release-v' + _package2.default.version);
            _shelljs2.default.exec('git commit --amend -m  "chore(release): v' + _package2.default.version + ' [skip ci]"');

            console.log('\nSend new release tags up to remote...\n');
            _shelljs2.default.exec('git push --follow-tags origin release-v' + _package2.default.version);

            console.log('\nCreate a pull request to master with new version...\n');
            _context.next = 12;
            return repo.createPullRequest({
              title: 'chore(release): v' + _package2.default.version,
              body: releaseNotes,
              base: 'master',
              head: 'release-v' + _package2.default.version
            });

          case 12:
            _ref2 = _context.sent;
            number = _ref2.data.number;


            console.log('\nAutomatically merge request...\n');
            _context.next = 17;
            return repo.mergePullRequest(number, {
              merge_method: 'squash'
            });

          case 17:
            merge = _context.sent;


            console.log('\nDelete remote release branch\n');
            _context.next = 21;
            return repo.deleteRef('heads/release-v' + _package2.default.version);

          case 21:
            deadBranch = _context.sent;


            console.log('\nAdd release notes...\n');
            _context.next = 25;
            return repo.createRelease({
              tag_name: 'v' + _package2.default.version,
              name: 'v' + _package2.default.version,
              body: releaseNotes
            });

          case 25:
            release = _context.sent;

          case 26:
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