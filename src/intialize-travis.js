import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import R from 'ramda';
import {exec} from 'shelljs';

export default async () => {
  const userSettings = await inquirer.prompt([
    {
      type: 'input',
      message: 'Whats your git hub repo url? (Its easiest to use https here...)',
      name: 'repo',
    },
    {
      type: 'input',
      message: 'Whats your git hub user or organization name? (this is used to fetch the remote repo)',
      name: 'userName',
    },
    {
      type: 'input',
      message: 'What email is associated with this repo? (this could be an org email...)',
      name: 'email',
    },
    {
      type: 'password',
      message: 'Paste in your github access token. Ill wait...',
      name: 'password',
    },
  ]);

  const travisYml = `
language: node_js
node_js:
- node
cache:
  directories:
  - "$HOME/.yarn-cache"
notifications:
  email: false
script:
- npm test
after_success:
- git config credential.helper "store --file=.git/credentials"; echo "https://\${GH_TOKEN}:@github.com" > .git/credentials 2>/dev/null
- git config --global user.email "${userSettings.email}"
- git config --global user.name "${userSettings.userName}"
- git remote rm origin
- git remote add origin $REPO
- "[[ $TRAVIS_PULL_REQUEST == false ]] && npm run release"

branches:
  only:
  - master
env:
  global:
  - GITHUB_USER_OR_ORGANIZATION_NAME=${userSettings.userName}
  - REPO=${userSettings.repo}
`;
};
