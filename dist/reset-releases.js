'use strict';

var _githubRemoveAllReleases = require('github-remove-all-releases');

var _githubRemoveAllReleases2 = _interopRequireDefault(_githubRemoveAllReleases);

var _shelljs = require('shelljs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTH = {
  type: 'oauth',
  token: process.env.GH_TOKEN
};

(0, _githubRemoveAllReleases2.default)(AUTH, process.env.GITHUB_USER_OR_ORGANIZATION_NAME, 'meridian-git-commits', console.log);

// @see https://gist.github.com/okunishinishi/9424779
(0, _shelljs.exec)('\ngit tag -l | xargs git tag -d\ngit fetch\ngit tag -l | xargs git push --delete origin\ngit tag -l | xargs git tag -d\n');