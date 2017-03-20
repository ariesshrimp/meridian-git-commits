'use strict';

var _githubRemoveAllReleases = require('github-remove-all-releases');

var _githubRemoveAllReleases2 = _interopRequireDefault(_githubRemoveAllReleases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AUTH = {
  type: 'oauth',
  token: '68fa74990a3c3a3674fd5a6cb97815b610042491'
};

(0, _githubRemoveAllReleases2.default)(AUTH, 'joefraley', 'meridian-git-commits', console.log);