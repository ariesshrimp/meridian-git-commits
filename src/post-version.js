import GitHub from 'github-api';
import shell from 'shelljs';
import packageJson from '../package.json';
import R from 'ramda';
import fs from 'fs';

console.log(process.env);

const options = {
  AUTH_TOKEN: process.env.GH_TOKEN,
  USER_NAME: 'joefraley',
  repo: {
    name: 'meridian-git-commits',
  },
};

const releaseNotes = R.pipe(
  fs.readFileSync,
  R.toString,
  R.split(/(<a name=")(\d\.\d\.\d).+(<\/a>)/gi),
  R.nth(4)
)('./CHANGELOG.md');

const updateRepo = async () => {
  const gh = new GitHub({
    token: options.AUTH_TOKEN,
  });
  const repo = await gh.getRepo(options.USER_NAME, options.repo.name);

  console.log('\nCheckout a new release branch...\n');
  shell.exec(`git checkout -b release-v${packageJson.version}`);
  shell.exec(
    `git commit --amend -m  "chore(release): v${packageJson.version} [skip ci]"`
  );

  console.log('\nSend new release tags up to remote...\n');
  shell.exec(`git push --follow-tags origin release-v${packageJson.version}`);

  console.log('\nCreate a pull request to master with new version...\n');
  const {data: {number}} = await repo.createPullRequest({
    title: `chore(release): v${packageJson.version}`,
    body: releaseNotes,
    base: 'master',
    head: `release-v${packageJson.version}`,
  });

  console.log('\nAutomatically merge request...\n');
  const merge = await repo.mergePullRequest(number, {
    merge_method: 'squash',
  });

  console.log('\nDelete remote release branch\n');
  const deadBranch = await repo.deleteRef(
    `heads/release-v${packageJson.version}`
  );

  console.log('\nAdd release notes...\n');
  const release = await repo.createRelease({
    tag_name: 'v' + packageJson.version,
    name: 'v' + packageJson.version,
    body: releaseNotes,
  });
};

export default updateRepo();
