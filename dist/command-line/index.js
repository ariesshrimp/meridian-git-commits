#!/usr/bin/env node
'use strict';

var _commander = require('commander');

var _commander2 = _interopRequireDefault(_commander);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

var _path = require('path');

var _resetReleases = require('./reset-releases');

var _resetReleases2 = _interopRequireDefault(_resetReleases);

var _intitializeTravis = require('./intitialize-travis.js');

var _intitializeTravis2 = _interopRequireDefault(_intitializeTravis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _console = console,
    log = _console.log,
    error = _console.error,
    info = _console.info;


_commander2.default.command('reset').description('delete all local tags and then scrub them from github').alias('rs').option('-u, --git-user [user]', 'username', 'joefraley').option('-t, --token [token]', 'github auth token', '').option('-r, --git-repo [repo]', 'git repo name', 'meridian-git-commits').action(function (options) {
  return (0, _resetReleases2.default)({
    token: options.token,
    user: options.gitUser,
    repo: options.gitRepo
  });
});

_commander2.default.command('initialize').alias('init').description('generate a new .travis.yml file in a fresh repo').option('-u, --git-user [user]', 'username', 'joefraley').option('-t, --token [token]', 'github auth token', '').option('-r, --git-repo [repo]', 'git repo name', 'meridian-git-commits').action(function (options) {
  return initialize({
    token: options.token,
    user: options.gitUser,
    repo: options.gitRepo
  });
});

_commander2.default.parse(process.argv);