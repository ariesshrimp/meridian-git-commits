import conventionalGithubReleaser from 'conventional-github-releaser';
import {exec} from 'shelljs';
const {log} = console;

export default async () => {
  const currentBranch = exec('git branch | grep \* | cut -d " " -f2-')
    .toString()
    .trim();
  await exec(`git push --force --follow-tags origin ${currentBranch}:master`);
  return await conventionalGithubReleaser(
    {type: 'oauth', token: process.env.GH_TOKEN},
    {preset: 'angular'},
    log
  );
};
