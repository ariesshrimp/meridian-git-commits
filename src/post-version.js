import GitHub from 'github-api';
import shell from 'shelljs';
import packageJson from '../package.json';
import R from 'ramda';
import fs from 'fs';

const releaseNotes = R.pipe(
  fs.readFileSync,
  R.toString,
  R.split(/(<a name=")(\d\.\d\.\d).+(<\/a>)/gi),
  R.nth(4)
)('./CHANGELOG.md');

const updateRepo = async () => {
  const gh = new GitHub({
    token: process.env.GH_TOKEN,
  });
  const url = packageJson.repository.url.split('/');
  const repo = await gh.getRepo(
    process.env.USER,
    R.pipe(
      R.last,
      R.tap(console.log),
      R.split('.'),
      R.tap(console.log),
      R.head,
      R.tap(console.log)
    )(url)
  );
  const v = `v${packageJson.version}`;
  shell.exec(`git commit --amend -m  "chore(release): ${v} [skip ci]"`);
  shell.exec(`git push -f --follow-tags origin master`);

  return await repo.createRelease({
    tag_name: v,
    name: v,
    body: releaseNotes,
  });
};

export default updateRepo();
