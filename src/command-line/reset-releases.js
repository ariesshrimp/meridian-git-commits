import githubRemoveAllReleases from 'github-remove-all-releases';
import {exec} from 'shelljs';

const {log, error, info} = console;

// @see https://gist.github.com/okunishinishi/9424779
const deleteAllTags = () =>
  exec(
    `
rm ./CHANGELOG.md
git tag -l | xargs git tag -d
git fetch
git tag -l | xargs git push --delete origin
git tag -l | xargs git tag -d
`
  );

export default ({user, repo, token}) => {
  githubRemoveAllReleases(
    {type: 'oauth', token: process.env.GH_TOKEN || token},
    process.env.GITHUB_USER_OR_ORGANIZATION_NAME || user,
    process.env.REPO_NAME || repo,
    log
  );
  deleteAllTags();
};
