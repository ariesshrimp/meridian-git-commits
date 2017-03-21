import GitHub from 'github-api';
import packageJson from '../package.json';
import {head, last, pipe, split} from 'ramda';
import {readFileSync} from 'fs';
import {resolve} from 'path';
const {log} = console;

const releaseNotes = pipe(
  readFileSync,
  toString,
  split(/(<a name=")(\d\.\d\.\d).+(<\/a>)/gi),
  nth(4)
);

const gh = new GitHub({token: process.env.GH_TOKEN});
const name = pipe(split('/'), last, split('.'), head);
const currentVersion = () => require('../package.json').version;

export default async () => {
  log('👌 post-version release process starting. ignore that message 👆');
  const repo = await gh.getRepo(
    process.env.GITHUB_USER_OR_ORGANIZATION_NAME,
    name(packageJson.repository.url)
  );

  const release = {
    tag_name: `v${currentVersion()}`,
    name: `v${currentVersion()}`,
    body: releaseNotes(resolve(__dirname, '../CHANGELOG.md')),
  };

  return await repo.createRelease(release);
};
