import conventionalGithubReleaser from 'conventional-github-releaser';
import {exec} from 'shelljs';
const {log} = console;

export default async () => {
  await exec(`git push --force --follow-tags origin HEAD:master`);
  return await conventionalGithubReleaser(
    {type: 'oauth', token: process.env.GH_TOKEN},
    {preset: 'angular'},
    log
  );
};
