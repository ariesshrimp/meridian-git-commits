import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';
import R from 'ramda';
import {exec} from 'shelljs';

export default async () => {
  const userSettings = await inquirer.prompt([
    {
      type: 'input',
      message: 'Whats your git hub repo url?',
      name: 'repo',
    },
    {
      type: 'password',
      message: 'Paste in your github access token. Ill wait...',
      name: 'password',
    },
    {
      type: 'password',
      message: 'Enter your git password',
      name: 'password',
    },
    {
      type: 'password',
      message: 'Enter your git password',
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
- git remote rm origin
- git config --global user.email "YOU@EXAMPLE.COM"
- git config --global user.name "YOUR_NAME"
- git remote add origin https://${GIT_USER}:${GH_TOKEN}@github.com/${GIT_USER}/${REPO}.git
- "[[ $TRAVIS_PULL_REQUEST == false ]] && npm run release"

branches:
  only:
  - master
env:
  global:
  - REPO=${REPO}
`;
};
