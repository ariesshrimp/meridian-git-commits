import GitHub from 'github-api';
import shell from 'shelljs';
import packageJson from '../package.json';
import R from 'ramda';
const options = {
  AUTH_TOKEN: '5e8960f32b6131689195da4c3ac13fbe4051e26b',
  USER_NAME: 'joefraley',
  repo: {
    name: 'meridian-git-commits',
  },
};

const releaseNotes = () => 'hello';
const headSha = R.compose(R.dropLast(1), R.trim, () =>
  shell.exec('git rev-parse HEAD'));

const repo = {
  title: `a`,
  head: 'joefraley:master',
  base: 'master',
};

console.log(repo);

const updateRepo = async () => {
  const gh = new GitHub({
    token: options.AUTH_TOKEN,
  });
  const repo = gh.getRepo(options.USER_NAME, options.repo.name);
  await repo.createPullRequest(repo);
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
