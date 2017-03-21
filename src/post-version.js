import conventionalGithubReleaser from 'conventional-github-releaser';
import {exec} from 'shelljs';
const {log} = console;

export default async () => {
  exec('git push --follow-tags origin master');
  return await conventionalGithubReleaser(
    {type: 'oauth', token: process.env.GH_TOKEN},
    {preset: 'angular'},
    log
  );
};
