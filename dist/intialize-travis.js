'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _shelljs = require('shelljs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
  var userSettings, travisYml;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _inquirer2.default.prompt([{
            type: 'input',
            message: 'Whats your git hub repo url? (Its easiest to use https here...)',
            name: 'repo'
          }, {
            type: 'input',
            message: 'Whats your git hub user or organization name? (this is used to fetch the remote repo)',
            name: 'userName'
          }, {
            type: 'input',
            message: 'What email is associated with this repo? (this could be an org email...)',
            name: 'email'
          }, {
            type: 'password',
            message: 'Paste in your github access token. Ill wait...',
            name: 'token'
          }]);

        case 2:
          userSettings = _context.sent;
          travisYml = '\nlanguage: node_js\nnode_js:\n- node\ncache:\n  directories:\n  - "$HOME/.yarn-cache"\nnotifications:\n  email: false\nscript:\n- npm test\nafter_success:\n- git config credential.helper "store --file=.git/credentials"; echo "https://${GH_TOKEN}:@github.com" > .git/credentials 2>/dev/null\n- git config --global user.email "' + userSettings.email + '"\n- git config --global user.name "' + userSettings.userName + '"\n- git remote rm origin\n- git remote add origin $REPO\n- "[[ $TRAVIS_PULL_REQUEST == false ]] && npm run release"\n\nbranches:\n  only:\n  - master\nenv:\n  global:\n  - GITHUB_USER_OR_ORGANIZATION_NAME=' + userSettings.userName + '\n  - REPO=' + userSettings.repo + '\n';

          (0, _shelljs.exec)('travis-encrypt -a GH_TOKEN=' + userSettings.token);

        case 5:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}))();