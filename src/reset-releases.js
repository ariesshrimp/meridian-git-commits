import githubRemoveAllReleases from 'github-remove-all-releases';
import shell from 'shelljs';
const AUTH = {
  type: 'oauth',
  token: process.env.GH_TOKEN,
};

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
