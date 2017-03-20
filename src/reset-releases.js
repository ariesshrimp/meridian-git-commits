import githubRemoveAllReleases from 'github-remove-all-releases';

const AUTH = {
  type: 'oauth',
  token: '68fa74990a3c3a3674fd5a6cb97815b610042491',
};

githubRemoveAllReleases(AUTH, 'joefraley', 'meridian-git-commits', console.log);
