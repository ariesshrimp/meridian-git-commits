import githubRemoveAllReleases from 'github-remove-all-releases';
import shell from 'shelljs';
import {AUTH_TOKEN} from '../config.json';
const AUTH = {
  type: 'oauth',
  token: AUTH_TOKEN,
};

shell.exec('rm ../CHANGELOG.md');
githubRemoveAllReleases(AUTH, 'joefraley', 'meridian-git-commits', console.log);

// @see https://gist.github.com/okunishinishi/9424779
shell.exec(
  `
git tag -l | xargs git tag -d
git fetch
git tag -l | xargs git push --delete origin
git tag -l | xargs git tag -d
`
);
