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
            message: 'Whats your git hub repo url?',
            name: 'repo'
          }, {
            type: 'password',
            message: 'Paste in your github access token. Ill wait...',
            name: 'password'
          }, {
            type: 'password',
            message: 'Enter your git password',
            name: 'password'
          }, {
            type: 'password',
            message: 'Enter your git password',
            name: 'password'
          }]);

        case 2:
          userSettings = _context.sent;
          travisYml = '\nlanguage: node_js\nnode_js:\n- node\ncache:\n  directories:\n  - "$HOME/.yarn-cache"\nnotifications:\n  email: false\nscript:\n- npm test\nafter_success:\n- git remote rm origin\n- git remote add origin https://' + GIT_USER + ':' + GH_TOKEN + '@github.com/' + GIT_USER + '/' + REPO + '.git\n- "[[ $TRAVIS_PULL_REQUEST == false ]] && npm run release"\n\nbranches:\n  only:\n  - master\nenv:\n  global:\n  - REPO=' + REPO + '\n';

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined);
}));