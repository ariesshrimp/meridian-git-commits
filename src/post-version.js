import GitHub from 'github-api';
import shell from 'shelljs';
import packageJson from '../package.json';
import R from 'ramda';

const options = {
  AUTH_TOKEN: '0bc72ec5d87a64dda8a2b1be42a1225870cf606c',
  USER_NAME: 'joefraley',
  repo: {
    name: 'meridian-git-commits',
  },
};

const releaseNotes = () => 'hello';
const headSha = R.compose(R.dropLast(1), R.trim, () =>
  shell.exec('git rev-parse HEAD'));

const updateRepo = async () => {
  const gh = new GitHub({
    token: options.AUTH_TOKEN,
  });
  const repo = await gh.getRepo(options.USER_NAME, options.repo.name);
  shell.exec(`git checkout -b release-${packageJson.version}`);
  shell.exec(`git push --follow-tags origin release-${packageJson.version}`);
  const {data: {number}} = await repo.createPullRequest({
    title: `chore(release): ${packageJson.version}`,
    body: 'test',
    base: 'master',
    head: `release-${packageJson.version}`,
  });

  // console.log(pullRequest);

  const merge = await repo.mergePullRequest(number);
  const release = async () =>
    await repo.createRelease({
      tag_name: packageJson.version,
      name: packageJson.version,
      body: releaseNotes(),
    });
};

updateRepo();

export default updateRepo;
