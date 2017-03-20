import GitHub from 'github-api';
import shell from 'shelljs';
import packageJson from '../package.json';
import R from 'ramda';
import $ from 'axios';

const options = {
  AUTH_TOKEN: 'c0d62af34f410c633773b831e3273275eddb9613',
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
  const newBranch = await repo.createBranch(
    'master',
    `release-${packageJson.version}`
  );

  console.log(packageJson.version);
  const pullRequest = await repo.createPullRequest({
    title: `chore(release): ${packageJson.version}`,
    body: 'test',
    base: 'master',
    head: `release-${packageJson.version}`,
  });

  // .then(({number}) => gh.mergePullRequest(number));
  // .then(
  //   gh.createRelease({
  //     tag_name: packageJson.version,
  //     name: packageJson.version,
  //     body: releaseNotes(),
  //   })
  // )
  // .catch(console.error)
};

updateRepo();

export default updateRepo;
