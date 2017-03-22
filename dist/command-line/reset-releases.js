'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _githubRemoveAllReleases = require('github-remove-all-releases');

var _githubRemoveAllReleases2 = _interopRequireDefault(_githubRemoveAllReleases);

var _shelljs = require('shelljs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _console = console,
    log = _console.log,
    error = _console.error,
    info = _console.info;

// @see https://gist.github.com/okunishinishi/9424779

var deleteAllTags = function deleteAllTags() {
  return (0, _shelljs.exec)('\nrm ./CHANGELOG.md\ngit tag -l | xargs git tag -d\ngit fetch\ngit tag -l | xargs git push --delete origin\ngit tag -l | xargs git tag -d\n');
};

exports.default = function (_ref) {
  var user = _ref.user,
      repo = _ref.repo,
      token = _ref.token;

  (0, _githubRemoveAllReleases2.default)({ type: 'oauth', token: process.env.GH_TOKEN || token }, process.env.GITHUB_USER_OR_ORGANIZATION_NAME || user, process.env.REPO_NAME || repo, log);
  deleteAllTags();
};