import GitHub from 'github-api';
import {exec} from 'shelljs';
import packageJson from '../package.json';
import {pipe, last, split, head, toString, nth} from 'ramda';
import {readFileSync} from 'fs';
import {resolve} from 'path';

const releaseNotes = pipe(
  readFileSync,
  toString,
  split(/(<a name=")(\d\.\d\.\d).+(<\/a>)/gi),
  nth(4)
);

const gh = new GitHub({token: process.env.GH_TOKEN});
const name = pipe(split('/'), last, split('.'), head)(
  packageJson.repository.url
);
const v = `v${packageJson.version}`;

export default async () => {
  const repo = await gh.getRepo(
    process.env.GITHUB_USER_OR_ORGANIZATION_NAME,
    name
  );
  const ammendRelease = exec(
    `git commit --amend -m  "chore(release): ${v} [skip ci]"`
  );
  const pushTags = exec('git push -f --follow-tags origin master');

  return await repo.createRelease({
    tag_name: v,
    name: v,
    body: releaseNotes(resolve(__dirname, './CHANGELOG.md')),
  });
};
