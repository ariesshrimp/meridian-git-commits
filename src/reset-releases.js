import githubRemoveAllReleases from 'github-remove-all-releases';
import {exec} from 'shelljs';
const AUTH = {
  type: 'oauth',
  token: process.env.GH_TOKEN,
};

githubRemoveAllReleases(
  AUTH,
  process.env.GIT_USER,
  'meridian-git-commits',
  console.log
);

// @see https://gist.github.com/okunishinishi/9424779
exec(
  `
git tag -l | xargs git tag -d
git fetch
git tag -l | xargs git push --delete origin
git tag -l | xargs git tag -d
`
);
