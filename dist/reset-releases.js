'use strict';

var _githubRemoveAllReleases = require('github-remove-all-releases');

var _githubRemoveAllReleases2 = _interopRequireDefault(_githubRemoveAllReleases);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _config = require('../config.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTH = {
  type: 'oauth',
  token: _config.AUTH_TOKEN
};

_shelljs2.default.exec('rm ../CHANGELOG.md');
(0, _githubRemoveAllReleases2.default)(AUTH, 'joefraley', 'meridian-git-commits', console.log);

// @see https://gist.github.com/okunishinishi/9424779
_shelljs2.default.exec('\ngit tag -l | xargs git tag -d\ngit fetch\ngit tag -l | xargs git push --delete origin\ngit tag -l | xargs git tag -d\n');