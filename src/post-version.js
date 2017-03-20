import GitHub from 'github-api';
import shell from 'shelljs';
import packageJson from '../package.json';
import R from 'ramda';
import {AUTH_TOKEN} from '../config.json';
import fs from 'fs';

const options = {
  AUTH_TOKEN,
  USER_NAME: 'joefraley',
  repo: {
    name: 'meridian-git-commits',
  },
};

const releaseNotes = () =>
  fs.readFileSync('./CHANGELOG.md').toString().split(/(#\s\d\.\d\.\d)/gi);
const headSha = R.compose(R.dropLast(1), R.trim, () =>
  shell.exec('git rev-parse HEAD'));
console.log(releaseNotes());

const updateRepo = async () => {
  // const gh = new GitHub({
  //   token: options.AUTH_TOKEN,
  // });
  // const repo = await gh.getRepo(options.USER_NAME, options.repo.name);
  // console.log('Checkout a new release branch');
  // shell.exec(`git checkout -b release-${packageJson.version}`);
  // console.log('Send new release tags up to remote');
  // shell.exec(`git push --follow-tags origin release-${packageJson.version}`);
  // console.log('Create a pull request to master with new version');
  // const {data: {number}} = await repo.createPullRequest({
  //   title: `chore(release): ${packageJson.version}`,
  //   body: releaseNotes(),
  //   base: 'master',
  //   head: `release-${packageJson.version}`,
  // });
  // console.log('Automatically merge request');
  // const merge = await repo.mergePullRequest(number);
  // console.log('Add release notes');
  // const release = async () =>
  //   await repo.createRelease({
  //     tag_name: packageJson.version,
  //     name: packageJson.version,
  //     body: releaseNotes(),
  //   });
};

updateRepo();

export default updateRepo;
